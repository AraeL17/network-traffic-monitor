import { Pause, Play, RotateCcw, Square } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { formatRuntime } from '../utils/formatters'

export default function CaptureControlPanel({ status, selectedInterface, runtimeSeconds, onPause, onResume, onStop, onStart }) {
  return (
    <section className="glass-panel p-4 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-950">监听控制</h2>
        <StatusBadge value={status} />
      </div>
      <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <button onClick={onStart} disabled={status === 'running'} className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white/45 px-3 py-2 text-sm font-semibold text-cyan-neon shadow-sm disabled:opacity-40"><Play className="h-4 w-4" />开始</button>
        <button onClick={onPause} disabled={status !== 'running'} className="flex items-center justify-center gap-2 rounded-lg border border-amber-200 bg-white/45 px-3 py-2 text-sm font-semibold text-amber-neon shadow-sm disabled:opacity-40"><Pause className="h-4 w-4" />暂停</button>
        <button onClick={onResume} disabled={status !== 'paused'} className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white/45 px-3 py-2 text-sm font-semibold text-matrix-bright shadow-sm disabled:opacity-40"><RotateCcw className="h-4 w-4" />继续</button>
        <button onClick={onStop} className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white/45 px-3 py-2 text-sm font-semibold text-danger-neon shadow-sm"><Square className="h-4 w-4" />停止</button>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-400 sm:grid-cols-3">
        <div>网卡 <span className="text-slate-900">{selectedInterface.name}</span></div>
        <div>IP <span className="text-slate-900">{selectedInterface.ip}</span></div>
        <div>运行 <span className="font-display text-cyan-neon">{formatRuntime(runtimeSeconds)}</span></div>
      </div>
    </section>
  )
}
