const styles = {
  available: 'border-emerald-200 bg-emerald-50/80 text-emerald-700',
  unavailable: 'border-slate-200 bg-slate-100/80 text-slate-500',
  running: 'border-emerald-200 bg-emerald-50/80 text-emerald-700',
  paused: 'border-amber-200 bg-amber-50/80 text-amber-700',
  stopped: 'border-red-200 bg-red-50/80 text-red-700',
  normal: 'border-emerald-200 bg-emerald-50/80 text-emerald-700',
  suspicious: 'border-amber-200 bg-amber-50/80 text-amber-700',
  high: 'border-red-200 bg-red-50/80 text-red-700',
}

const labels = {
  available: '可用',
  unavailable: '不可用',
  running: 'running',
  paused: 'paused',
  stopped: 'stopped',
  normal: '正常',
  suspicious: '可疑',
  high: '高风险',
}

export default function StatusBadge({ value }) {
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold ${styles[value] || styles.normal}`}>
      {labels[value] || value}
    </span>
  )
}
