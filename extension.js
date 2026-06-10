'use strict'

const vscode = require('vscode')
const htmlSorter = require('./lib/html')
const { getDefaultOrder } = require('./lib/sort-attrs')

let output

function isSortOnFormatEnabled() {
	const options = vscode.workspace.getConfiguration('attrsSorter')
	return options.sortOnFormat !== false
}

function sort(document, range) {
	const options = Object.assign({}, vscode.workspace.getConfiguration('attrsSorter'))
	/** Following: https://codeguide.co/#html-attribute-order */

	if (!Array.isArray(options.order)) {
		options.order = []
	}

	if (options.order.length === 0) {
		options.order = getDefaultOrder(options.framework)
	}

	let text
	if (range) {
		text = document.getText(range)
	} else {
		const lastLine = document.lineAt(document.lineCount - 1)
		const start = new vscode.Position(0, 0)
		const end = new vscode.Position(document.lineCount - 1, lastLine.text.length)

		range = new vscode.Range(start, end)
		text = document.getText()
	}

	// HTML
	return htmlSorter(text, options).then((result) => ({
		text: result.html,
		range,
	}))
}

/**
 * Show message in output channel.
 */
function showOutput(msg) {
	msg = msg.toString()

	if (!output) {
		output = vscode.window.createOutputChannel('attrs-sorter')
	}

	output.clear()
	output.appendLine('[attrs-sorter]')
	output.append(msg)
	output.show()
}

function activate(context) {
	const command = vscode.commands.registerTextEditorCommand(
		'attrsSorter.execute',
		(textEditor) => {
			const activeEditor = vscode.window.activeTextEditor
			let activeSelection
			if (activeEditor) {
				activeSelection = activeEditor.selection
			}
			sort(textEditor.document, null)
				.then((result) => {
					textEditor.edit((editBuilder) => {
						editBuilder.replace(result.range, result.text)
					})
				})
				.catch(showOutput)
				.finally(() => {
					const firstFormatter = vscode.commands.executeCommand(
						'editor.action.formatDocument',
					)
					firstFormatter.then(() => {
						textEditor.selection = new vscode.Selection(
							activeSelection.start.line,
							activeSelection.start.character,
							activeSelection.active.line,
							activeSelection.active.character,
						)
					})
				})
		},
	)

	const formatCode = vscode.languages.registerDocumentRangeFormattingEditProvider(
		{ language: 'html' },
		{
			provideDocumentRangeFormattingEdits(document, range) {
				if (!isSortOnFormatEnabled()) {
					return []
				}

				return sort(document, range)
					.then((result) => {
						return [vscode.TextEdit.replace(range, result.text)]
					})
					.catch((error) => {
						showOutput(error)
						return []
					})
			},
		},
	)

	const formatDocument = vscode.languages.registerDocumentFormattingEditProvider(
		{ language: 'html' },
		{
			provideDocumentFormattingEdits(document) {
				if (!isSortOnFormatEnabled()) {
					return []
				}

				return sort(document, null)
					.then((result) => {
						return [vscode.TextEdit.replace(result.range, result.text)]
					})
					.catch((error) => {
						showOutput(error)
						return []
					})
			},
		},
	)

	// Subscriptions
	context.subscriptions.push(command)
	context.subscriptions.push(formatCode)
	context.subscriptions.push(formatDocument)
}

exports.activate = activate

// this method is called when your extension is deactivated
// export function deactivate() {}
