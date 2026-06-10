'use strict'

const assert = require('node:assert/strict')

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
}

module.exports = {
	run,
}
