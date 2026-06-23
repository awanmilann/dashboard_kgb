"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  ExternalLink,
  HeartPulse,
  Users,
  UserMinus,
  Heart,
  Scale,
  Hand,
  Baby,
  Shield,
  BarChart4,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface IndicatorData {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  category: string
  sdg?: string
  references: {
    label: string
    url: string
  }[]
}

const indicators: IndicatorData[] = [
  {
    id: "ipv",
    icon: HeartPulse,
    title: "Kekerasan Pasangan Intim (IPV)",
    description:
    "Proporsi perempuan dan anak perempuan (15-49 tahun) yang pernah memiliki pasangan dan mengalami kekerasan fisik, seksual, atau psikologis oleh pasangan intim saat ini atau sebelumnya dalam 12 bulan terakhir. Indikator inti SDG 5.2.1 ini mencakup tindakan kekerasan fisik (seperti dipukul, ditampar, ditendang), kekerasan seksual (dipaksa melakukan hubungan seksual), dan kekerasan psikologis (diancam, direndahkan).",
    category: "Kekerasan Langsung",
    sdg: "5.2.1",
    references: [
      {
        label: "UN Women — Global Indicator Framework for SDG 5.2.1",
        url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/data-and-statistics",
      },
      {
        label: "WHO — Violence Against Women Prevalence Estimates",
        url: "https://www.who.int/publications/i/item/9789240022256",
      },
    ],
  },
  {
    id: "sexual",
    icon: Heart,
    title: "Kekerasan Seksual Non-Pasangan",
    description:
    "Proporsi perempuan dan anak perempuan yang mengalami kekerasan seksual oleh seseorang selain pasangan intim dalam 12 bulan terakhir (SDG 5.2.2). Mencakup pemerkosaan, percobaan pemerkosaan, dan bentuk kekerasan seksual lainnya yang dilakukan oleh orang yang tidak dikenal, kenalan, teman, tetangga, atau anggota keluarga selain pasangan.",
    category: "Kekerasan Langsung",
    sdg: "5.2.2",
    references: [
      {
        label: "UN Women — Measuring Violence Against Women",
        url: "https://www.unwomen.org/en/digital-library/publications/2021/04/measuring-violence-against-women",
      },
      {
        label: "UNSD — Guidelines for Producing Statistics on Violence Against Women",
        url: "https://unstats.un.org/unsd/gender/docs/guidelines_statistics_vaw.pdf",
      },
    ],
  },
  {
    id: "fisik",
    icon: Hand,
    title: "Kekerasan Fisik",
    description:
    "Prevalensi perempuan yang pernah mengalami kekerasan fisik seumur hidup dan dalam 12 bulan terakhir, terlepas dari pelaku. Mencakup tindakan seperti ditampar, dipukul, ditendang, dicekik, dibakar, atau diancam dengan senjata. Data dikumpulkan melalui survei berbasis populasi seperti Demographic and Health Surveys (DHS) dan International Violence Against Women Surveys.",
    category: "Kekerasan Langsung",
    references: [
      {
        label: "UN Women — Global Database on Violence Against Women",
        url: "https://evaw-global-database.unwomen.org/en",
      },
      {
        label: "UNFPA — Gender-Based Violence Data Collection",
        url: "https://www.unfpa.org/gender-based-violence",
      },
    ],
  },
  {
    id: "psikologis",
    icon: UserMinus,
    title: "Kekerasan Psikologis & Emosional",
    description:
    "Tindakan yang menyebabkan trauma psikologis jangka panjang, termasuk penghinaan berulang, perendahan, penguntitan (stalking), pengucilan, ancaman kekerasan, pengendalian perilaku (isolasi dari keluarga/teman), dan pengendalian ekonomi. Diakui sebagai bentuk kekerasan berbasis gender yang serius dalam Deklarasi PBB tentang Penghapusan Kekerasan terhadap Perempuan.",
    category: "Kekerasan Tidak Langsung",
    references: [
      {
        label: "UN Women — Psychological Violence Framework",
        url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/global-norms-and-standards",
      },
      {
        label: "Council of Europe — Istanbul Convention (Article 3)",
        url: "https://www.coe.int/en/web/istanbul-convention/text-of-the-convention",
      },
    ],
  },
  {
    id: "ekonomi",
    icon: Scale,
    title: "Kekerasan Ekonomi",
    description:
    "Pengendalian sumber daya ekonomi sebagai bentuk kekerasan berbasis gender, termasuk melarang perempuan bekerja, mengambil penghasilan tanpa izin, menolak memberi nafkah, penguasaan aset sepihak, dan pembatasan akses terhadap layanan keuangan. Diakui dalam kerangka CEDAW dan Beijing Platform for Action sebagai hambatan struktural terhadap kesetaraan gender.",
    category: "Kekerasan Tidak Langsung",
    references: [
      {
        label: "UN Women — Economic Empowerment & VAW",
        url: "https://www.unwomen.org/en/what-we-do/economic-empowerment/economic-empowerment-and-violence-against-women",
      },
      {
        label: "World Bank — Gender-Based Violence and Economic Inclusion",
        url: "https://www.worldbank.org/en/topic/socialsustainability/brief/economic-inclusion-and-gender-based-violence",
      },
    ],
  },
  {
    id: "child-marriage",
    icon: Baby,
    title: "Perkawinan Anak",
    description:
    "Proporsi perempuan usia 20-24 tahun yang menikah atau dalam hubungan sebelum usia 18 tahun (SDG 5.3.1). Perkawinan anak merupakan bentuk kekerasan berbasis gender yang melanggar hak anak atas pendidikan, kesehatan, dan perlindungan. Anak perempuan yang menikah dini lebih rentan mengalami kekerasan rumah tangga dan putus sekolah.",
    category: "Praktik Berbahaya",
    sdg: "5.3.1",
    references: [
      {
        label: "UN Women — Child Marriage Data",
        url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/data-and-statistics",
      },
      {
        label: "UNICEF — Child Marriage Prevalence",
        url: "https://data.unicef.org/topic/child-protection/child-marriage/",
      },
    ],
  },
  {
    id: "fgm",
    icon: Shield,
    title: "Female Genital Mutilation (FGM/C)",
    description:
    "Proporsi anak perempuan dan perempuan usia 15-49 tahun yang telah menjalani Female Genital Mutilation/Cutting (SDG 5.3.2). FGM/C diakui secara internasional sebagai pelanggaran hak asasi manusia dan bentuk kekerasan berbasis gender yang mencakup semua prosedur yang melibatkan pengangkatan sebagian atau seluruh alat kelamin eksternal perempuan untuk alasan non-medis.",
    category: "Praktik Berbahaya",
    sdg: "5.3.2",
    references: [
      {
        label: "UN Women — FGM Data and Prevention",
        url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/data-and-statistics",
      },
      {
        label: "WHO — Female Genital Mutilation Fact Sheet",
        url: "https://www.who.int/news-room/fact-sheets/detail/female-genital-mutilation",
      },
    ],
  },
  {
    id: "attitudes",
    icon: Users,
    title: "Sikap terhadap Kekerasan",
    description:
    "Proporsi perempuan dan laki-laki yang menganggap suami dibenarkan memukul istri dalam situasi tertentu (seperti membakar makanan, membantah, pergi tanpa izin, menelantarkan anak, atau menolak hubungan seksual). Indikator ini mengukur norma sosial yang mentolerir kekerasan dan menjadi prediktor penting prevalensi kekerasan di tingkat komunitas.",
    category: "Norma Sosial",
    references: [
      {
        label: "UN Women — Attitudes and Social Norms on VAW",
        url: "https://www.unwomen.org/en/digital-library/publications/2019/1/attitudes-and-social-norms-on-violence-against-women",
      },
      {
        label: "UNSD — Indicator 5.2.1 & 5.2.2 Metadata",
        url: "https://unstats.un.org/sdgs/metadata/",
      },
    ],
  },
  {
    id: "trafficking",
    icon: Globe,
    title: "Perdagangan Manusia (Trafficking)",
    description:
    "Jumlah korban perdagangan manusia per 100.000 penduduk (SDG 16.2.2). Perempuan dan anak perempuan merupakan sebagian besar korban trafficking yang terdeteksi secara global, terutama untuk eksploitasi seksual. Kerangka UN Protocol to Prevent, Suppress and Punish Trafficking in Persons (Palermo Protocol) menjadi acuan utama penanganan.",
    category: "Kejahatan Transnasional",
    sdg: "16.2.2",
    references: [
      {
        label: "UNODC — Global Report on Trafficking in Persons",
        url: "https://www.unodc.org/unodc/en/data-and-analysis/glotip.html",
      },
      {
        label: "UN Women — Trafficking in Women and Girls",
        url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/global-norms-and-standards",
      },
    ],
  },
  {
    id: "femicide",
    icon: BarChart4,
    title: "Femisida (Pembunuhan Berbasis Gender)",
    description:
    "Pembunuhan perempuan karena alasan gender, termasuk pembunuhan oleh pasangan intim dan anggota keluarga. UN Women mengklasifikasikan femisida sebagai bentuk paling ekstrem dari kekerasan berbasis gender. Data global menunjukkan sebagian besar korban pembunuhan perempuan dibunuh oleh pasangan intim atau anggota keluarga, tidak seperti laki-laki yang sebagian besar dibunuh oleh orang luar.",
    category: "Kekerasan Langsung",
    references: [
      {
        label: "UN Women — Femicide Data and Prevention",
        url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/data-and-statistics",
      },
      {
        label: "UNODC — Killings of Women and Girls by Intimate Partners",
        url: "https://www.unodc.org/unodc/en/data-and-analysis/femicide.html",
      },
    ],
  },
]

