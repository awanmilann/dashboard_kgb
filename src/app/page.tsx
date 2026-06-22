import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Shield, BarChart3, MapPin, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dashboard">
      <header className="border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Dashboard KBG & TPKS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard-publik">
              <Button variant="ghost" className="text-gray-600 dark:text-gray-400">Dashboard Publik</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-sm">Masuk</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.12),transparent_60%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-medium mb-6 border border-purple-200 dark:border-purple-800">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Sistem Pemantauan Terintegrasi
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              Dashboard Pemantauan
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 block mt-2">
                KBG & TPKS
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Sistem pemantauan dan manajemen data kasus Kekerasan Berbasis Gender
              dan Tindak Pidana Kekerasan Seksual yang aman dan terpercaya.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-600/20">
                  Masuk ke Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard-publik">
                <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                  Dashboard Publik
                </Button>
              </Link>
            </div>
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
                className="p-6 bg-white dark:bg-gray-900/80 rounded-xl border border-gray-200/60 dark:border-gray-800/60 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200 hover:shadow-md hover:shadow-purple-900/5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <item.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-gray-950/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Dashboard Pemantauan KBG & TPKS.
          Dibangun untuk organisasi masyarakat sipil.
        </div>
      </footer>
    </div>
  )
}
