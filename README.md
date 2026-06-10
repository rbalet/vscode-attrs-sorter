# Sort HTML Attributes

Keep your HTML attributes clean, consistent, and predictable.

Sort HTML Attributes automatically reorders tag attributes using a configurable rule set, with built-in profiles for common frameworks.

![Attribute sorting demo](https://cloud.githubusercontent.com/assets/7034281/13495536/5f4bf152-e15c-11e5-8031-62ca1a5709f2.gif)

## Why use it?

- Faster code reviews with stable attribute ordering.
- Fewer noisy diffs caused by random attribute order.
- Works with plain HTML and framework-oriented templates.
- Uses a simple, powerful config model (exact names + regex patterns).

## Install

1. Open the Extensions view in VS Code.
2. Search for `attrs-sorter`.
3. Install **Sort HTML attributes**.

You can also use the Command Palette and run `Extensions: Install Extensions`.

## Quick Start

Use any of these flows:

- Run `Format Document` (<kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> on many layouts).
- Right click in an HTML file and choose `Format Document`.
- Run the command `Sorting HTML tag attributes (attrs-sorter)` from the Command Palette.

## Supported Language

- HTML (and HTML-like markup handled through HTML formatting)

## Configuration

### attrsSorter.sortOnFormat

- Type: `boolean`
- Default: `true`

When enabled, attribute sorting runs automatically during HTML document formatting.

Set to `false` if you want to keep manual control and run sorting only via the command.

### attrsSorter.order

- Type: `string[]`
- Default: `[]` (falls back to the selected framework profile)

Define your own attribute order. Each entry can be:

- A literal attribute name (example: `class`)
- A regex pattern (example: `data-.+`)
- The special `$unknown$` token to place unmatched attributes

Reference guideline used by default profiles: [Code Guide: HTML attribute order](https://codeguide.co/#html-attribute-order)

Example:

```json
{
	"attrsSorter.order": ["class", "id", "data-.+", "$unknown$", "aria-.+"]
}
```

### attrsSorter.framework

- Type: `"default" | "angular" | "react" | "vue" | "svelte"`
- Default: `"default"`

Controls the built-in default order used when `attrsSorter.order` is empty.

- `default`: Code Guide-based HTML order
- `angular`: Adds Angular patterns such as `ng-*`, `[input]`, `(output)`, `*directive`
- `react`: Adds JSX-oriented attributes like `className`, `key`, `ref`, `htmlFor`
- `vue`: Adds Vue directives and shorthand like `v-*`, `:prop`, `@event`, `#slot`
- `svelte`: Adds Svelte directives such as `bind:*`, `on:*`, `use:*`, transitions, and slots

Example:

```json
{
	"attrsSorter.framework": "vue",
	"attrsSorter.order": []
}
```

## Keyboard Shortcut (Optional)

If you want a dedicated shortcut for the command, add this in Keyboard Shortcuts JSON:

```json
{
	"key": "ctrl+shift+c",
	"command": "attrsSorter.execute"
}
```

## Development

```bash
npm install
```

```bash
npm run lint
```

```bash
npm run test:unit
```

```bash
npm run test:smoke
```

```bash
npm run dev:host
```

Local fixture files used for manual verification:

- Input: `test/examples/unsorted.html`
- Expected: `test/examples/sorted.html`

Run full local validation:

```bash
npm test
```

Run CI-equivalent checks (includes smoke tests):

```bash
npm run test:ci
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT](./LICENSE)
