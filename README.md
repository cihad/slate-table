# @cihad/slate-table

Table Plugin for Slate (based on @udecode/slate-plugins) Inspired by the Atlassian editor's table plugin.

![@cihad/slate-table screenshot][screenshot]

To install:

`yarn add @cihad/slate-table`

The usage:

```jsx
import { ELEMENT_TABLE, ELEMENT_TD } from "@udecode/slate-plugins"
import { TableElement, TdElement } from "@cihad/slate-table"

let components = createSlatePluginsComponents({
	[ELEMENT_TABlE]: TableElement,
	[TD_ELEMENT]: TdElement,
})

const initialValue = [
	{
		type: ELEMENT_TABLE,
		children: [
			{
				type: ELEMENT_TR,
				children: [
					{ type: ELEMENT_TD, children: [{ text: "1" }] },
					{ type: ELEMENT_TD, children: [{ text: "2" }] },
					{ type: ELEMENT_TD, children: [{ text: "3" }] },
				],
			},
			{
				type: ELEMENT_TR,
				children: [
					{ type: ELEMENT_TD, children: [{ text: "4" }] },
					{ type: ELEMENT_TD, children: [{ text: "5" }] },
					{ type: ELEMENT_TD, children: [{ text: "6" }] },
				],
			},
		],
	},
]

const plugins = [
	createReactPlugin(),
	createHistoryPlugin(),
	...createBasicElementPlugins(),
	...createBasicMarkPlugins(),
]

const Editor = () => {
	return (
		<SlatePlugins
			id={id}
			plugins={plugins}
			components={components}
			options={options}
			editableProps={editableProps}
			initialValue={initialValue}
		/>
	)
}
```

You can try using by [example sandbox](https://codesandbox.io/s/cihadslate-table-example-lzks2)

[screenshot]: https://raw.githubusercontent.com/cihad/slate-table/main/screenshot.png "@cihad/slate-table screenshot"
