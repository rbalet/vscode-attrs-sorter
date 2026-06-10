# Copilot Instructions for vscode-attrs-sorter

Use these notes as project memory when assisting in this repository.

## Project Purpose

- VS Code extension that sorts HTML tag attributes in a configurable order.
- Main command: `attrsSorter.execute`.
- Also integrates with HTML range formatting.

## Important Files

- `package.json`: extension metadata, contribution points, scripts, dependencies.
- `extension.js`: activation, command registration, formatter provider, document edit flow.
- `lib/html.js`: PostHTML pipeline wrapper using local `lib/sort-attrs.js`.
- `test/html.js`: unit tests using Node built-in test runner.
- `test/examples/unsorted.html` and `test/examples/sorted.html`: canonical manual-test fixtures (baseline unsorted/sorted pair).
- `README.md`: user-facing usage and configuration docs.

## Behavior Notes

- If `attrsSorter.order` is empty, default ordering is defined in `extension.js`.
- Command flow sorts document, then triggers `editor.action.formatDocument`, then restores selection.
- Formatter provider is currently registered for language `html` and scheme `file`.

## Maintenance Notes

- This codebase was originally built years ago; prefer conservative modernization.
- Keep public command ID and setting name stable (`attrsSorter.execute`, `attrsSorter.order`).
- Before refactors, run tests and preserve output behavior for existing HTML examples.
- Add tests for new edge cases before changing sorting logic.
- Keep fixture pair `test/examples/unsorted.html` and `test/examples/sorted.html` stable; if behavior changes intentionally, update both together.

## Local Validation

- Install dependencies: `npm install`.
- Lint: `npm run lint`.
- Format check: `npm run format:check`.
- Format write: `npm run format`.
- Manual extension host: `npm run dev:host`.
- Unit tests: `npm run test:unit`.
- Smoke tests: `npm run test:smoke`.
- `npm test` runs lint + unit tests (fast local path).
- `npm run test:ci` runs lint + unit tests + smoke tests.

## Extension Baseline

- `engines.vscode` targets a modern baseline (`^1.85.0`).
- Extension dev stack uses `@types/vscode` and `@vscode/test-electron` (not deprecated `vscode` package tooling).
