import styled from 'styled-components'

export const AppShell = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 840px) {
    padding: 14px;
  }
`

export const AppHeader = styled.header`
  h1 {
    margin: 0;
    font-size: 1.6rem;
  }

  p {
    margin: 8px 0 20px;
    color: #475569;
  }
`
