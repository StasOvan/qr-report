import type { ReportItem } from '@/types/report'

export default function ReportRow({ time, city, ip, slug }: ReportItem) {
  return (
    <tr>
      <td>{time}</td>
      <td>{city}</td>
      <td>{ip}</td>
      <td>{slug}</td>
    </tr>
  )
}
