# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Changed

- Migrated attribute sorting internals to use official `posthtml` with a local sorter implementation.
- Replaced old lint/test stack with Oxc tooling:
	- `oxlint` for linting
	- `oxfmt` for formatting
- Migrated unit tests to the Node built-in test runner (`node:test`).
- Modernized extension development baseline:
	- `engines.vscode` updated to `^1.85.0`
	- replaced deprecated `vscode` dev package flow with `@types/vscode` and `@vscode/test-electron`

### Docs

- Updated README developer commands and configuration notes.
