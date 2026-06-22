"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface MapPoint {
  id: string
  name: string
  latitude: number
  longitude: number
  total: number
  high_risk: number
  intensity: number
}

interface DashboardMapProps {
  data: MapPoint[]
  empty?: boolean
  emptyMessage?: string
  title?: string
}

export function DashboardMap({
  data,
  empty = false,
  emptyMessage = "Belum ada data persebaran.",
  title = "Peta Persebaran Kasus",
}: DashboardMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (empty || !data || data.length === 0) return

    let L: any
    let initMap = async () => {
      L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")

      if (!mapRef.current || mapInstanceRef.current) return

      const map = L.map(mapRef.current, {
        center: [-2.5, 118],
        zoom: 5,
        scrollWheelZoom: true,
        zoomControl: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map)

      const maxTotal = Math.max(...data.map((d) => d.total), 1)

      data.forEach((point) => {
        if (!point.latitude || !point.longitude) return

        const radius = Math.max(6, (point.total / maxTotal) * 30)
        const color = point.high_risk > 0 ? "#ef4444" : "#7c3aed"

        const circle = L.circleMarker([point.latitude, point.longitude], {
          radius,
          fillColor: color,
          color: "#fff",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.6,
        }).addTo(map)

        circle.bindPopup(`
          <div style="font-family:sans-serif;font-size:12px;min-width:150px">
            <strong style="font-size:14px">${point.name}</strong>
            <hr style="margin:4px 0;border:none;border-top:1px solid #eee"/>
            <div>Total Kasus: <strong>${point.total}</strong></div>
            <div>Risiko Tinggi: <strong style="color:#ef4444">${point.high_risk}</strong></div>
          </div>
        `)

        markersRef.current.push(circle)
      })

      if (data.length > 0) {
        const coords = data.filter((d) => d.latitude && d.longitude)
        if (coords.length > 0) {
          const bounds = L.latLngBounds(coords.map((d) => [d.latitude, d.longitude]))
          map.fitBounds(bounds, { padding: [50, 50] })
        }
      }

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersRef.current = []
      }
    }
  }, [data, empty])

  if (empty) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MapPin className="h-12 w-12 mb-3" />
            <p className="text-sm text-center max-w-sm">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: "8px", zIndex: 0 }} />
      </CardContent>
    </Card>
  )
}
