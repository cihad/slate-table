import { ClassName, RootStyleSet } from "@udecode/slate-plugins"
import { IStyle } from "@uifabric/styling"
import { TdElementStyleSet } from "./TdElement.types"

export const getTdElementStyles = ({
	className,
	removeColumn,
	removeRow,
	selectColumn,
	selectRow,
	firstRowResizer,
	highlightResizer,
	showInsertionBar,
	firstColumnInsertionBar,
}: any): TdElementStyleSet => {
	const activeControl = {
		border: "1px solid var(--selected-cell-border-color)",
		background: "var(--selected-control-background-color)",
		zIndex: 100,
	}

	const control = [
		"control",
		{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			border: "1px solid var(--table-border-color)",
			position: "absolute",
			background: "var(--control-background-color)",
			boxSizing: "border-box",
			selectors: {
				":hover": activeControl,
				"> button": {
					position: "absolute",
					display: "inline-flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 3,
					width: 16,
					height: 16,
					border: 0,
					padding: 0,
					fontSize: "1.1em",
					background: "var(--remove-button-background)",
					color: "var(--remove-button-color)",
				},
			},
		},
	]

	const add = [
		"add",
		{
			position: "absolute",
			display: "inline-flex",
			justifyContent: "center",
			alignItems: "center",
			width: 16,
			height: 16,
			selectors: {
				":before": {
					content: "'•'",
					borderRadius: "50%",
					color: "var(--add-circle-color)",
					fontSize: "0.9em",
				},
				":hover:before": {
					display: "none",
				},
				":hover:after": {
					content: "'+'",
					fontSize: "0.8em",
					background: "rgb(244, 245, 247)",
					display: "inline-flex",
					justifyContent: "center",
					alignItems: "center",
					width: 16,
					height: 16,
					borderRadius: 2,
				},
			},
		},
	]

	const highlightResizerStyle = {
		content: "''",
		display: "block",
		width: 2,
		background: "var(--selected-cell-border-color)",
		margin: "0 auto",
		height: "100%",
	}
	return {
		root: [
			{
				borderWidth: "1px 0 0 1px",
				borderStyle: "solid",
				borderColor: "var(--table-border-color)",
				minHeight: 40,
				padding: 8,
				position: "relative",
				minWidth: 50,
			},
			selectColumn && [
				"select-column",
				{
					border: "1px solid var(--selected-cell-border-color)",
					selectors: {
						"& .column-control": activeControl,
					},
				},
			],
			selectRow && [
				"select-row",
				{
					border: "1px solid var(--selected-cell-border-color)",
					selectors: {
						"& .row-control": activeControl,
					},
				},
			],
			removeColumn && [
				"remove-column",
				{
					border: "1px solid var(--remove-border)",
					selectors: {
						"& .column-control": {
							border: "1px solid var(--remove-border)",
							background: "var(--control-remove-background)",
						},
						"& .column-control > button": {
							background: "var(--remove-border)",
							color: "white",
						},
					},
				},
			],
			removeRow && [
				"remove-row",
				{
					border: "1px solid var(--remove-border)",
					selectors: {
						"& .row-control": {
							border: "1px solid var(--remove-border)",
							background: "var(--control-remove-background)",
						},
						"& .row-control > button": {
							background: "var(--remove-border)",
							color: "white",
						},
					},
				},
			],
			className,
		],
		columnControl: [
			"column-control",
			control,
			{
				borderBottom: "none !important",
				top: 0,
				left: 0,
				width: "calc(100% + 2px)",
				height: 10,
				transform: "translate(-1px, -11px)",
				alignItems: "flex-start",
				selectors: {
					":hover": {
						borderBottom: "none !important",
					},
					"> button": {
						transform: "translateY(calc(-100% - 5px))",
					},
				},
			},
		],
		rowControl: [
			"row-control",
			control,
			{
				borderRight: "none !important",
				top: 0,
				left: 0,
				height: "calc(100% + 2px)",
				width: 10,
				transform: "translate(-11px, -1px)",
				justifyContent: "flex-start",
				selectors: {
					":hover": {
						borderRight: "none !important",
					},
					"> button": {
						transform: "translateX(calc(-100% - 5px))",
					},
				},
			},
		],
		addColumn: [
			add,
			{
				right: 0,
				top: 0,
				transform: "translate(8px, -30px)",
			},
		],
		addFirstColumn: [
			add,
			{
				left: 0,
				top: 0,
				transform: "translate(-8px, -30px)",
			},
		],
		addRow: [
			add,
			{
				left: 0,
				bottom: 0,
				transform: "translate(-30px, 8px)",
			},
		],
		addFirstRow: [
			add,
			{
				left: 0,
				top: 0,
				transform: "translate(-30px, -8px)",
			},
		],
		resizeHandler: [
			"resize-handler",
			{
				position: "absolute",
				right: -5,
				bottom: 0,
				top: 0,
				width: 10,
				zIndex: 200,
				cursor: "col-resize",
				selectors: {
					":hover:before": highlightResizerStyle,
				},
			},
			firstRowResizer && [
				"first-row-resizer",
				{
					top: "-10px !important",
				},
			],
			highlightResizer && [
				"highlight",
				{
					selectors: {
						":before": highlightResizerStyle,
					},
				},
			],
		],
		insertionBar: [
			"insertion-bar",
			{
				position: "absolute",
				bottom: -1,
				right: 0,
				display: "none",
				width: "100%",
				height: 2,
				background: "var(--selected-cell-border-color)",
				zIndex: 10,
			},
			showInsertionBar && [
				"show-insertion-bar",
				{
					display: "block",
				},
			],
			firstColumnInsertionBar && [
				"first-column-insertion-bar",
				{
					width: "calc(100% + 10px)",
				},
			],
		],
	}
}
