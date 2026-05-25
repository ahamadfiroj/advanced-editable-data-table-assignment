import { InputControl, InputLabel } from './Input.styles.js'

function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  ariaLabel,
}) {
  return (
    <InputLabel>
      <span>{label}</span>
      <InputControl
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel || label}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputLabel>
  )
}

export default Input
