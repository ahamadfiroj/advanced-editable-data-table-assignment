import { DropdownLabel, DropdownSelect } from './Dropdown.styles.js'

function Dropdown({
  label,
  name,
  value,
  options,
  onChange,
  disabled = false,
  ariaLabel,
}) {
  return (
    <DropdownLabel>
      <span>{label}</span>
      <DropdownSelect
        name={name}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel || label}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => {
          if (typeof option === 'object') {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          }

          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </DropdownSelect>
    </DropdownLabel>
  )
}

export default Dropdown
