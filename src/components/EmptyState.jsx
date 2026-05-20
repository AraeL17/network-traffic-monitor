import { SearchX } from 'lucide-react'

export default function EmptyState({ title = '没有符合条件的数据', description = '请调整筛选条件后重新查看。' }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded border border-dashed border-cyan-neon/25 bg-white/60 text-slate-500 backdrop-blur-xl">
      <SearchX className="h-8 w-8 text-cyan-neon/70" />
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  )
}
