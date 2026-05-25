import { ButtonStyled } from './Button.styles.js'

function Button({ children, type = 'button', onClick, disabled = false }) {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  )
}

export default Button
