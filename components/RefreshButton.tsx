export default function RefreshButton({ onClick, disabled }: {
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {disabled ? 'Загрузка...' : 'Обновить данные'}
    </button>
  )
}