'use strict'

const assert = require('node:assert/strict')

async function waitFor(check, timeoutMs = 5000, intervalMs = 50) {
	const start = Date.now()

	while (Date.now() - start < timeoutMs) {
		if (check()) {
			return
		}

		await new Promise((resolve) => setTimeout(resolve, intervalMs))
	}

	throw new Error('Timed out waiting for smoke assertion')
}

async function run() {
	const vscode = require('vscode')
	const extensionId = 'rbalet.vscode-sorting-attrs'

	const extension = vscode.extensions.getExtension(extensionId)
	assert.ok(extension, `Extension ${extensionId} should be available in test host`)

	await extension.activate()
	assert.equal(extension.isActive, true, 'Extension should be active after activation')

	const commands = await vscode.commands.getCommands(true)
	assert.ok(
		commands.includes('attrsSorter.execute'),
		'Command attrsSorter.execute should be contributed',
	)

	const input = '<input id="identifier" class="input-field" type="text">\n'
	const expected = '<input class="input-field" id="identifier" type="text">\n'

	const document = await vscode.workspace.openTextDocument({
		language: 'html',
		content: input,
	})

	const editor = await vscode.window.showTextDocument(document)
	editor.selection = new vscode.Selection(0, 0, 0, 0)

	await vscode.commands.executeCommand('attrsSorter.execute')

	await waitFor(() => document.getText() === expected)
	assert.equal(document.getText(), expected, 'Command should reorder HTML attributes')
}

module.exports = {
	run,
}
