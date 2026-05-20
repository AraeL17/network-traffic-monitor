import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatRate, convertUnit } from '../utils/formatters'

const rangeMap = { '30s': 30, '1m': 60, '5m': 300, '15m': 900 }

export default function TrafficWaveChart({ data, range, onRangeChange, unit }) {
  const visible = data.slice(-(rangeMap[range] || 60)).map((item) => ({
    ...item,
    uploadView: convertUnit(item.upload, unit),
    downloadView: convertUnit(item.download, unit),
  }))

  return (
    <section className="glass-panel p-4 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-950">实时流量波形</h2>
        <div className="flex rounded-lg border border-slate-200/80 bg-white/50 p-1 shadow-sm">
          {Object.keys(rangeMap).map((item) => (
            <button key={item} onClick={() => onRangeChange(item)} className={`h-7 rounded px-3 text-xs font-bold ${range === item ? 'bg-cyan-neon text-white shadow-sm' : 'text-slate-500'}`}>{item}</button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visible}>
            <defs>
              <linearGradient id="downloadFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.24} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              <linearGradient id="uploadFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.22} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" minTickGap={32} />
            <YAxis tickFormatter={(v) => `${Math.round(v)} ${unit}`} width={78} />
            <Tooltip formatter={(value, name, item) => [formatRate(item.payload[name === '上传' ? 'upload' : 'download'], unit), name]} />
            <Area type="monotone" dataKey="downloadView" name="下载" stroke="#10b981" fill="url(#downloadFill)" strokeWidth={2} animationDuration={600} />
            <Area type="monotone" dataKey="uploadView" name="上传" stroke="#f59e0b" fill="url(#uploadFill)" strokeWidth={2} animationDuration={600} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
