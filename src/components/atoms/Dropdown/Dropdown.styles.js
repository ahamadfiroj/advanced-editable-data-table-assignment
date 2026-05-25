import styled from 'styled-components'

export const DropdownLabel = styled.label`
  display: grid;
  gap: 4px;
  font-size: 0.87rem;
  color: #475569;
`

export const DropdownSelect = styled.select`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  padding: 7px 10px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`
