const FIRST_NAMES = [
  'Ava',
  'Noah',
  'Mia',
  'Liam',
  'Emma',
  'Ethan',
  'Sophia',
  'James',
  'Olivia',
  'Lucas',
]

const LAST_NAMES = [
  'Smith',
  'Johnson',
  'Taylor',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
  'Moore',
  'Jackson',
  'White',
]

const DEPARTMENTS = ['Engineering', 'Sales', 'Finance', 'Operations', 'HR', 'Marketing']
const DOMAINS = ['example.com', 'company.io', 'workplace.org']

const salaryFor = (index) => 35000 + ((index * 1973) % 95000)
const quantityFor = (index) => (index * 17) % 500

export function generateRows(count = 12000) {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length]
    const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length]
    const department = DEPARTMENTS[(i * 7) % DEPARTMENTS.length]
    const domain = DOMAINS[(i * 5) % DOMAINS.length]

    return {
      id,
      name: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}${id}`.toLowerCase() + `@${domain}`,
      department,
      salary: salaryFor(id),
      quantity: quantityFor(id),
    }
  })
}
