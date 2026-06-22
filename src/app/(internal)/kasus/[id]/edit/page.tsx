"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"
import { ChevronLeft, ChevronRight, Save, Send } from "lucide-react"

const steps = [
  { id: 1, label: "Informasi Pelaporan" },
  { id: 2, label: "Informasi Kejadian" },
  { id: 3, label: "Profil Penyintas" },
  { id: 4, label: "Penanganan & Layanan" },
  { id: 5, label: "Tinjau & Kirim" },
]

export default function EditKasusPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const [organisasi, setOrganisasi] = useState("upt_p2tp2a")
  const [tanggalLapor, setTanggalLapor] = useState("2026-01-15")
  const [lokasiPelaporan, setLokasiPelaporan] = useState("jakarta")
  const [kategori, setKategori] = useState("kbg")
  const [sumber, setSumber] = useState("korban")
  const [urgensi, setUrgensi] = useState("sedang")
  const [catatanPelaporan, setCatatanPelaporan] = useState("")

  const [tanggalKejadian, setTanggalKejadian] = useState("2026-01-10")
  const [lokasiKejadian, setLokasiKejadian] = useState("jakarta")
  const [settingKejadian, setSettingKejadian] = useState("rumah")
  const [pelaku, setPelaku] = useState("pasangan")
  const [jenisKekerasan, setJenisKekerasan] = useState("fisik")
  const [deskripsiKejadian, setDeskripsiKejadian] = useState("Korban mengalami kekerasan fisik oleh pelaku...")

  const [kodePenyintas] = useState("P-EDIT001")
  const [kelompokUsia, setKelompokUsia] = useState("dewasa")
  const [jenisKelamin, setJenisKelamin] = useState("p")
  const [disabilitas, setDisabilitas] = useState("tidak")
  const [statusPerkawinan, setStatusPerkawinan] = useState("kawin")
  const [pekerjaan, setPekerjaan] = useState("irt")
  const [pendidikan, setPendidikan] = useState("sma")
  const [kelompokRentan, setKelompokRentan] = useState("tidak")
  const [penyintasUtama, setPenyintasUtama] = useState(true)

  const [tingkatRisiko, setTingkatRisiko] = useState("HIGH")
  const [layananDibutuhkan, setLayananDibutuhkan] = useState("konseling")
  const [statusLayanan, setStatusLayanan] = useState("proses")
  const [penyediaLayanan, setPenyediaLayanan] = useState("upt")
  const [kebutuhanRujukan, setKebutuhanRujukan] = useState("medis")
  const [catatanPenanganan, setCatatanPenanganan] = useState("")

  const [setujuKirim, setSetujuKirim] = useState(false)

  const handleSubmit = (action: "draft" | "verifikasi") => {
    const message = action === "draft"
      ? "Data kasus berhasil diperbarui sebagai draft"
      : "Data kasus berhasil diperbarui dan dikirim untuk verifikasi"
    alert(message)
    router.push("/kasus")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Kasus" />

      <div className="flex items-center justify-between bg-white rounded-lg border p-4">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep === step.id
                    ? "bg-purple-600 text-white"
                    : currentStep > step.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {currentStep > step.id ? "✓" : step.id}
              </div>
              <span
                className={cn(
                  "text-sm hidden sm:inline",
                  currentStep === step.id ? "font-medium text-purple-700" : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organisasi">Organisasi Pelapor</Label>
                <Select
                  id="organisasi"
                  options={[
                    { value: "upt_p2tp2a", label: "UPT P2TP2A" },
                    { value: "dinas", label: "Dinas Sosial" },
                    { value: "puskesmas", label: "Puskesmas" },
                  ]}
                  value={organisasi}
                  onChange={(e) => setOrganisasi(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggal_lapor">Tanggal Lapor</Label>
                <Input id="tanggal_lapor" type="date" value={tanggalLapor} onChange={(e) => setTanggalLapor(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lokasi_pelaporan">Lokasi Pelaporan</Label>
                <Select
                  id="lokasi_pelaporan"
                  options={[
                    { value: "jakarta", label: "Jakarta" },
                    { value: "jabar", label: "Jawa Barat" },
                  ]}
                  value={lokasiPelaporan}
                  onChange={(e) => setLokasiPelaporan(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori Kasus</Label>
                <Select
                  id="kategori"
                  options={[
                    { value: "kbg", label: "KBG" },
                    { value: "tpks", label: "TPKS" },
                  ]}
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sumber">Sumber Informasi</Label>
                <Select
                  id="sumber"
                  options={[
                    { value: "korban", label: "Korban Langsung" },
                    { value: "keluarga", label: "Keluarga" },
                  ]}
                  value={sumber}
                  onChange={(e) => setSumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgensi">Tingkat Urgensi</Label>
                <Select
                  id="urgensi"
                  options={[
                    { value: "rendah", label: "Rendah" },
                    { value: "sedang", label: "Sedang" },
                    { value: "tinggi", label: "Tinggi" },
                  ]}
                  value={urgensi}
                  onChange={(e) => setUrgensi(e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggal_kejadian">Tanggal Kejadian</Label>
                <Input id="tanggal_kejadian" type="date" value={tanggalKejadian} onChange={(e) => setTanggalKejadian(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lokasi_kejadian">Lokasi Kejadian</Label>
                <Select
                  id="lokasi_kejadian"
                  options={[
                    { value: "jakarta", label: "Jakarta" },
                    { value: "jabar", label: "Jawa Barat" },
                  ]}
                  value={lokasiKejadian}
                  onChange={(e) => setLokasiKejadian(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setting_kejadian">Setting Kejadian</Label>
                <Select
                  id="setting_kejadian"
                  options={[
                    { value: "rumah", label: "Rumah Tinggal" },
                    { value: "sekolah", label: "Sekolah" },
                    { value: "tempat_kerja", label: "Tempat Kerja" },
                  ]}
                  value={settingKejadian}
                  onChange={(e) => setSettingKejadian(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pelaku">Hubungan Pelaku</Label>
                <Select
                  id="pelaku"
                  options={[
                    { value: "pasangan", label: "Pasangan" },
                    { value: "keluarga", label: "Keluarga" },
                  ]}
                  value={pelaku}
                  onChange={(e) => setPelaku(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenis_kekerasan">Jenis Kekerasan</Label>
                <Select
                  id="jenis_kekerasan"
                  options={[
                    { value: "fisik", label: "Kekerasan Fisik" },
                    { value: "psikis", label: "Kekerasan Psikis" },
                    { value: "seksual", label: "Kekerasan Seksual" },
                  ]}
                  value={jenisKekerasan}
                  onChange={(e) => setJenisKekerasan(e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kode Penyintas</Label>
                <Input value={kodePenyintas} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kelompok_usia">Kelompok Usia</Label>
                <Select
                  id="kelompok_usia"
                  options={[
                    { value: "anak", label: "Anak" },
                    { value: "remaja", label: "Remaja" },
                    { value: "dewasa", label: "Dewasa" },
                    { value: "lansia", label: "Lansia" },
                  ]}
                  value={kelompokUsia}
                  onChange={(e) => setKelompokUsia(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                <Select
                  id="jenis_kelamin"
                  options={[
                    { value: "l", label: "Laki-laki" },
                    { value: "p", label: "Perempuan" },
                  ]}
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabilitas">Disabilitas</Label>
                <Select
                  id="disabilitas"
                  options={[
                    { value: "tidak", label: "Tidak" },
                    { value: "fisik", label: "Disabilitas Fisik" },
                  ]}
                  value={disabilitas}
                  onChange={(e) => setDisabilitas(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status_perkawinan">Status Perkawinan</Label>
                <Select
                  id="status_perkawinan"
                  options={[
                    { value: "belum", label: "Belum Kawin" },
                    { value: "kawin", label: "Kawin" },
                    { value: "cerai", label: "Cerai" },
                  ]}
                  value={statusPerkawinan}
                  onChange={(e) => setStatusPerkawinan(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pekerjaan">Pekerjaan</Label>
                <Select
                  id="pekerjaan"
                  options={[
                    { value: "tidak_bekerja", label: "Tidak Bekerja" },
                    { value: "irt", label: "Ibu Rumah Tangga" },
                    { value: "swasta", label: "Karyawan Swasta" },
                    { value: "pns", label: "PNS" },
                  ]}
                  value={pekerjaan}
                  onChange={(e) => setPekerjaan(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pendidikan">Pendidikan</Label>
                <Select
                  id="pendidikan"
                  options={[
                    { value: "sd", label: "SD" },
                    { value: "smp", label: "SMP" },
                    { value: "sma", label: "SMA" },
                    { value: "s1", label: "S1" },
                  ]}
                  value={pendidikan}
                  onChange={(e) => setPendidikan(e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tingkat_risiko">Tingkat Risiko</Label>
                <Select
                  id="tingkat_risiko"
                  options={[
                    { value: "LOW", label: "Rendah" },
                    { value: "MODERATE", label: "Sedang" },
                    { value: "HIGH", label: "Tinggi" },
                    { value: "CRITICAL", label: "Kritis" },
                  ]}
                  value={tingkatRisiko}
                  onChange={(e) => setTingkatRisiko(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="layanan_dibutuhkan">Layanan Dibutuhkan</Label>
                <Select
                  id="layanan_dibutuhkan"
                  options={[
                    { value: "konseling", label: "Konseling" },
                    { value: "medis", label: "Medis" },
                    { value: "hukum", label: "Hukum" },
                  ]}
                  value={layananDibutuhkan}
                  onChange={(e) => setLayananDibutuhkan(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status_layanan">Status Layanan</Label>
                <Select
                  id="status_layanan"
                  options={[
                    { value: "baru", label: "Baru" },
                    { value: "proses", label: "Dalam Proses" },
                    { value: "selesai", label: "Selesai" },
                  ]}
                  value={statusLayanan}
                  onChange={(e) => setStatusLayanan(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kebutuhan_rujukan">Kebutuhan Rujukan</Label>
                <Select
                  id="kebutuhan_rujukan"
                  options={[
                    { value: "tidak", label: "Tidak Perlu" },
                    { value: "medis", label: "Rujukan Medis" },
                    { value: "hukum", label: "Rujukan Hukum" },
                  ]}
                  value={kebutuhanRujukan}
                  onChange={(e) => setKebutuhanRujukan(e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-gray-900">Ringkasan Data Kasus</h4>
                <p className="text-sm text-gray-500">
                  Periksa kembali data yang telah diisi sebelum menyimpan perubahan.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="setuju_kirim"
                  checked={setujuKirim}
                  onChange={(e) => setSetujuKirim(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <Label htmlFor="setuju_kirim">
                  Saya menyatakan bahwa data yang diisi telah lengkap dan benar
                </Label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => handleSubmit("draft")}>
                  <Save className="h-4 w-4 mr-1" />
                  Simpan sebagai Draft
                </Button>
                <Button onClick={() => handleSubmit("verifikasi")} disabled={!setujuKirim}>
                  <Send className="h-4 w-4 mr-1" />
                  Kirim untuk Verifikasi
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Sebelumnya
        </Button>
        {currentStep < 5 && (
          <Button onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}>
            Selanjutnya
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  )
}
