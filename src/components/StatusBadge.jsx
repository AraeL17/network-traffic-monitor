const styles = {
  available: 'border-matrix-bright/30 bg-matrix-bright/10 text-matrix-bright',
  unavailable: 'border-slate-500/30 bg-slate-500/10 text-slate-500',
  running: 'border-matrix-bright/30 bg-matrix-bright/10 text-matrix-bright',
  paused: 'border-amber-neon/30 bg-amber-neon/10 text-amber-neon',
  stopped: 'border-danger-neon/30 bg-danger-neon/10 text-danger-neon',
  normal: 'border-matrix-bright/30 bg-matrix-bright/10 text-matrix-bright',
  suspicious: 'border-amber-neon/30 bg-amber-neon/10 text-amber-neon',
  high: 'border-danger-neon/30 bg-danger-neon/10 text-danger-neon',
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
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold shadow-sm ${styles[value] || styles.normal}`}>
      {labels[value] || value}
    </span>
  )
}
