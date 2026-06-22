"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface LocationBarChartProps {
  data: { name: string; total: number; verified: number; high_risk: number }[]
}

export function LocationBarChart({ data }: LocationBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Belum ada data persebaran wilayah
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9ca3af" />
        <YAxis
          dataKey="name"
          type="category"
          tick={{ fontSize: 10 }}
          stroke="#9ca3af"
          width={120}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="total" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Total" />
      </BarChart>
    </ResponsiveContainer>
  )
}
