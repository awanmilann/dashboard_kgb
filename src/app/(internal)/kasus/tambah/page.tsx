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

export default function TambahKasusPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const [organisasi, setOrganisasi] = useState("")
  const [tanggalLapor, setTanggalLapor] = useState("")
  const [lokasiPelaporan, setLokasiPelaporan] = useState("")
  const [kategori, setKategori] = useState("")
  const [sumber, setSumber] = useState("")
  const [urgensi, setUrgensi] = useState("")
  const [catatanPelaporan, setCatatanPelaporan] = useState("")

  const [tanggalKejadian, setTanggalKejadian] = useState("")
  const [lokasiKejadian, setLokasiKejadian] = useState("")
  const [settingKejadian, setSettingKejadian] = useState("")
  const [pelaku, setPelaku] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")
  const [deskripsiKejadian, setDeskripsiKejadian] = useState("")

  const [kodePenyintas] = useState("P-" + Date.now().toString(36).toUpperCase())
  const [kelompokUsia, setKelompokUsia] = useState("")
  const [jenisKelamin, setJenisKelamin] = useState("")
  const [disabilitas, setDisabilitas] = useState("")
  const [statusPerkawinan, setStatusPerkawinan] = useState("")
  const [pekerjaan, setPekerjaan] = useState("")
  const [pendidikan, setPendidikan] = useState("")
  const [kelompokRentan, setKelompokRentan] = useState("")
  const [penyintasUtama, setPenyintasUtama] = useState(false)

  const [tingkatRisiko, setTingkatRisiko] = useState("")
  const [layananDibutuhkan, setLayananDibutuhkan] = useState("")
  const [statusLayanan, setStatusLayanan] = useState("")
  const [penyediaLayanan, setPenyediaLayanan] = useState("")
  const [kebutuhanRujukan, setKebutuhanRujukan] = useState("")
  const [catatanPenanganan, setCatatanPenanganan] = useState("")

  const [setujuKirim, setSetujuKirim] = useState(false)

  const handleSubmit = (action: "draft" | "verifikasi") => {
    const message = action === "draft"
      ? "Data kasus berhasil disimpan sebagai draft"
      : "Data kasus berhasil dikirim untuk verifikasi"
    alert(message)
    router.push("/kasus")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Kasus Baru" />

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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organisasi">Organisasi Pelapor</Label>
                  <Select
                    id="organisasi"
                    placeholder="Pilih organisasi"
                    options={[
                      { value: "upt_p2tp2a", label: "UPT P2TP2A" },
                      { value: "dinas", label: "Dinas Sosial" },
                      { value: "puskesmas", label: "Puskesmas" },
                      { value: "polres", label: "Polres" },
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
                    placeholder="Pilih lokasi"
                    options={[
                      { value: "jakarta", label: "Jakarta" },
                      { value: "jabar", label: "Jawa Barat" },
                      { value: "jateng", label: "Jawa Tengah" },
                    ]}
                    value={lokasiPelaporan}
                    onChange={(e) => setLokasiPelaporan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kategori">Kategori Kasus</Label>
                  <Select
                    id="kategori"
                    placeholder="Pilih kategori"
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
                    placeholder="Pilih sumber"
                    options={[
                      { value: "korban", label: "Korban Langsung" },
                      { value: "keluarga", label: "Keluarga" },
                      { value: "masyarakat", label: "Masyarakat" },
                      { value: "institusi", label: "Institusi" },
                    ]}
                    value={sumber}
                    onChange={(e) => setSumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgensi">Tingkat Urgensi</Label>
                  <Select
                    id="urgensi"
                    placeholder="Pilih urgensi"
                    options={[
                      { value: "rendah", label: "Rendah" },
                      { value: "sedang", label: "Sedang" },
                      { value: "tinggi", label: "Tinggi" },
                      { value: "darurat", label: "Darurat" },
                    ]}
                    value={urgensi}
                    onChange={(e) => setUrgensi(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="catatan_pelaporan">Catatan Pelaporan</Label>
                <textarea
                  id="catatan_pelaporan"
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  placeholder="Catatan tambahan..."
                  value={catatanPelaporan}
                  onChange={(e) => setCatatanPelaporan(e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal_kejadian">Tanggal Kejadian</Label>
                  <Input id="tanggal_kejadian" type="date" value={tanggalKejadian} onChange={(e) => setTanggalKejadian(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lokasi_kejadian">Lokasi Kejadian</Label>
                  <Select
                    id="lokasi_kejadian"
                    placeholder="Pilih lokasi"
                    options={[
                      { value: "jakarta", label: "Jakarta" },
                      { value: "jabar", label: "Jawa Barat" },
                      { value: "jateng", label: "Jawa Tengah" },
                    ]}
                    value={lokasiKejadian}
                    onChange={(e) => setLokasiKejadian(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setting_kejadian">Setting/Tempat Kejadian</Label>
                  <Select
                    id="setting_kejadian"
                    placeholder="Pilih setting"
                    options={[
                      { value: "rumah", label: "Rumah Tinggal" },
                      { value: "sekolah", label: "Sekolah" },
                      { value: "tempat_kerja", label: "Tempat Kerja" },
                      { value: "fasilitas_umum", label: "Fasilitas Umum" },
                      { value: "online", label: "Daring/Online" },
                    ]}
                    value={settingKejadian}
                    onChange={(e) => setSettingKejadian(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pelaku">Hubungan Pelaku</Label>
                  <Select
                    id="pelaku"
                    placeholder="Pilih hubungan"
                    options={[
                      { value: "pasangan", label: "Pasangan" },
                      { value: "mantan_pasangan", label: "Mantan Pasangan" },
                      { value: "keluarga", label: "Keluarga" },
                      { value: "atasan", label: "Atasan" },
                      { value: "rekan_kerja", label: "Rekan Kerja" },
                      { value: "tidak_dikenal", label: "Tidak Dikenal" },
                    ]}
                    value={pelaku}
                    onChange={(e) => setPelaku(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jenis_kekerasan">Jenis Kekerasan</Label>
                  <Select
                    id="jenis_kekerasan"
                    placeholder="Pilih jenis"
                    options={[
                      { value: "fisik", label: "Kekerasan Fisik" },
                      { value: "psikis", label: "Kekerasan Psikis" },
                      { value: "seksual", label: "Kekerasan Seksual" },
                      { value: "ekonomi", label: "Penelantaran Ekonomi" },
                      { value: "multi", label: "Multi (Campuran)" },
                    ]}
                    value={jenisKekerasan}
                    onChange={(e) => setJenisKekerasan(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi_kejadian">Deskripsi Kejadian</Label>
                <textarea
                  id="deskripsi_kejadian"
                  className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  placeholder="Deskripsikan kejadian secara kronologis..."
                  value={deskripsiKejadian}
                  onChange={(e) => setDeskripsiKejadian(e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kode_penyintas">Kode Penyintas</Label>
                  <Input id="kode_penyintas" value={kodePenyintas} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelompok_usia">Kelompok Usia</Label>
                  <Select
                    id="kelompok_usia"
                    placeholder="Pilih kelompok usia"
                    options={[
                      { value: "anak", label: "Anak (0-12)" },
                      { value: "remaja", label: "Remaja (13-17)" },
                      { value: "dewasa", label: "Dewasa (18-59)" },
                      { value: "lansia", label: "Lansia (60+)" },
                    ]}
                    value={kelompokUsia}
                    onChange={(e) => setKelompokUsia(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                  <Select
                    id="jenis_kelamin"
                    placeholder="Pilih jenis kelamin"
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
                    placeholder="Pilih"
                    options={[
                      { value: "tidak", label: "Tidak" },
                      { value: "fisik", label: "Disabilitas Fisik" },
                      { value: "mental", label: "Disabilitas Mental" },
                      { value: "ganda", label: "Disabilitas Ganda" },
                    ]}
                    value={disabilitas}
                    onChange={(e) => setDisabilitas(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status_perkawinan">Status Perkawinan</Label>
                  <Select
                    id="status_perkawinan"
                    placeholder="Pilih status"
                    options={[
                      { value: "belum", label: "Belum Kawin" },
                      { value: "kawin", label: "Kawin" },
                      { value: "cerai_hidup", label: "Cerai Hidup" },
                      { value: "cerai_mati", label: "Cerai Mati" },
                    ]}
                    value={statusPerkawinan}
                    onChange={(e) => setStatusPerkawinan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pekerjaan">Pekerjaan</Label>
                  <Select
                    id="pekerjaan"
                    placeholder="Pilih pekerjaan"
                    options={[
                      { value: "tidak_bekerja", label: "Tidak Bekerja" },
                      { value: "irt", label: "Ibu Rumah Tangga" },
                      { value: "swasta", label: "Karyawan Swasta" },
                      { value: "pns", label: "PNS/TNI/Polri" },
                      { value: "pelajar", label: "Pelajar/Mahasiswa" },
                      { value: "wirausaha", label: "Wirausaha" },
                    ]}
                    value={pekerjaan}
                    onChange={(e) => setPekerjaan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pendidikan">Pendidikan</Label>
                  <Select
                    id="pendidikan"
                    placeholder="Pilih pendidikan"
                    options={[
                      { value: "sd", label: "SD/Sederajat" },
                      { value: "smp", label: "SMP/Sederajat" },
                      { value: "sma", label: "SMA/Sederajat" },
                      { value: "d3", label: "D3" },
                      { value: "s1", label: "S1" },
                      { value: "s2", label: "S2/S3" },
                    ]}
                    value={pendidikan}
                    onChange={(e) => setPendidikan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelompok_rentan">Kelompok Rentan</Label>
                  <Select
                    id="kelompok_rentan"
                    placeholder="Pilih kelompok"
                    options={[
                      { value: "tidak", label: "Tidak Ada" },
                      { value: "anak", label: "Anak" },
                      { value: "lansia", label: "Lansia" },
                      { value: "disabilitas", label: "Penyandang Disabilitas" },
                      { value: "hamil", label: "Ibu Hamil" },
                    ]}
                    value={kelompokRentan}
                    onChange={(e) => setKelompokRentan(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="penyintas_utama"
                  checked={penyintasUtama}
                  onChange={(e) => setPenyintasUtama(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <Label htmlFor="penyintas_utama">Penyintas Utama</Label>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tingkat_risiko">Tingkat Risiko</Label>
                  <Select
                    id="tingkat_risiko"
                    placeholder="Pilih tingkat risiko"
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
                  <Label htmlFor="layanan_dibutuhkan">Layanan yang Dibutuhkan</Label>
                  <Select
                    id="layanan_dibutuhkan"
                    placeholder="Pilih layanan"
                    options={[
                      { value: "konseling", label: "Konseling Psikologis" },
                      { value: "medis", label: "Pelayanan Medis" },
                      { value: "hukum", label: "Pendampingan Hukum" },
                      { value: "rumah_aman", label: "Rumah Aman" },
                      { value: "rehabilitasi", label: "Rehabilitasi Sosial" },
                      { value: "multi", label: "Multi Layanan" },
                    ]}
                    value={layananDibutuhkan}
                    onChange={(e) => setLayananDibutuhkan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status_layanan">Status Layanan</Label>
                  <Select
                    id="status_layanan"
                    placeholder="Pilih status"
                    options={[
                      { value: "baru", label: "Baru" },
                      { value: "proses", label: "Dalam Proses" },
                      { value: "selesai", label: "Selesai" },
                      { value: "dirujuk", label: "Dirujuk" },
                    ]}
                    value={statusLayanan}
                    onChange={(e) => setStatusLayanan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="penyedia_layanan">Penyedia Layanan</Label>
                  <Select
                    id="penyedia_layanan"
                    placeholder="Pilih penyedia"
                    options={[
                      { value: "upt", label: "UPT P2TP2A" },
                      { value: "puskesmas", label: "Puskesmas" },
                      { value: "rs", label: "Rumah Sakit" },
                      { value: "polres", label: "Polres" },
                      { value: "lpsm", label: "LPSM" },
                    ]}
                    value={penyediaLayanan}
                    onChange={(e) => setPenyediaLayanan(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kebutuhan_rujukan">Kebutuhan Rujukan</Label>
                  <Select
                    id="kebutuhan_rujukan"
                    placeholder="Pilih kebutuhan"
                    options={[
                      { value: "tidak", label: "Tidak Perlu Rujukan" },
                      { value: "medis", label: "Rujukan Medis" },
                      { value: "hukum", label: "Rujukan Hukum" },
                      { value: "psikologis", label: "Rujukan Psikologis" },
                      { value: "rumah_aman", label: "Rujukan Rumah Aman" },
                    ]}
                    value={kebutuhanRujukan}
                    onChange={(e) => setKebutuhanRujukan(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="catatan_penanganan">Catatan Penanganan</Label>
                <textarea
                  id="catatan_penanganan"
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  placeholder="Catatan penanganan..."
                  value={catatanPenanganan}
                  onChange={(e) => setCatatanPenanganan(e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-gray-900">Ringkasan Data Kasus</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Organisasi:</span> <span className="font-medium">{organisasi || "-"}</span></div>
                  <div><span className="text-gray-500">Tanggal Lapor:</span> <span className="font-medium">{tanggalLapor || "-"}</span></div>
                  <div><span className="text-gray-500">Lokasi:</span> <span className="font-medium">{lokasiPelaporan || "-"}</span></div>
                  <div><span className="text-gray-500">Kategori:</span> <span className="font-medium">{kategori || "-"}</span></div>
                  <div><span className="text-gray-500">Jenis Kekerasan:</span> <span className="font-medium">{jenisKekerasan || "-"}</span></div>
                  <div><span className="text-gray-500">Tingkat Risiko:</span> <span className="font-medium">{tingkatRisiko || "-"}</span></div>
                  <div><span className="text-gray-500">Kode Penyintas:</span> <span className="font-medium">{kodePenyintas}</span></div>
                  <div><span className="text-gray-500">Layanan Dibutuhkan:</span> <span className="font-medium">{layananDibutuhkan || "-"}</span></div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Harap periksa kembali data yang telah diisi sebelum mengirimkan kasus untuk verifikasi.
                Data yang sudah dikirim tidak dapat diubah tanpa melalui proses revisi.
              </p>

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
