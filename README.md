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
-   Default: http://codeguide.co/#html-attribute-order

An array of attributes in the correct order. See [vscode-attrs-sorter#order](https://github.com/rbalet/vscode-attrs-sorter#order) for more details.

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

Full check:

```bash
npm test
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

See the [Releases section of our GitHub project](https://github.com/rbalet/vscode-attrs-sorter/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
