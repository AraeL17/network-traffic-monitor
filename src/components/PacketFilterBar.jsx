import { Filter, RotateCcw } from 'lucide-react'
import { defaultFilters } from '../utils/filters'

export default function PacketFilterBar({ draftFilters, setDraftFilters, onApply, onReset, countries }) {
  const update = (key, value) => setDraftFilters((prev) => ({ ...prev, [key]: value }))

  return (
    <section className="glass-panel p-4 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-950"><Filter className="h-4 w-4 text-cyan-neon" />数据包筛选</h2>
        <button onClick={() => { setDraftFilters(defaultFilters); onReset() }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-neon"><RotateCcw className="h-3.5 w-3.5" />重置筛选</button>
      </div>
      <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">
        <Select label="协议" value={draftFilters.protocol} onChange={(v) => update('protocol', v)} options={['ALL', 'TCP', 'UDP', 'ICMP', 'OTHER']} />
        <Select label="国家" value={draftFilters.country} onChange={(v) => update('country', v)} options={['ALL', ...countries]} />
        <Input label="源/目标 IP" value={draftFilters.ipKeyword} onChange={(v) => update('ipKeyword', v)} placeholder="8.8.8.8" />
        <Input label="端口" value={draftFilters.port} onChange={(v) => update('port', v)} placeholder="443" />
        <Input label="最小包大小" value={draftFilters.minSize} onChange={(v) => update('minSize', v)} placeholder="bytes" type="number" />
        <Input label="最大包大小" value={draftFilters.maxSize} onChange={(v) => update('maxSize', v)} placeholder="bytes" type="number" />
        <Select label="方向" value={draftFilters.direction} onChange={(v) => update('direction', v)} options={['ALL', 'upload', 'download']} />
        <Select label="风险" value={draftFilters.risk} onChange={(v) => update('risk', v)} options={['ALL', 'normal', 'suspicious', 'high']} />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <Select label="时间范围" value={draftFilters.timeRange} onChange={(v) => update('timeRange', v)} options={['30s', '1m', '5m', '15m']} compact />
        <button onClick={onApply} className="rounded-lg bg-cyan-neon px-5 py-2 text-sm font-black text-white shadow-neon-cyan">应用筛选</button>
      </div>
    </section>
  )
}

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-10 w-full rounded-lg border border-slate-200/80 bg-white/55 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-neon focus:bg-white/80" />
    </label>
  )
}

function Select({ label, value, onChange, options, compact = false }) {
  return (
    <label className={`block ${compact ? 'w-48' : ''}`}>
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200/80 bg-white/55 px-3 text-sm text-slate-900 outline-none focus:border-cyan-neon focus:bg-white/80">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}
