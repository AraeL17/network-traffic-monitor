import { getCountryFlag } from '../utils/network'
import { formatBytes, formatNumber } from '../utils/formatters'

export default function CountryTrafficPanel({ countries, unit, selectedCountry, onSelectCountry }) {
  return (
    <section className="glass-panel p-4 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-950">国家来源分析</h2>
        {selectedCountry !== 'ALL' && <button onClick={() => onSelectCountry('ALL')} className="text-xs text-cyan-neon">清除国家筛选</button>}
      </div>
      <div className="space-y-3">
        {countries.map((country) => (
          <button key={country.name} onClick={() => onSelectCountry(country.name)} className={`w-full rounded-lg border p-3 text-left shadow-sm transition ${selectedCountry === country.name ? 'border-blue-300 bg-blue-50/80' : 'border-slate-200/80 bg-white/45 hover:border-blue-200 hover:bg-white/70'}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-slate-900">{getCountryFlag(country.name)} {country.name}</span>
              <span className={country.status === '高风险' ? 'text-danger-neon' : country.status === '需关注' ? 'text-amber-neon' : 'text-matrix-bright'}>{country.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-400">
              <span>包 {formatNumber(country.packets)}</span>
              <span>流量 {formatBytes(country.bytes, unit)}</span>
              <span>占比 {country.percent.toFixed(1)}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-200/70"><div className="h-full rounded-full bg-cyan-neon" style={{ width: `${Math.min(country.percent, 100)}%` }} /></div>
          </button>
        ))}
      </div>
    </section>
  )
}
