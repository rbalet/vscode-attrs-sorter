'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const MAC_CODE_BIN = '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code'

function hasCodeOnPath() {
	const probe = spawnSync('code', ['--version'], { stdio: 'ignore' })
	return !probe.error && probe.status === 0
}

function getCodeBinary() {
	if (hasCodeOnPath()) {
		return 'code'
	}

	if (process.platform === 'darwin' && fs.existsSync(MAC_CODE_BIN)) {
		return MAC_CODE_BIN
	}

	return null
}

function main() {
	const codeBinary = getCodeBinary()

	if (!codeBinary) {
		console.error('Could not find VS Code launcher.')
		console.error('Install the `code` command from VS Code:')
		console.error("Shell Command: Install 'code' command in PATH")
		if (process.platform === 'darwin') {
			console.error(`Or ensure this file exists: ${MAC_CODE_BIN}`)
		}
		process.exit(1)
	}

	const extensionDevelopmentPath = path.resolve(process.cwd())
	const result = spawnSync(codeBinary, ['--extensionDevelopmentPath', extensionDevelopmentPath], {
		stdio: 'inherit',
	})

	if (result.error) {
		console.error(result.error.message)
		process.exit(1)
	}

	process.exit(result.status || 0)
}

main()
