import { formatBytes } from '../utils/formatters'
import { getCountryFlag } from '../utils/network'
import EmptyState from './EmptyState'
import StatusBadge from './StatusBadge'

const protocolStyle = {
  TCP: 'border-blue-200 bg-blue-50/80 text-blue-700',
  UDP: 'border-emerald-200 bg-emerald-50/80 text-emerald-700',
  ICMP: 'border-amber-200 bg-amber-50/80 text-amber-700',
  OTHER: 'border-slate-200 bg-slate-100/80 text-slate-600',
}

export default function PacketTable({ packets, unit, onSelectPacket }) {
  if (!packets.length) return <EmptyState />

  return (
    <section className="glass-panel overflow-hidden shadow-panel">
      <div className="border-b border-white/70 p-4">
        <h2 className="text-sm font-bold text-slate-950">实时数据包列表</h2>
      </div>
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[1180px] text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white/80 text-xs text-slate-500 backdrop-blur-xl">
            <tr>
              {['时间', '源 IP', '源国家', '目标 IP', '目标国家', '协议', '源端口', '目标端口', '包大小', '方向', '应用层', '风险'].map((head) => (
                <th key={head} className="border-b border-slate-200/70 px-3 py-3 font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packets.map((packet) => (
              <tr key={packet.id} onClick={() => onSelectPacket(packet)} className="table-row-glow cursor-pointer border-b border-slate-200/60 text-slate-700 odd:bg-white/30 hover:bg-blue-50/70">
                <td className="px-3 py-3 font-mono text-xs text-slate-400">{packet.time}</td>
                <td className="px-3 py-3 font-mono">{packet.srcIp}</td>
                <td className="px-3 py-3">{getCountryFlag(packet.srcCountry)} {packet.srcCountry}</td>
                <td className="px-3 py-3 font-mono">{packet.dstIp}</td>
                <td className="px-3 py-3">{getCountryFlag(packet.dstCountry)} {packet.dstCountry}</td>
                <td className="px-3 py-3"><span className={`rounded border px-2 py-0.5 text-xs font-semibold ${protocolStyle[packet.protocol]}`}>{packet.protocol}</span></td>
                <td className="px-3 py-3">{packet.srcPort}</td>
                <td className="px-3 py-3">{packet.dstPort}</td>
                <td className="px-3 py-3 font-display text-cyan-neon">{formatBytes(packet.size, unit)}</td>
                <td className="px-3 py-3">{packet.direction === 'upload' ? '上传' : '下载'}</td>
                <td className="px-3 py-3">{packet.appType}</td>
                <td className="px-3 py-3"><StatusBadge value={packet.risk} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
