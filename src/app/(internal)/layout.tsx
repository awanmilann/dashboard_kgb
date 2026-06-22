import { AppSidebar } from "@/components/layout/sidebar"
import { TopNavbar } from "@/components/layout/topbar"

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopNavbar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
