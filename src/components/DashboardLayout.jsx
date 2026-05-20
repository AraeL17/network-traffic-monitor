export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,rgba(37,99,235,0.045)_1px,transparent_1px),linear-gradient(0deg,rgba(15,23,42,0.035)_1px,transparent_1px),radial-gradient(circle_at_10%_4%,rgba(37,99,235,0.15),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(245,158,11,0.12),transparent_24%),radial-gradient(circle_at_70%_86%,rgba(5,150,105,0.10),transparent_28%),linear-gradient(135deg,#f8fbff_0%,#eef6ff_54%,#f7fbff_100%)] bg-[length:44px_44px,44px_44px,auto,auto,auto,auto] text-slate-900">
      {children}
    </div>
  )
}
