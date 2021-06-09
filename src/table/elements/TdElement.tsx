import { useEffect, useRef, useCallback } from "react"
import { Editor, Node, Path, Transforms } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import { TableContextInterface, useTable } from "./TableContext"
import { getBlockAbove } from "@udecode/slate-plugins"
import { TableElementType, TrElementType } from "../types"
import {
	ClassName,
	RootStyleSet,
	StyledElementProps,
	getRootClassNames,
} from "@udecode/slate-plugins"
import { styled } from "@uifabric/utilities"
import { getTdElementStyles } from "./TdElement.styles"
import { TdElementStyleProps, TdElementStyleSet } from "./TdElement.types"

const MIN_WIDTH = 50
const getClassNames =
	getRootClassNames<TdElementStyleProps, TdElementStyleSet>()

export const TdElementBase = ({
	attributes,
	children,
	element,
	className,
	styles,
	nodeProps,
}: StyledElementProps) => {
	const mouseMoveEventRef = useRef<any>(null)
	const editor = useSlate() as ReactEditor
	const {
		selected: tableSelected,
		highlightRow,
		setHighlightRow,
		highlightColumn,
		setHighlightColumn,
		setSelectedRow,
		selectedRow,
		selectedColumn,
		setSelectedColumn,
		highlightRemoveColumn,
		setHighlightRemoveColumn,
		highlightRemoveRow,
		setHighlightRemoveRow,
		hlResizeColumn,
		setHlResizeColumn,
		resizingColumn,
		setResizingColumn,
		setColumnWidth,
	} = useTable() as TableContextInterface
	const path = ReactEditor.findPath(editor, element)
	const columnIdx = path[path.length - 1]
	const [tr, trPath] = getBlockAbove(editor, {
		at: ReactEditor.findPath(editor as ReactEditor, element),
		mode: "lowest",
	}) as [TrElementType, Path]

	const [table, tablePath] = getBlockAbove(editor, {
		at: trPath,
		mode: "lowest",
	}) as [TableElementType, Path]

	const rowControlRef = useRef(null)
	const columnControlRef = useRef(null)

	let isFirstColumn = false
	if (tr.children[0] === element) {
		isFirstColumn = true
	}

	let isFirstRow = false
	if (table.children[0] === tr) {
		isFirstRow = true
	}

	useEffect(() => {
		if (!tableSelected) {
			setHighlightColumn(null)
			setSelectedRow(null)
			setSelectedColumn(null)
		}
	}, [tableSelected])

	const mouseMoveEventHandler = useCallback(
		({ startWidth, startX }: any) => {
			const eventHandler = (e: MouseEvent) => {
				let width = startWidth + e.pageX - startX
				setColumnWidth(columnIdx, width)
			}
			mouseMoveEventRef.current = eventHandler
			return eventHandler
		},
		[columnIdx, setColumnWidth, mouseMoveEventRef]
	)

	const mouseUpEventHandler = useCallback(
		(e: any) => {
			setResizingColumn(null)
			document.body.style.removeProperty("cursor")
			document.removeEventListener("mousemove", mouseMoveEventRef.current)
			document.removeEventListener("mouseup", mouseUpEventHandler)
		},
		[editor, element, path, mouseMoveEventRef]
	)

	const mouseDownEventHandler = useCallback(
		(e: any) => {
			document.body.style.setProperty("cursor", "col-resize")
			const startX = e.pageX
			const tdElement = ReactEditor.toDOMNode(editor, element)
			const startWidth = tdElement.offsetWidth
			setResizingColumn(columnIdx)
			document.addEventListener(
				"mousemove",
				mouseMoveEventHandler({ startWidth, startX })
			)
			document.addEventListener("mouseup", mouseUpEventHandler)
		},
		[
			editor,
			element,
			columnIdx,
			setResizingColumn,
			mouseMoveEventHandler,
			mouseUpEventHandler,
		]
	)

	// const classNames = {
	// 	"select-column":
	// 		columnIdx === highlightColumn || columnIdx === selectedColumn,
	// 	"select-row":
	// 		(highlightRow && Path.equals(trPath, highlightRow)) ||
	// 		(selectedRow && Path.equals(trPath, selectedRow)),
	// 	"remove-column": columnIdx === highlightRemoveColumn,
	// 	"remove-row":
	// 		highlightRemoveRow && Path.equals(trPath, highlightRemoveRow),
	// }

	// const serializeClassNames = (classNames: {
	// 	[index: string]: boolean
	// }): string =>
	// 	Object.entries(classNames)
	// 		.filter(([_, val]) => !!val)
	// 		.map(([klass]) => klass)
	// 		.join(" ")

	const classNames = getClassNames(styles, {
		className,
		selectColumn:
			columnIdx === highlightColumn || columnIdx === selectedColumn,
		selectRow:
			(highlightRow && Path.equals(trPath, highlightRow)) ||
			(selectedRow && Path.equals(trPath, selectedRow)),
		removeColumn: columnIdx === highlightRemoveColumn,
		removeRow:
			highlightRemoveRow && Path.equals(trPath, highlightRemoveRow),
		firstRowResizer: isFirstRow,
		highlightResizer:
			hlResizeColumn === columnIdx || resizingColumn === columnIdx,
	})

	return (
		<td {...attributes} className={classNames.root} {...nodeProps}>
			{children}
			{tableSelected && isFirstRow && (
				<>
					<div
						ref={columnControlRef}
						contentEditable={false}
						className={classNames.columnControl}
						onClick={() => {
							setSelectedColumn(columnIdx)
							setSelectedRow(null)
						}}
						onMouseOver={() => {
							setHighlightColumn(columnIdx)
						}}
						onMouseOut={() => {
							setHighlightColumn(null)
						}}
					>
						{selectedColumn === columnIdx && (
							<button
								onMouseOver={() => {
									setHighlightRemoveColumn(columnIdx)
								}}
								onMouseOut={() => {
									setHighlightRemoveColumn(null)
								}}
								onClick={() => {
									for (const [, childTRPath] of Node.children(
										editor,
										tablePath
									)) {
										setTimeout(() => {
											Transforms.removeNodes(editor, {
												at: [...childTRPath, columnIdx],
											})
										}, 0)
									}

									setHighlightRemoveColumn(null)
								}}
							>
								&times;
							</button>
						)}
					</div>
					<div
						contentEditable={false}
						className={classNames.addColumn}
						onClick={() => {
							let newPath: Path | number = Path.next(path)
							newPath = newPath[newPath.length - 1]
							for (const [, childTRPath] of Node.children(
								editor,
								tablePath
							)) {
								Transforms.insertNodes(
									editor,
									{
										type: "td",
										children: [{ text: "" }],
									} as Node,
									{
										at: [...childTRPath, newPath],
										select:
											childTRPath[
												childTRPath.length - 1
											] === 0,
									}
								)
							}

							setHighlightRemoveRow(null)
						}}
					></div>
				</>
			)}
			{tableSelected && isFirstColumn && (
				<>
					<div
						ref={rowControlRef}
						contentEditable={false}
						className={classNames.rowControl}
						onClick={() => {
							setSelectedRow(trPath)
							setSelectedColumn(null)
						}}
						onMouseOver={() => {
							setHighlightRow(trPath)
						}}
						onMouseOut={() => {
							setHighlightRow(null)
						}}
					>
						{selectedRow && Path.equals(selectedRow, trPath) && (
							<button
								onMouseOver={() => {
									setHighlightRemoveRow(trPath)
								}}
								onMouseOut={() => {
									setHighlightRemoveRow(null)
								}}
								onClick={() => {
									console.log("clicked")
									setTimeout(() => {
										Transforms.removeNodes(editor, {
											at: trPath,
										})
									}, 0)
								}}
							>
								&times;
							</button>
						)}
					</div>
					<div
						contentEditable={false}
						className={classNames.addRow}
						onClick={() => {
							const children = Array(
								Array.from(Node.children(tr, [])).length
							)
								.fill(null)
								.map(() => ({
									type: "td",
									children: [{ text: "" }],
								}))

							Transforms.insertNodes(
								editor,
								{
									type: "tr",
									children,
								} as Node,
								{
									at: Path.next(trPath),
								}
							)

							const startPoint = Editor.start(
								editor,
								Path.next(trPath)
							)
							Transforms.select(editor, startPoint)
						}}
					></div>
				</>
			)}
			{tableSelected && (
				<div
					className={classNames.resizeHandler}
					onMouseOver={() => {
						setHlResizeColumn(columnIdx)
					}}
					onMouseOut={() => {
						setHlResizeColumn(null)
					}}
					onMouseDown={mouseDownEventHandler}
					contentEditable={false}
				></div>
			)}
		</td>
	)
}

export const TdElement = styled<StyledElementProps, ClassName, RootStyleSet>(
	TdElementBase,
	getTdElementStyles,
	undefined,
	{
		scope: "TdElement",
	}
)