const categoryColors: Record<string, string> = {
  "Kekerasan Langsung": "bg-red-500/10 text-red-400 border-red-500/30",
  "Kekerasan Tidak Langsung": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Praktik Berbahaya": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  "Norma Sosial": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Kejahatan Transnasional": "bg-purple-500/10 text-purple-400 border-purple-500/30",
}

export default function IndikatorGlobalPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Indikator Global Kekerasan terhadap Perempuan"
        description="Kerangka indikator global PBB untuk mengukur dan memantau kekerasan berbasis gender, bersumber dari UN Women dan badan PBB terkait"
      />

      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-purple-200 leading-relaxed">
                Komisi Statistik PBB melalui <strong>Inter-Agency Expert Group on SDG Indicators (IAEG-SDGs)</strong>{" "}
                telah menetapkan serangkaian indikator global untuk memantau Tujuan Pembangunan Berkelanjutan (SDGs),{" "}
                khususnya <strong>Target 5.2</strong> — Menghapuskan segala bentuk kekerasan terhadap perempuan dan anak{" "}
                perempuan di ruang publik dan privat. Indikator-indikator ini menjadi acuan bagi negara-negara anggota{" "}
                untuk mengumpulkan data yang terstandarisasi dan dapat diperbandingkan secara global.
              </p>
              <p className="text-xs text-purple-400/60">
                Sumber: UN Women — Global Database on Violence Against Women & UNSD — SDG Indicators Metadata
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator) => {
          const Icon = indicator.icon
          return (
            <Card key={indicator.id} className="group hover:border-purple-500/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-purple-500/10 shrink-0 group-hover:bg-purple-500/20 transition-colors">
                      <Icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-base text-purple-100">{indicator.title}</CardTitle>
                      {indicator.sdg && (
                        <p className="text-xs text-purple-400/60 mt-0.5">
                          SDG Target {indicator.sdg}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    className={cn("shrink-0 text-xs border", categoryColors[indicator.category])}
                  >
                    {indicator.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-sm text-purple-200/70 leading-relaxed">
                  {indicator.description}
                </CardDescription>
                <div className="space-y-1.5 pt-1 border-t border-purple-500/10">
                  <p className="text-xs font-medium text-purple-400/80 uppercase tracking-wider">Referensi:</p>
                  {indicator.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-purple-300/60 hover:text-purple-300 transition-colors group/link"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0 group-hover/link:text-purple-400" />
                      <span className="truncate group-hover/link:underline underline-offset-2">
                        {ref.label}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
