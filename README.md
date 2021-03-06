# Sorting HTML attributes

> Sorting of the tag attributes in the specified order.

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

An array of attributes in the correct order. See [posthtml-attrs-sorter#order](https://github.com/mrmlnc/posthtml-attrs-sorter#order) for more details.

For example:

```json
{
	"attrsSorter.order": ["data-.+", "aria-.+", "class"]
}
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

See the [Releases section of our GitHub project](https://github.com/mrmlnc/vscode-attrs-sorter/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
