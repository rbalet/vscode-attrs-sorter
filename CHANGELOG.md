# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

## [2.0.0] - 2026-06-10

### Changed

- Migrated attribute sorting internals to use official `posthtml` with a local sorter implementation.
- Replaced old lint/test stack with Oxc tooling:
	- `oxlint` for linting
	- `oxfmt` for formatting
- Migrated unit tests to the Node built-in test runner (`node:test`).
- Added extension smoke tests using `@vscode/test-electron`.
- Modernized extension development baseline:
	- `engines.vscode` updated to `^1.85.0`
	- replaced deprecated `vscode` dev package flow with `@types/vscode` and `@vscode/test-electron`
- Aligned default attribute order with Code Guide (`class`, `id`/`name`, `data-*`, element attrs, a11y attrs, `tabindex`, `style`).

### Docs

- Updated README developer commands and configuration notes.
- Added canonical manual-test fixtures (`test/examples/unsorted.html` and `test/examples/sorted.html`) and documented fixture freeze policy.
