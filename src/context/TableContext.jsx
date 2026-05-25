/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { generateRows } from '../data/generateRows.js'

const NUMBER_FIELDS = new Set(['salary', 'quantity'])

const TableContext = createContext(null)

function isSameValue(left, right) {
  return String(left ?? '') === String(right ?? '')
}

function getNormalizedValue(field, value, fallback) {
  if (!NUMBER_FIELDS.has(field)) return value

  if (value === '' || value === null || value === undefined) return fallback

  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

function applyDraft(row, draft = {}) {
  const next = { ...row }

  Object.keys(draft).forEach((field) => {
    next[field] = getNormalizedValue(field, draft[field], row[field])
  })

  return next
}

function isDraftDirty(row, draft = {}) {
  return Object.keys(draft).some((field) => !isSameValue(row[field], draft[field]))
}

function toCsv(rows) {
  if (!rows.length) return ''

  const headers = Object.keys(rows[0])
  const escape = (value) => {
    const text = String(value ?? '')
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return `"${text.replaceAll('"', '""')}"`
    }
    return text
  }

  const headerLine = headers.join(',')
  const rowLines = rows.map((row) => headers.map((key) => escape(row[key])).join(','))
  return [headerLine, ...rowLines].join('\n')
}

export function TableProvider({ children }) {
  const [rows, setRows] = useState(() => generateRows())
  const [drafts, setDrafts] = useState({})
  const [history, setHistory] = useState({})

  const rowsById = useMemo(() => {
    const map = new Map()
    rows.forEach((row) => map.set(row.id, row))
    return map
  }, [rows])

  const getResolvedRow = useCallback(
    (rowId) => {
      const row = rowsById.get(rowId)
      if (!row) return null
      return applyDraft(row, drafts[rowId])
    },
    [drafts, rowsById],
  )

  const updateCell = useCallback((rowId, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] ?? {}),
        [field]: value,
      },
    }))
  }, [])

  const cancelRow = useCallback((rowId) => {
    setDrafts((prev) => {
      if (!prev[rowId]) return prev

      const next = { ...prev }
      delete next[rowId]
      return next
    })
  }, [])

  const saveRow = useCallback(
    (rowId) => {
      const row = rowsById.get(rowId)
      const draft = drafts[rowId]
      if (!row || !draft) return

      const updated = applyDraft(row, draft)
      if (!isDraftDirty(row, draft)) {
        cancelRow(rowId)
        return
      }

      setHistory((prev) => ({
        ...prev,
        [rowId]: [...(prev[rowId] ?? []), row],
      }))

      setRows((prevRows) =>
        prevRows.map((item) => {
          if (item.id !== rowId) return item
          return updated
        }),
      )

      cancelRow(rowId)
    },
    [cancelRow, drafts, rowsById],
  )

  const undoRow = useCallback((rowId) => {
    let previousRow = null

    setHistory((prev) => {
      const stack = prev[rowId] ?? []
      if (!stack.length) return prev

      previousRow = stack[stack.length - 1]
      return {
        ...prev,
        [rowId]: stack.slice(0, -1),
      }
    })

    if (!previousRow) return

    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id !== rowId) return row
        return previousRow
      }),
    )

    cancelRow(rowId)
  }, [cancelRow])

  const hasUnsavedChanges = useMemo(() => {
    return Object.entries(drafts).some(([id, draft]) => {
      const row = rowsById.get(Number(id))
      if (!row) return false
      return isDraftDirty(row, draft)
    })
  }, [drafts, rowsById])

  const exportCsv = useCallback((tableRows) => {
    const csv = toCsv(tableRows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'editable-table-export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  const isRowDirty = useCallback(
    (rowId) => {
      const row = rowsById.get(rowId)
      if (!row || !drafts[rowId]) return false
      return isDraftDirty(row, drafts[rowId])
    },
    [drafts, rowsById],
  )

  const canUndo = useCallback(
    (rowId) => {
      return Boolean(history[rowId]?.length)
    },
    [history],
  )

  const value = {
    rows,
    drafts,
    rowsById,
    updateCell,
    saveRow,
    cancelRow,
    undoRow,
    canUndo,
    isRowDirty,
    hasUnsavedChanges,
    getResolvedRow,
    exportCsv,
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export function useTableContext() {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error('useTableContext must be used inside TableProvider')
  }

  return context
}
