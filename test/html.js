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

test('HTML: default framework is used when no framework is specified', async () => {
	const result = await htmlSorter(
		'<input type="text" key="email" [value]="name" data-id="id" className="field" id="email">',
		{},
	)

	assert.equal(
		result.html,
		'<input className="field" id="email" key="email" data-id="id" [value]="name" type="text">',
	)
})

test('HTML: vanilla framework default order', async () => {
	const result = await htmlSorter(
		'<input type="text" data-id="id" class="field" id="username">',
		{ framework: 'vanilla' },
	)

	assert.equal(result.html, '<input class="field" id="username" data-id="id" type="text">')
})

test('HTML: angular framework default order', async () => {
	const result = await htmlSorter(
		'<input type="text" [value]="name" (input)="onInput($event)" *ngIf="enabled" data-id="id" class="field" id="username">',
		{ framework: 'angular' },
	)

	assert.equal(
		result.html,
		'<input class="field" id="username" data-id="id" [value]="name" (input)="onInput($event)" *ngIf="enabled" type="text">',
	)
})

test('HTML: react framework default order', async () => {
	const result = await htmlSorter(
		'<input type="text" key="email" data-track="email" ref="inputRef" className="field" id="email">',
		{ framework: 'react' },
	)

	assert.equal(
		result.html,
		'<input className="field" id="email" key="email" ref="inputRef" data-track="email" type="text">',
	)
})

test('HTML: vue framework default order', async () => {
	const result = await htmlSorter(
		'<input type="text" @input="onInput" :value="name" v-model="name" data-id="id" class="field" id="username">',
		{ framework: 'vue' },
	)

	assert.equal(
		result.html,
		'<input class="field" id="username" data-id="id" v-model="name" :value="name" @input="onInput" type="text">',
	)
})

test('HTML: svelte framework default order', async () => {
	const result = await htmlSorter(
		'<input type="text" on:input="onInput" bind:value="name" data-id="id" class="field" id="username">',
		{ framework: 'svelte' },
	)

	assert.equal(
		result.html,
		'<input class="field" id="username" data-id="id" bind:value="name" on:input="onInput" type="text">',
	)
})
