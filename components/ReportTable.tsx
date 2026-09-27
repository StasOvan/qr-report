'use client'

import { useState, useEffect, useMemo } from 'react'
import type { ReportItem } from '@/types/report'
import { REPORT_JSON_URL } from '@/lib/constants'
import ReportRow from './ReportRow'
import FilterInput from './FilterInput'
import RefreshButton from './RefreshButton'

export default function ReportTable() {
  const [data, setData] = useState<ReportItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')

  const loadReport = async () => {
    setLoading(true)
    setError(null)
    try {
      // Date.now() — чтобы браузер не кэшировал ответ
      const res = await fetch(`${REPORT_JSON_URL}?t=${Date.now()}`)
      if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`)
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReport()
  }, [])

  const filtered = useMemo(() => {
    return data
      .filter(item =>
        item.city?.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) =>
        new Date(b.time).getTime() - new Date(a.time).getTime()
      )
  }, [data, filter])

  return (
    <>
      <FilterInput value={filter} onChange={setFilter} />
      <RefreshButton onClick={loadReport} disabled={loading} />

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

      {!error && (
        <table>
          <thead>
            <tr>
              <th>Время</th>
              <th>Город</th>
              <th>IP</th>
              <th>Слаг</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4}>Нет данных</td></tr>
            ) : (
              filtered.map((item, i) => <ReportRow key={i} {...item} />)
            )}
          </tbody>
        </table>
      )}
    </>
  )
}