"use client"

import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters?: {
    key: string
    label: string
    options: FilterOption[]
    value: string
    onChange: (value: string) => void
  }[]
  onReset?: () => void
  className?: string
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  filters,
  onReset,
  className,
}: FilterBarProps) {
  const hasFilters = filters?.some((f) => f.value) || searchValue

  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      {onSearchChange && (
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      )}
      {filters?.map((filter) => (
        <Select
          key={filter.key}
          placeholder={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="min-w-[150px]"
        />
      ))}
      {hasFilters && onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} className="text-gray-600 dark:text-gray-400">
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      )}
    </div>
  )
}
