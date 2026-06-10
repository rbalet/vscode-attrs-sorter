# Copilot Instructions for vscode-attrs-sorter

Use these notes as project memory when assisting in this repository.

## Project Purpose

- VS Code extension that sorts HTML tag attributes in a configurable order.
- Main command: `attrsSorter.execute`.
- Also integrates with HTML range formatting.

## Important Files

- `package.json`: extension metadata, contribution points, scripts, dependencies.
- `extension.js`: activation, command registration, formatter provider, document edit flow.
- `lib/html.js`: PostHTML pipeline wrapper using `posthtml-attrs-sorter`.
- `test/html.js`: Mocha tests for attribute ordering behavior.
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

## Local Validation

- Install dependencies: `npm install`.
- Run checks: `npm test` (XO lint + Mocha tests).
- If `xo: command not found` appears, dependencies are not installed yet.
