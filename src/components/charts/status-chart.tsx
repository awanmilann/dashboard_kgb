"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const STATUS_COLORS: Record<string, string> = {
  Draft: "#9ca3af",
  Dilaporkan: "#f59e0b",
  "Dalam Penanganan": "#3b82f6",
  "Tindak Lanjut": "#8b5cf6",
  Selesai: "#10b981",
  Diarsipkan: "#6b7280",
}

interface StatusChartProps {
  data: { name: string; value: number }[]
}

export function StatusChart({ data }: StatusChartProps) {
  if (!data || data.length === 0 || data.every((d) => d.value === 0)) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Belum ada data status penanganan
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data.filter((d) => d.value > 0)}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.filter((d) => d.value > 0).map((entry, idx) => (
            <Cell key={idx} fill={STATUS_COLORS[entry.name] || "#7c3aed"} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span style={{ fontSize: "11px", color: "#6b7280" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
