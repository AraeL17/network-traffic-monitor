import { SearchX } from 'lucide-react'

export default function EmptyState({ title = '没有符合条件的数据', description = '请调整筛选条件后重新查看。' }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-blue-200/80 bg-white/45 text-slate-500 backdrop-blur-xl">
      <SearchX className="h-8 w-8 text-cyan-neon/70" />
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  )
}
