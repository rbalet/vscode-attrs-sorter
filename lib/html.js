'use strict'

const posthtml = require('posthtml-vscode-sorting-attrs')
const attrsSorter = require('posthtml-attrs-sorter')

module.exports = (text, options) => {
	return posthtml()
		.use(attrsSorter(options))
		.process(text)
}
