import { ClassName, RootStyleSet } from "@udecode/slate-plugins"

export const getTableElementStyles = ({
	className,
}: ClassName): RootStyleSet => ({
	root: [
		{
			"--table-border-color": "rgb(193, 199, 208)",
			"--control-background-color": "rgb(244, 245, 247)",
			"--selected-cell-border-color": "rgb(0, 101, 255)",
			"--selected-control-background-color": "rgb(76, 154, 255)",
			"--remove-button-background": "rgba(9, 30, 66, 0.04)",
			"--remove-button-color": "rgb(94, 108, 132)",
			"--remove-border": "rgb(255, 86, 48)",
			"--control-remove-background": "rgb(255, 189, 173)",
			"--add-circle-color": "rgb(193, 199, 208)",
			borderCollapse: "collapse",
			border: "1px solid #ccc",
		},
		className,
	],
})
