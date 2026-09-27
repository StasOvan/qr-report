export default function FilterInput({ value, onChange }: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Фильтр по городу..."
    />
  )
}