'use strict'

const posthtml = require('posthtml')
const attrsSorter = require('./sort-attrs')

module.exports = (text, options) => {
	return posthtml().use(attrsSorter(options)).process(text, { recognizeNoValueAttribute: true })
}
