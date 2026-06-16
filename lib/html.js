'use strict'

const posthtml = require('posthtml')
const attrsSorter = require('./sort-attrs')

const PHP_DIRECTIVES = [{ name: /^\?(php|=)$/i, start: '<', end: '>' }]

module.exports = (text, options) => {
	const processOptions = {
		recognizeNoValueAttribute: true,
	}

	if (options && options.framework === 'php') {
		processOptions.directives = PHP_DIRECTIVES
	}

	return posthtml()
		.use(attrsSorter(options))
		.process(text, {
			...processOptions,
		})
}
