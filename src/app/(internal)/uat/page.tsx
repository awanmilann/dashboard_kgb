"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Star, Send, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const categories = [
  { value: "ui", label: "Tampilan & UI" },
  { value: "functionality", label: "Fungsionalitas" },
  { value: "performance", label: "Kinerja" },
  { value: "data", label: "Data & Informasi" },
  { value: "suggestion", label: "Saran Fitur" },
  { value: "bug", label: "Laporan Bug" },
  { value: "other", label: "Lainnya" },
]

export default function UatPage() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [category, setCategory] = useState("")
  const [feedbackText, setFeedbackText] = useState("")
  const [pageUrl, setPageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 && !feedbackText.trim()) return

    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/uat-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_url: pageUrl || window.location.pathname,
          rating,
          feedback_text: feedbackText,
          category: category || undefined,
          browser_info: navigator.userAgent,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError("Gagal mengirim feedback")
      }
    } catch (e) {
      setError("Terjadi kesalahan server")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <PageHeader title="User Acceptance Test" description="Berikan feedback untuk pengembangan aplikasi" />
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Terima Kasih!</h3>
            <p className="text-gray-500 text-center max-w-sm">
              Feedback Anda sangat berharga untuk pengembangan aplikasi ini.
            </p>
            <Button className="mt-6" onClick={() => { setSubmitted(false); setRating(0); setFeedbackText(""); setPageUrl(""); setCategory("") }}>
              Kirim Feedback Lain
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="User Acceptance Test" description="Berikan feedback untuk pengembangan aplikasi" />

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Feedback</CardTitle>
            <CardDescription>
              Bantu kami meningkatkan aplikasi dengan memberikan penilaian dan masukan Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-colors"
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-colors",
                          (hoverRating || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  id="category"
                  placeholder="Pilih kategori"
                  options={categories}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="page_url">Halaman (opsional)</Label>
                <input
                  id="page_url"
                  type="text"
                  placeholder="/dashboard"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Masukan / Saran</Label>
                <Textarea
                  id="feedback"
                  placeholder="Ceritakan pengalaman Anda menggunakan aplikasi ini..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={5}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" disabled={loading || (rating === 0 && !feedbackText.trim())} className="w-full">
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Mengirim...</>
                ) : (
                  <><Send className="h-4 w-4 mr-2" /> Kirim Feedback</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
