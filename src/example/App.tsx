import {
	SlatePlugins,
	createReactPlugin,
	StyledElement,
	withProps,
	createHistoryPlugin,
	createTablePlugin,
} from "@udecode/slate-plugins"

import { TableElement, TdElement } from "../table"

import {
	ELEMENT_TABLE,
	ELEMENT_TR,
	ELEMENT_TD,
} from "@udecode/slate-plugins-table"

import "./App.css"
import { useState } from "react"
import { Descendant } from "slate"

const plugins = [
	createReactPlugin(),
	createTablePlugin(),
	createHistoryPlugin(),
]

const initialValue = [
	{
		type: "table",
		children: [
			{
				type: "tr",
				children: [
					{
						type: "td",
						children: [
							{
								text: "1",
							},
						],
					},
					{
						type: "td",
						children: [
							{
								text: "2",
							},
						],
					},
					{
						type: "td",
						children: [
							{
								text: "3",
							},
						],
					},
				],
			},
			{
				type: "tr",
				children: [
					{
						type: "td",
						children: [
							{
								text: "4",
							},
						],
					},
					{
						type: "td",
						children: [
							{
								text: "5",
							},
						],
					},
					{
						type: "td",
						children: [
							{
								text: "6",
							},
						],
					},
				],
			},
		],
	},
]

const components = {
	[ELEMENT_TABLE]: TableElement,
	[ELEMENT_TR]: withProps(StyledElement, { as: "tr" }),
	[ELEMENT_TD]: TdElement,
}

export const App = () => {
	const [debugValue, setDebugValue] = useState<Descendant[]>(initialValue)
	const editableProps = {
		placeholder: "Type..",
	}

	return (
		<>
			<SlatePlugins
				initialValue={debugValue}
				editableProps={editableProps}
				plugins={plugins}
				components={components}
				onChange={(newValue) => {
					setDebugValue(newValue)
				}}
			/>
			<details style={{ marginTop: 20 }}>
				<summary>Node</summary>
				<pre>{JSON.stringify(debugValue, null, 2)}</pre>
			</details>
		</>
	)
}
