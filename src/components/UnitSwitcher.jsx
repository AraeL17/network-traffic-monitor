import { UNIT_OPTIONS } from '../utils/formatters'

export default function UnitSwitcher({ unit, onChange }) {
  return (
    <div className="flex rounded border border-slate-200/80 bg-white/60 p-1 shadow-sm">
      {UNIT_OPTIONS.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`h-8 rounded px-3 text-xs font-bold transition ${unit === item ? 'bg-cyan-neon text-white shadow-neon-cyan' : 'text-slate-500 hover:text-cyan-neon'}`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
