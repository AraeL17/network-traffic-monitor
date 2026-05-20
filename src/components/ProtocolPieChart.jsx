import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatBytes } from '../utils/formatters'

const colors = ['#38bdf8', '#22c55e', '#f59e0b', '#ef4444', '#94a3b8', '#a78bfa']

export default function ProtocolPieChart({ title, data, metric, onMetricChange, unit }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1

  return (
    <section className="glass-panel p-4 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="console-panel-title">{title}</h2>
        <div className="flex rounded border border-slate-200/80 bg-white/60 p-1 shadow-sm">
          <button onClick={() => onMetricChange('count')} className={`h-7 rounded px-3 text-xs font-semibold ${metric === 'count' ? 'bg-cyan-neon text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>包数量</button>
          <button onClick={() => onMetricChange('bytes')} className={`h-7 rounded px-3 text-xs font-semibold ${metric === 'bytes' ? 'bg-cyan-neon text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>流量大小</button>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3} label={(item) => `${item.name} ${((item.value / total) * 100).toFixed(0)}%`}>
              {data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip formatter={(value, name, item) => [metric === 'bytes' ? formatBytes(item.payload.bytes || value, unit) : value, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
