import styled from 'styled-components'

export const StatusWrap = styled.div`
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

export const StatusLine = styled.p`
  color: ${({ $unsaved }) => ($unsaved ? '#b91c1c' : '#15803d')};
  font-weight: ${({ $unsaved }) => ($unsaved ? 600 : 400)};
`
