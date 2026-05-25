import styled from 'styled-components'

export const ButtonStyled = styled.button`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  padding: 7px 10px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`
