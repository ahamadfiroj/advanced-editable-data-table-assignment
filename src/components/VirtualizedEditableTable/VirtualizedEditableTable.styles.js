import styled, { css } from 'styled-components'

const controlStyles = css`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  padding: 7px 10px;
`

export const TableShell = styled.section`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
`

export const TableHeaderRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  background: #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 2;
`

export const HeaderCell = styled.button`
  border: none;
  background: transparent;
  border-right: 1px solid #e2e8f0;
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  padding: 12px;
  cursor: pointer;
  width: ${({ $width }) => $width || 'auto'};

  &:last-child {
    border-right: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

export const HeaderActionCell = styled.div`
  border-right: none;
  width: 220px;
  min-width: 220px;
  padding: 12px;
  font-weight: 600;
`

export const DataRowWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  background: ${({ $dirty }) => ($dirty ? '#fffbeb' : '#fff')};
`

export const Cell = styled.div`
  padding: 8px;
  border-right: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  min-height: 52px;
  width: ${({ $width }) => $width || 'auto'};
`

export const CellInput = styled.input`
  width: 100%;
  border: 1px solid #dbe2ea;
  border-radius: 8px;
  padding: 7px 9px;
`

export const ActionCell = styled(Cell)`
  width: 220px;
  min-width: 220px;
  border-right: none;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button`
  ${controlStyles}
  cursor: pointer;
  padding: 6px 10px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

export const NonVirtualList = styled.div`
  max-height: 560px;
  overflow: auto;
`

export const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: #64748b;
`
