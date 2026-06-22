import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Shield, BarChart3, MapPin } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-semibold text-gray-900">
              Dashboard KBG & TPKS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard-publik">
              <Button variant="ghost">Dashboard Publik</Button>
            </Link>
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Dashboard Pemantauan
            <span className="text-purple-600 block mt-2">
              KBG & TPKS
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Sistem pemantauan dan manajemen data kasus Kekerasan Berbasis Gender
            dan Tindak Pidana Kekerasan Seksual yang aman dan terpercaya.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/login">
              <Button size="lg">Masuk ke Dashboard</Button>
            </Link>
            <Link href="/dashboard-publik">
              <Button variant="outline" size="lg">
                Dashboard Publik
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Manajemen Kasus",
                desc: "Kelola data kasus dengan aman dan sistematis",
              },
              {
                icon: BarChart3,
                title: "Dashboard & Laporan",
                desc: "Visualisasi data dan laporan agregat",
              },
              {
                icon: MapPin,
                title: "Peta Persebaran",
                desc: "Pemetaan sebaran kasus per wilayah",
              },
              {
                icon: FileText,
                title: "Verifikasi & Rujukan",
                desc: "Alur verifikasi dan rujukan terintegrasi",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Dashboard Pemantauan KBG & TPKS.
          Dibangun untuk organisasi masyarakat sipil.
        </div>
      </footer>
    </div>
  )
}
