'use strict'

// https://codeguide.co/#html-attribute-order
const FRAMEWORK_ORDERS = {
	default: [
		'class',
		'id',
		'name',
		'data-.+',
		'src',
		'for',
		'type',
		'href',
		'value',
		'title',
		'alt',
		'role',
		'aria-.+',
		'tabindex',
		'style',
		'$unknown$',
	],
	angular: [
		'class',
		'id',
		'name',
		'data-.+',
		'ng-.+',
		'\\[.+',
		'\\(.+',
		'\\*ng.+',
		'src',
		'for',
		'type',
		'href',
		'value',
		'title',
		'alt',
		'role',
		'aria-.+',
		'tabindex',
		'style',
		'$unknown$',
	],
}

function getDefaultOrder(framework) {
	if (typeof framework === 'string' && FRAMEWORK_ORDERS[framework]) {
		return FRAMEWORK_ORDERS[framework].slice()
	}

	return FRAMEWORK_ORDERS.default.slice()
}

function sortByAlpha(a, b) {
	if (typeof a.localeCompare === 'function') {
		return a.localeCompare(b)
	}

	return a - b
}

function createOrder(options) {
	const userOrder = options && Array.isArray(options.order) ? options.order : null

	if (userOrder && userOrder.length > 0) {
		return userOrder
	}

	return getDefaultOrder(options && options.framework)
}

function attrsSorterPlugin(options = {}) {
	const orderList = createOrder(options)

	if (orderList.length === 0) {
		return (tree) => tree
	}

	const unknownKey = '$unknown$'
	const unknownIndex = orderList.indexOf(unknownKey)
	const knownOrder = orderList.filter((item) => item !== unknownKey)
	const knownRegexes = knownOrder.map((item) => new RegExp(`^${item}$`))

	return (tree) => {
		tree.walk((node) => {
			if (!node.attrs) {
				return node
			}

			const attrs = Object.keys(node.attrs)
			if (attrs.length < 2) {
				return node
			}

			const groups = knownOrder.map(() => [])
			const unknownAttrs = []

			attrs.forEach((attr) => {
				const groupIndex = knownRegexes.findIndex((regex) => regex.test(attr))

				if (groupIndex === -1) {
					unknownAttrs.push(attr)
					return
				}

				groups[groupIndex].push(attr)
			})

			groups.forEach((group) => group.sort(sortByAlpha))

			const finalOrder = []
			let knownCursor = 0

			orderList.forEach((item) => {
				if (item === unknownKey) {
					finalOrder.push(...unknownAttrs)
					return
				}

				finalOrder.push(...groups[knownCursor])
				knownCursor += 1
			})

			if (unknownIndex === -1) {
				finalOrder.push(...unknownAttrs)
			}

			const finalAttrs = {}
			finalOrder.forEach((attr) => {
				finalAttrs[attr] = node.attrs[attr] ? node.attrs[attr] : true
			})

			node.attrs = finalAttrs
			return node
		})

		return tree
	}
}

module.exports = attrsSorterPlugin
module.exports.getDefaultOrder = getDefaultOrder
