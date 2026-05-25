import { memo, useMemo } from 'react'
import { List } from 'react-window'
import { useTableContext } from '../../context/TableContext.jsx'
import {
  ActionButton,
  ActionButtons,
  ActionCell,
  Cell,
  CellInput,
  DataRowWrap,
  EmptyState,
  HeaderActionCell,
  HeaderCell,
  NonVirtualList,
  TableHeaderRow,
  TableShell,
} from './VirtualizedEditableTable.styles.js'

const ROW_HEIGHT = 52

function SortLabel({ direction }) {
  if (direction === 'asc') return '↑'
  if (direction === 'desc') return '↓'
  return '↕'
}

function RowActions({ rowId, isDirty, canUndo, onSave, onCancel, onUndo }) {
  return (
    <ActionButtons>
      <ActionButton type="button" onClick={() => onSave(rowId)} disabled={!isDirty}>
        Save
      </ActionButton>
      <ActionButton type="button" onClick={() => onCancel(rowId)} disabled={!isDirty}>
        Cancel
      </ActionButton>
      <ActionButton type="button" onClick={() => onUndo(rowId)} disabled={!canUndo}>
        Undo
      </ActionButton>
    </ActionButtons>
  )
}

const DataRow = memo(function DataRow({
  row,
  columns,
  draft,
  isDirty,
  canUndo,
  onCellEdit,
  onSave,
  onCancel,
  onUndo,
  style,
}) {
  return (
    <DataRowWrap $dirty={isDirty} style={style}>
      {columns.map((column) => {
        const value = draft?.[column.key] ?? row[column.key]
        return (
          <Cell key={`${row.id}-${column.key}`} $width={column.width}>
            {column.key === 'id' ? (
              <span>{row.id}</span>
            ) : (
              <CellInput
                type={column.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(event) => onCellEdit(row.id, column.key, event.target.value)}
                aria-label={`${column.label} for row ${row.id}`}
              />
            )}
          </Cell>
        )
      })}

      <ActionCell>
        <RowActions
          rowId={row.id}
          isDirty={isDirty}
          canUndo={canUndo}
          onSave={onSave}
          onCancel={onCancel}
          onUndo={onUndo}
        />
      </ActionCell>
    </DataRowWrap>
  )
})

function VirtualRow({
  index,
  style,
  rows,
  columns,
  drafts,
  updateCell,
  saveRow,
  cancelRow,
  undoRow,
  canUndo,
  isRowDirty,
}) {
  const row = rows[index]

  return (
    <DataRow
      row={row}
      columns={columns}
      draft={drafts[row.id]}
      isDirty={isRowDirty(row.id)}
      canUndo={canUndo(row.id)}
      onCellEdit={updateCell}
      onSave={saveRow}
      onCancel={cancelRow}
      onUndo={undoRow}
      style={style}
    />
  )
}

function VirtualizedEditableTable({ rows, columns, sortConfig, onSort, isVirtualMode }) {
  const { drafts, updateCell, saveRow, cancelRow, undoRow, canUndo, isRowDirty } = useTableContext()

  const sortMap = useMemo(() => {
    const map = new Map()
    sortConfig.forEach((item) => map.set(item.key, item.direction))
    return map
  }, [sortConfig])

  const rowProps = useMemo(
    () => ({
      rows,
      columns,
      drafts,
      updateCell,
      saveRow,
      cancelRow,
      undoRow,
      canUndo,
      isRowDirty,
    }),
    [rows, columns, drafts, updateCell, saveRow, cancelRow, undoRow, canUndo, isRowDirty],
  )

  return (
    <TableShell aria-label="Editable data table">
      <TableHeaderRow role="row">
        {columns.map((column) => (
          <HeaderCell
            type="button"
            key={column.key}
            $width={column.width}
            onClick={(event) => onSort(column.key, event.shiftKey)}
            title="Click to sort, Shift+Click for multi-sort"
          >
            <span>{column.label}</span>
            {column.sortable && <SortLabel direction={sortMap.get(column.key)} />}
          </HeaderCell>
        ))}
        <HeaderActionCell>Actions</HeaderActionCell>
      </TableHeaderRow>

      {!rows.length ? (
        <EmptyState>No rows found for current filters.</EmptyState>
      ) : isVirtualMode ? (
        <List
          rowComponent={VirtualRow}
          rowCount={rows.length}
          rowHeight={ROW_HEIGHT}
          rowProps={rowProps}
          overscanCount={8}
          style={{ height: 560 }}
        />
      ) : (
        <NonVirtualList>
          {rows.map((row) => (
            <DataRow
              key={row.id}
              row={row}
              columns={columns}
              draft={drafts[row.id]}
              isDirty={isRowDirty(row.id)}
              canUndo={canUndo(row.id)}
              onCellEdit={updateCell}
              onSave={saveRow}
              onCancel={cancelRow}
              onUndo={undoRow}
            />
          ))}
        </NonVirtualList>
      )}
    </TableShell>
  )
}

export default VirtualizedEditableTable
