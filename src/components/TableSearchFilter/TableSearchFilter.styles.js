import styled from 'styled-components'

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

export const FiltersGrid = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
