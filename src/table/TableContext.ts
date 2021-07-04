import { createContext, useContext } from "react"

type columnSetter = (columnIndex: number | null) => void
type rowSetter = (row: number[] | null) => void

export interface TableContextInterface {
	selected: boolean
	highlightRow: number[]
	setHighlightRow: rowSetter
	highlightColumn: number
	setHighlightColumn: columnSetter
	highlightRemoveColumn: number
	setHighlightRemoveColumn: columnSetter
	highlightRemoveRow: number[]
	setHighlightRemoveRow: rowSetter
	selectedColumn: number
	setSelectedColumn: columnSetter
	selectedRow: number[]
	setSelectedRow: rowSetter
	hlResizeColumn: number
	setHlResizeColumn: columnSetter
	resizingColumn: number
	setResizingColumn: columnSetter
	setColumnWidth: (columnIndex: number, width: number) => void
}

export const TableContext = createContext<TableContextInterface | null>(null)

export const useTable = () => {
	return useContext(TableContext)
}
