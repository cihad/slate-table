import { Text } from 'slate'

export type TdElementType = {
	type: 'td',
	children: Text[] 
}

export type TrElementType = {
	type: 'tr',
	children: TdElementType[]
}

export type TableElementType = {
	type: 'table',
	children: TrElementType[]
}