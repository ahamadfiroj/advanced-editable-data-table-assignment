import { Button, Dropdown, Input, Status } from '../atoms'
import {
  FiltersGrid,
  PaginationControlsWrap,
  ToolbarBlock,
  ToolbarMain,
  ToolbarShell,
} from './TableSearchFilter.styles.js'

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <PaginationControlsWrap role="group" aria-label="Pagination">
      <Button onClick={() => onPageChange(1)} disabled={currentPage <= 1}>
        « First
      </Button>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
        ‹ Prev
      </Button>
      <span>
        Page <strong>{currentPage}</strong> / {totalPages}
      </span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next ›
      </Button>
      <Button onClick={() => onPageChange(totalPages)} disabled={currentPage >= totalPages}>
        Last »
      </Button>
    </PaginationControlsWrap>
  )
}

function TableSearchFilter({
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
          <Dropdown
            label="View mode"
            name="viewMode"
            value={mode}
            options={[
              { label: 'Virtual scrolling', value: 'virtual' },
              { label: 'Pagination fallback', value: 'pagination' },
            ]}
            onChange={onModeChange}
          />

          <Dropdown
            label="Rows per page"
            name="rowsPerPage"
            value={String(pageSize)}
            options={pageSizeOptions.map((size) => ({ label: String(size), value: String(size) }))}
            disabled={mode !== 'pagination'}
            onChange={(value) => onPageSizeChange(Number(value))}
          />

          <Button onClick={onClearFilters}>Clear filters</Button>
          <Button onClick={onClearSort}>Clear sorting</Button>
          <Button onClick={onExportCsv}>Export CSV</Button>
        </ToolbarBlock>

        <Status totalRows={totalRows} hasUnsavedChanges={hasUnsavedChanges} />
      </ToolbarMain>

      <FiltersGrid>
        <Input
          label="Name"
          name="name"
          value={filters.name}
          onChange={(value) => onFilterChange('name', value)}
          placeholder="Search name"
        />
        <Input
          label="Email"
          name="email"
          value={filters.email}
          onChange={(value) => onFilterChange('email', value)}
          placeholder="Search email"
        />
        <Input
          label="Department"
          name="department"
          value={filters.department}
          onChange={(value) => onFilterChange('department', value)}
          placeholder="Search department"
        />
        <Input
          label="Salary Min"
          name="salaryMin"
          type="number"
          value={filters.salaryMin}
          onChange={(value) => onFilterChange('salaryMin', value)}
        />
        <Input
          label="Salary Max"
          name="salaryMax"
          type="number"
          value={filters.salaryMax}
          onChange={(value) => onFilterChange('salaryMax', value)}
        />
        <Input
          label="Quantity Min"
          name="quantityMin"
          type="number"
          value={filters.quantityMin}
          onChange={(value) => onFilterChange('quantityMin', value)}
        />
        <Input
          label="Quantity Max"
          name="quantityMax"
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

export default TableSearchFilter
