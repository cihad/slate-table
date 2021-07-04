import { useCallback, useEffect, useRef, useState } from "react"
import { Node, Transforms } from "slate"
import { useSlate, useSelected, ReactEditor } from "slate-react"
import { TableContext, TableContextInterface } from "./TableContext"
import {
	ClassName,
	RootStyleSet,
	StyledElementProps,
	getRootClassNames,
} from "@udecode/slate-plugins"
import { styled } from "@uifabric/utilities"
import { getTableElementStyles } from "./TableElement.styles"

const getClassNames = getRootClassNames()

export const TableElementBase = ({
	attributes,
	children,
	element,
	className,
	styles,
	nodeProps,
}: StyledElementProps) => {
	const classNames = getClassNames(styles, {
		className,
	})

	const editor = useSlate()
	const path = ReactEditor.findPath(editor as ReactEditor, element)
	const selected = useSelected()
	const [highlightRow, setHighlightRow] = useState<number[] | null>(null)
	const [highlightColumn, setHighlightColumn] = useState<number | null>(null)
	const [selectedRow, setSelectedRow] = useState<number[] | null>(null)
	const [selectedColumn, setSelectedColumn] = useState<number | null>(null)
	const [highlightRemoveRow, setHighlightRemoveRow] =
		useState<number[] | null>(null)
	const [highlightRemoveColumn, setHighlightRemoveColumn] =
		useState<number | null>(null)
	const [hlResizeColumn, setHlResizeColumn] = useState<number | null>(null)
	const [resizingColumn, setResizingColumn] = useState<number | null>(null)
	const [columnWidths, setColumnWidths] = useState(element.columnWidths || [])

	useEffect(() => {
		setHighlightRow(null)
		setHighlightColumn(null)
		setSelectedRow(null)
		setSelectedColumn(null)
		setHighlightRemoveRow(null)
		setHighlightRemoveColumn(null)
		// setHlResizeColumn(null)
	}, [editor.selection])

	// set columnWidths
	useEffect(() => {
		if (element.columnWidths) return
		const firstTr = Node.child(element, 0)
		const columnCount = Array.from(Node.children(firstTr, [])).length
		Transforms.setNodes(
			editor,
			{
				columnWidths: Array(columnCount).fill(null),
			} as Partial<Node>,
			{
				at: path,
			}
		)
	}, [])

	useEffect(() => {
		if (resizingColumn !== null) return

		Transforms.setNodes(editor, { columnWidths } as Partial<Node>, {
			at: path,
		})
	}, [resizingColumn])

	const setColumnWidth = useCallback(
		(columnIdx: number, width: number) => {
			if (width <= 50) return
			const widths = [...columnWidths]
			widths[columnIdx] = width
			setColumnWidths(widths)
		},
		[editor, path, columnWidths]
	)

	return (
		<table {...attributes} className={classNames.root} {...nodeProps}>
			<colgroup>
				{[...columnWidths].map((width: number, i: number) => (
					<col style={{ width }} key={i} />
				))}
			</colgroup>
			<TableContext.Provider
				value={
					{
						selected,
						highlightRow,
						setHighlightRow,
						highlightColumn,
						setHighlightColumn,
						highlightRemoveColumn,
						setHighlightRemoveColumn,
						highlightRemoveRow,
						setHighlightRemoveRow,
						selectedColumn,
						setSelectedColumn,
						selectedRow,
						setSelectedRow,
						hlResizeColumn,
						setHlResizeColumn,
						resizingColumn,
						setResizingColumn,
						setColumnWidth,
					} as TableContextInterface
				}
			>
				<tbody>{children}</tbody>
			</TableContext.Provider>
		</table>
	)
}

export const TableElement = styled<StyledElementProps, ClassName, RootStyleSet>(
	TableElementBase,
	getTableElementStyles,
	undefined,
	{
		scope: "TableElement",
	}
)
