# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.0](https://github.com/rbalet/vscode-attrs-sorter/compare/v2.0.2...v2.1.0) (2026-06-16)


### Features

* **framework:** php ([ab12976](https://github.com/rbalet/vscode-attrs-sorter/commit/ab12976abebea041ef0bb260a403c5be080c918c))

## [2.0.2](https://github.com/rbalet/vscode-attrs-sorter/compare/v2.0.1...v2.0.2) (2026-06-16)


### Bug Fixes

* **attributes:** do not auto add ([d42b726](https://github.com/rbalet/vscode-attrs-sorter/commit/d42b7261311d34db1dc327a3a4b8481a175f2975))

## [2.0.1](https://github.com/rbalet/vscode-attrs-sorter/compare/v2.0.0...v2.0.1) (2026-06-10)

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
