import { Shield, Wifi } from 'lucide-react'
import UnitSwitcher from './UnitSwitcher'
import StatusBadge from './StatusBadge'

export default function HeaderBar({ selectedInterface, status, unit, onUnitChange, onBack }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/58 px-5 py-4 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-blue-200/80 bg-blue-50/70 p-2 text-cyan-neon shadow-sm"><Shield className="h-6 w-6" /></div>
          <div>
            <div className="font-display text-xl font-black text-slate-950">Network Admin Dashboard</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><Wifi className="h-3.5 w-3.5" /> {selectedInterface.name} · {selectedInterface.ip} <StatusBadge value={status} /></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UnitSwitcher unit={unit} onChange={onUnitChange} />
          <button onClick={onBack} className="rounded-lg border border-slate-200/90 bg-white/45 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:border-blue-300 hover:text-cyan-neon">返回网卡选择</button>
        </div>
      </div>
    </header>
  )
}
