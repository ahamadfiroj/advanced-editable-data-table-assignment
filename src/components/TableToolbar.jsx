import {
  FilterInputControl,
  FilterInputLabel,
  FiltersGrid,
  PaginationControlsWrap,
  StatusText,
  ToolbarBlock,
  ToolbarButton,
  ToolbarLabel,
  ToolbarMain,
  ToolbarSelect,
  ToolbarShell,
  ToolbarStatus,
} from './TableToolbar.styles.js'

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <PaginationControlsWrap role="group" aria-label="Pagination">
      <ToolbarButton type="button" onClick={() => onPageChange(1)} disabled={currentPage <= 1}>
        « First
      </ToolbarButton>
      <ToolbarButton
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ‹ Prev
      </ToolbarButton>
      <span>
        Page <strong>{currentPage}</strong> / {totalPages}
      </span>
      <ToolbarButton
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next ›
      </ToolbarButton>
      <ToolbarButton
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
      >
        Last »
      </ToolbarButton>
    </PaginationControlsWrap>
  )
}

function FilterInput({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <FilterInputLabel>
      <span>{label}</span>
      <FilterInputControl
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </FilterInputLabel>
  )
}

function TableToolbar({
  mode,
  onModeChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
  currentPage,
  totalPages,
  onPageChange,
  totalRows,
  filters,
  onFilterChange,
  onClearFilters,
  onClearSort,
  onExportCsv,
  hasUnsavedChanges,
}) {
  return (
    <ToolbarShell aria-label="Table controls">
      <ToolbarMain>
        <ToolbarBlock>
          <ToolbarLabel>
            View mode
            <ToolbarSelect value={mode} onChange={(event) => onModeChange(event.target.value)}>
              <option value="virtual">Virtual scrolling</option>
              <option value="pagination">Pagination fallback</option>
            </ToolbarSelect>
          </ToolbarLabel>

          <ToolbarLabel>
            Rows per page
            <ToolbarSelect
              value={pageSize}
              disabled={mode !== 'pagination'}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </ToolbarSelect>
          </ToolbarLabel>

          <ToolbarButton type="button" onClick={onClearFilters}>
            Clear filters
          </ToolbarButton>
          <ToolbarButton type="button" onClick={onClearSort}>
            Clear sorting
          </ToolbarButton>
          <ToolbarButton type="button" onClick={onExportCsv}>
            Export CSV
          </ToolbarButton>
        </ToolbarBlock>

        <ToolbarStatus>
          <p>
            Showing <strong>{totalRows.toLocaleString()}</strong> rows
          </p>
          <StatusText $unsaved={hasUnsavedChanges}>
            {hasUnsavedChanges ? 'Unsaved row edits' : 'All changes saved'}
          </StatusText>
        </ToolbarStatus>
      </ToolbarMain>

      <FiltersGrid>
        <FilterInput
          label="Name"
          value={filters.name}
          onChange={(value) => onFilterChange('name', value)}
          placeholder="Search name"
        />
        <FilterInput
          label="Email"
          value={filters.email}
          onChange={(value) => onFilterChange('email', value)}
          placeholder="Search email"
        />
        <FilterInput
          label="Department"
          value={filters.department}
          onChange={(value) => onFilterChange('department', value)}
          placeholder="Search department"
        />
        <FilterInput
          label="Salary Min"
          type="number"
          value={filters.salaryMin}
          onChange={(value) => onFilterChange('salaryMin', value)}
        />
        <FilterInput
          label="Salary Max"
          type="number"
          value={filters.salaryMax}
          onChange={(value) => onFilterChange('salaryMax', value)}
        />
        <FilterInput
          label="Quantity Min"
          type="number"
          value={filters.quantityMin}
          onChange={(value) => onFilterChange('quantityMin', value)}
        />
        <FilterInput
          label="Quantity Max"
          type="number"
          value={filters.quantityMax}
          onChange={(value) => onFilterChange('quantityMax', value)}
        />
      </FiltersGrid>

      {mode === 'pagination' && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </ToolbarShell>
  )
}

export default TableToolbar
