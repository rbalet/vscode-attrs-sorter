"use strict"

const posthtml = require("posthtml")
const attrsSorter = require("posthtml-vscode")

module.exports = (text, options) => {
	return posthtml()
		.use(attrsSorter(options))
		.process(text)
}
