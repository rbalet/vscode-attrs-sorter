"use strict"

const posthtml = require("posthtml-vscode-sorting-attrs")
const attrsSorter = require("posthtml-vscode-sorting-attrs-logic")

module.exports = (text, options) => {
	return posthtml()
		.use(attrsSorter(options))
		.process(text)
}
