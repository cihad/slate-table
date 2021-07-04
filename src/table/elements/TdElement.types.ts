import { ClassName, RootStyleSet } from "@udecode/slate-plugins"

export interface TdElementStyleProps extends ClassName {
	selectColumn?: boolean
	selectRow?: boolean
	removeColumn?: boolean
	removeRow?: boolean
	firstRowResizer?: boolean
	highlightResizer?: boolean
}

export interface TdElementStyleSet extends RootStyleSet {
	columnControl?: any
	rowControl?: any
	addColumn?: any
	addFirstColumn?: any
	addRow?: any
	addFirstRow?: any
	selectRow?: any
	selectColumn?: any
	resizeHandler?: any
}
