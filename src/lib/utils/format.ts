export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-"
  const d = new Date(date)
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "-"
  const d = new Date(date)
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "0"
  return num.toLocaleString("id-ID")
}

export function generateCaseNumber(orgCode: string, year: number, sequence: number): string {
  const seq = sequence.toString().padStart(4, "0")
  return `KBG/${orgCode}/${year}/${seq}`
}
