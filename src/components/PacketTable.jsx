import { formatBytes } from '../utils/formatters'
import { getCountryFlag } from '../utils/network'
import EmptyState from './EmptyState'
import StatusBadge from './StatusBadge'

const protocolStyle = {
  TCP: 'border-cyan-neon/30 bg-cyan-neon/10 text-cyan-neon',
  UDP: 'border-matrix-bright/30 bg-matrix-bright/10 text-matrix-bright',
  ICMP: 'border-amber-neon/30 bg-amber-neon/10 text-amber-neon',
  OTHER: 'border-slate-500/30 bg-slate-500/10 text-slate-700',
}

export default function PacketTable({ packets, unit, onSelectPacket }) {
  if (!packets.length) return <EmptyState />

  return (
    <section className="glass-panel overflow-hidden shadow-panel">
      <div className="border-b border-slate-200/80 p-4">
        <h2 className="console-panel-title">实时数据包列表</h2>
      </div>
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[1180px] text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white/90 text-xs text-slate-500 backdrop-blur-xl">
            <tr>
              {['时间', '源 IP', '源国家', '目标 IP', '目标国家', '协议', '源端口', '目标端口', '包大小', '方向', '应用层', '风险'].map((head) => (
                <th key={head} className="border-b border-slate-200/80 px-3 py-3 font-semibold uppercase tracking-[0.08em]">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packets.map((packet) => (
              <tr key={packet.id} onClick={() => onSelectPacket(packet)} className="table-row-glow cursor-pointer border-b border-slate-200/80 text-slate-700 odd:bg-white/35 hover:bg-cyan-neon/[0.055]">
                <td className="px-3 py-3 font-mono text-xs text-slate-500">{packet.time}</td>
                <td className="px-3 py-3 font-mono text-slate-900">{packet.srcIp}</td>
                <td className="px-3 py-3">{getCountryFlag(packet.srcCountry)} {packet.srcCountry}</td>
                <td className="px-3 py-3 font-mono text-slate-900">{packet.dstIp}</td>
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
