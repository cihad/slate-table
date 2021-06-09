import { getRenderElement, SlatePlugin } from '@udecode/slate-plugins-core'
import {
  withTable,
  getTableOnKeyDown,
  getTableDeserialize,
  KEYS_TABLE
} from '@udecode/slate-plugins-table'

export const createTablePlugin = (): SlatePlugin => ({
  pluginKeys: KEYS_TABLE,
  renderElement: getRenderElement(KEYS_TABLE),
  deserialize: getTableDeserialize(),
  onKeyDown: getTableOnKeyDown(),
  withOverrides: withTable()
})
