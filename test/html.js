'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const htmlSorter = require('../lib/html')

test('HTML: no attributes', async () => {
	const result = await htmlSorter('<span>Test</span>', {})
	assert.equal(result.html, '<span>Test</span>')
})

test('HTML: one attribute', async () => {
	const result = await htmlSorter('<span class="class">Test</span>', {})
	assert.equal(result.html, '<span class="class">Test</span>')
})

test('HTML: multiple attributes', async () => {
	const result = await htmlSorter('<span id="id" class="class">Test</span>', {})
	assert.equal(result.html, '<span class="class" id="id">Test</span>')
})

test('HTML: multiple attributes with options', async () => {
	const result = await htmlSorter('<span id="id" class="class">Test</span>', {
		order: ['id', 'class'],
	})

	assert.equal(result.html, '<span id="id" class="class">Test</span>')
})

test('HTML: multiple rows', async () => {
	const result = await htmlSorter(
		'<div id="id" class="class">\n  <span id="id" class="class">Test</span>\n  </div>',
		{},
	)
	assert.equal(
		result.html,
		'<div class="class" id="id">\n  <span class="class" id="id">Test</span>\n  </div>',
	)
})
