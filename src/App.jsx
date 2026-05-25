import { useMemo, useState } from 'react'
import { COLUMNS } from './constants/columns.js'
import TableToolbar from './components/TableToolbar.jsx'
import VirtualizedEditableTable from './components/VirtualizedEditableTable.jsx'
import { useTableContext } from './context/TableContext.jsx'
import { useBeforeUnloadPrompt } from './hooks/useBeforeUnloadPrompt.js'
import { GlobalStyle } from './styles/GlobalStyle.js'
import { AppHeader, AppShell } from './styles/App.styles.js'

const PAGE_SIZE_OPTIONS = [25, 50, 100]

function applyFilters(rows, filters) {
  return rows.filter((row) => {
    const nameOk = row.name.toLowerCase().includes(filters.name.toLowerCase())
    const emailOk = row.email.toLowerCase().includes(filters.email.toLowerCase())
    const departmentOk = row.department
      .toLowerCase()
      .includes(filters.department.toLowerCase())

    const salaryMinOk = filters.salaryMin === '' || Number(row.salary) >= Number(filters.salaryMin)
    const salaryMaxOk = filters.salaryMax === '' || Number(row.salary) <= Number(filters.salaryMax)
    const quantityMinOk =
      filters.quantityMin === '' || Number(row.quantity) >= Number(filters.quantityMin)
    const quantityMaxOk =
      filters.quantityMax === '' || Number(row.quantity) <= Number(filters.quantityMax)

    return (
      nameOk &&
      emailOk &&
      departmentOk &&
      salaryMinOk &&
      salaryMaxOk &&
      quantityMinOk &&
      quantityMaxOk
    )
  })
}

function applySort(rows, sortConfig) {
  if (!sortConfig.length) return rows

  return [...rows].sort((a, b) => {
    for (const sorter of sortConfig) {
      const first = a[sorter.key]
      const second = b[sorter.key]

      if (first === second) continue

      const direction = sorter.direction === 'asc' ? 1 : -1
      if (typeof first === 'number' && typeof second === 'number') {
        return (first - second) * direction
      }

      return String(first).localeCompare(String(second)) * direction
    }

    return 0
  })
}

function getNextSort(currentDirection) {
  if (!currentDirection) return 'asc'
  if (currentDirection === 'asc') return 'desc'
  return null
}

function App() {
  const { rows, getResolvedRow, hasUnsavedChanges, exportCsv } = useTableContext()

  const [mode, setMode] = useState('virtual')
  const [pageSize, setPageSize] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    department: '',
    salaryMin: '',
    salaryMax: '',
    quantityMin: '',
    quantityMax: '',
  })
  const [sortConfig, setSortConfig] = useState([])

  useBeforeUnloadPrompt(hasUnsavedChanges)

  const resolvedRows = useMemo(() => rows.map((row) => getResolvedRow(row.id)), [rows, getResolvedRow])
  const filteredRows = useMemo(() => applyFilters(resolvedRows, filters), [resolvedRows, filters])
  const sortedRows = useMemo(() => applySort(filteredRows, sortConfig), [filteredRows, sortConfig])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedRows = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [safeCurrentPage, pageSize, sortedRows])

  const tableRows = mode === 'virtual' ? sortedRows : paginatedRows

  const handleSort = (columnKey, isMultiSort) => {
    setSortConfig((prev) => {
      const existing = prev.find((item) => item.key === columnKey)
      const nextDirection = getNextSort(existing?.direction)

      if (!isMultiSort) {
        return nextDirection ? [{ key: columnKey, direction: nextDirection }] : []
      }

      const withoutCurrent = prev.filter((item) => item.key !== columnKey)
      return nextDirection
        ? [...withoutCurrent, { key: columnKey, direction: nextDirection }]
        : withoutCurrent
    })
  }

  const clearFilters = () => {
    setFilters({
      name: '',
      email: '',
      department: '',
      salaryMin: '',
      salaryMax: '',
      quantityMin: '',
      quantityMax: '',
    })
    setCurrentPage(1)
  }

  const clearSort = () => setSortConfig([])

  return (
    <>
      <GlobalStyle />
      <AppShell>
        <AppHeader>
        <h1>Advanced Editable Data Table</h1>
        <p>
          12,000+ rows with inline editing, row-level save/cancel/undo, multi-sort,
          filtering, virtualization, and pagination fallback.
        </p>
        </AppHeader>

        <TableToolbar
          mode={mode}
          onModeChange={setMode}
          pageSize={pageSize}
          onPageSizeChange={(value) => {
            setPageSize(value)
            setCurrentPage(1)
          }}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalRows={sortedRows.length}
          filters={filters}
          onFilterChange={(key, value) => {
            setFilters((prev) => ({ ...prev, [key]: value }))
            setCurrentPage(1)
          }}
          onClearFilters={clearFilters}
          onClearSort={clearSort}
          onExportCsv={() => exportCsv(sortedRows)}
          hasUnsavedChanges={hasUnsavedChanges}
        />

        <VirtualizedEditableTable
          rows={tableRows}
          columns={COLUMNS}
          sortConfig={sortConfig}
          onSort={handleSort}
          isVirtualMode={mode === 'virtual'}
        />
      </AppShell>
    </>
  )
}

export default App
