# Sorting HTML attributes

> Sort HTML tag attributes in a configurable order.

## HTML

![2016-03-03_16-23-34](https://cloud.githubusercontent.com/assets/7034281/13495536/5f4bf152-e15c-11e5-8031-62ca1a5709f2.gif)

## Donate

If you want to thank me, thanks this guy instead [mrmlnc](https://github.com/mrmlnc/vscode-attrs-sorter), this plugin is a copy of that with a few update.

## Install

-   Press <kbd>F1</kbd> and `select Extensions: Install Extensions`.
-   Search for and select `attrs-sorter`.

See the [extension installation guide](https://code.visualstudio.com/docs/editor/extension-gallery) for details.

## Usage

-   You can use global keyboard shortcut <kbd>ALT+SHIFT+F</kbd> or right-click context menu `Format code`.
-   Or press <kbd>F1</kbd> and run the command named `Sorting HTML tag attributes (attrs-sorter)`.

## Supported languages

-   HTML (+ HTML like languages)
-   Jade (+ Pug)

## Supported settings

**attrsSorter.order**

-   Type: `string[]`
-   Default: Code Guide based order (with `$unknown$` fallback slot)

Reference guideline: [https://codeguide.co/#html-attribute-order](https://codeguide.co/#html-attribute-order)

An array of attributes in the correct order.

The sorter supports regex entries and the `$unknown$` placeholder to control where unmatched attributes are inserted.

For example:

```json
{
	"attrsSorter.order": ["data-.+", "aria-.+", "class"]
}
```

Example with explicit unknown placement:

```json
{
	"attrsSorter.order": ["class", "$unknown$", "aria-.+"]
}
```

## Implementation Notes

- The extension uses the official [posthtml](https://github.com/posthtml/posthtml) library.
- Attribute ordering is implemented in this repository (`lib/sort-attrs.js`).
- The command `attrsSorter.execute` remains stable.

## Development

Install dependencies:

```bash
npm install
```

Lint:

```bash
npm run lint
```

Format check:

```bash
npm run format:check
```

Format write:

```bash
npm run format
```

Unit tests:

```bash
npm run test:unit
```

Smoke tests (extension host):

```bash
npm run test:smoke
```

Manual testing in a persistent Extension Development Host window:

```bash
npm run dev:host
```

Notes:

- Recommended: install the `code` shell command from VS Code (`Shell Command: Install 'code' command in PATH`).
- Fallback on macOS: `npm run dev:host` uses `/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code` when `code` is unavailable.

Manual fixture files for quick verification:

- Input fixture: `test/examples/unsorted.html`
- Expected result: `test/examples/sorted.html`


Quick workflow:

1. Run `npm run dev:host`.
2. Open `test/examples/unsorted.html` in the Extension Development Host.
3. Save or run `Sorting HTML tag attributes (attrs-sorter)`.
4. Compare against `test/examples/sorted.html`.

Full check:

```bash
npm test
```

CI check (includes smoke tests):

```bash
npm run test:ci
```

## Keyboard shortcuts

For changes keyboard shortcuts, create a new rule in `File -> Preferences -> Keyboard Shortcuts`:

```json
{
	"key": "ctrl+shift+c",
	"command": "attrsSorter.execute"
}
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

This software is released under the terms of the MIT license.
