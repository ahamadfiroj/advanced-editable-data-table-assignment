import styled, { css } from 'styled-components'

const controlStyles = css`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  padding: 7px 10px;
`

export const ToolbarShell = styled.section`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
`

export const ToolbarMain = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`

export const ToolbarBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 10px;
`

export const ToolbarLabel = styled.label`
  display: grid;
  gap: 4px;
  font-size: 0.87rem;
  color: #475569;
`

export const ToolbarButton = styled.button`
  ${controlStyles}
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

export const ToolbarSelect = styled.select`
  ${controlStyles}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

export const ToolbarStatus = styled.div`
  text-align: right;
  color: #64748b;
  font-size: 0.9rem;

  p {
    margin: 0;
  }

  @media (max-width: 840px) {
    text-align: left;
  }
`

export const StatusText = styled.p`
  color: ${({ $unsaved }) => ($unsaved ? '#b91c1c' : '#15803d')};
  font-weight: ${({ $unsaved }) => ($unsaved ? 600 : 400)};
`

export const FiltersGrid = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
`

export const FilterInputLabel = styled.label`
  display: grid;
  gap: 4px;
  font-size: 0.86rem;
  color: #475569;
`

export const FilterInputControl = styled.input`
  ${controlStyles}
  width: 100%;
`

export const PaginationControlsWrap = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  span {
    padding-inline: 4px;
  }
`
