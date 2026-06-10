'use strict'

const path = require('node:path')
const { runTests } = require('@vscode/test-electron')

async function main() {
	const extensionDevelopmentPath = path.resolve(__dirname, '../..')
	const extensionTestsPath = path.resolve(__dirname, './index.js')

	await runTests({
		extensionDevelopmentPath,
		extensionTestsPath,
	})
}

main().catch((error) => {
	console.error('Failed to run smoke tests')
	console.error(error)
	process.exit(1)
})
