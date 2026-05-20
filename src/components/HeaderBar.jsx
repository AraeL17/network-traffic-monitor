import { ArrowLeft, Shield, Wifi } from 'lucide-react'
import UnitSwitcher from './UnitSwitcher'
import StatusBadge from './StatusBadge'

export default function HeaderBar({ selectedInterface, status, unit, onUnitChange, onBack }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-neon/15 bg-white/82 px-5 py-3 shadow-panel backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded border border-cyan-neon/30 bg-cyan-neon/10 p-2 text-cyan-neon shadow-neon-cyan"><Shield className="h-6 w-6" /></div>
          <div>
            <div className="font-display text-xl font-black tracking-wide text-slate-950 neon-text-cyan">Network Admin Dashboard</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500"><Wifi className="h-3.5 w-3.5 text-cyan-neon" /> {selectedInterface.name} · {selectedInterface.ip} <StatusBadge value={status} /></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UnitSwitcher unit={unit} onChange={onUnitChange} />
          <button onClick={onBack} className="console-button flex items-center gap-2 px-4 py-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" />返回网卡选择</button>
        </div>
      </div>
    </header>
  )
}
