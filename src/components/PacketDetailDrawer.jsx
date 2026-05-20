import { X } from 'lucide-react'
import { formatBytes } from '../utils/formatters'
import { getCountryDisplayName, getCountryFlag, getPortDescription, isPrivateIp } from '../utils/network'
import StatusBadge from './StatusBadge'

export default function PacketDetailDrawer({ packet, unit, onClose }) {
  if (!packet) return null

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm" onClick={onClose}>
      <aside className="ml-auto h-full w-full max-w-xl overflow-auto border-l border-cyan-neon/20 bg-white/92 p-6 shadow-neon-cyan backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-neon">Packet Detail</div>
            <h2 className="mt-1 font-display text-2xl text-slate-950">#{packet.id} {packet.protocol}</h2>
          </div>
          <button onClick={onClose} className="rounded border border-slate-200/80 bg-white/60 p-2 text-slate-500 shadow-sm hover:text-cyan-neon"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4">
          <Panel title="连接摘要">
            <p className="text-sm text-slate-700">{packet.summary}</p>
            <p className="mt-2 font-mono text-sm text-cyan-neon">{packet.srcIp}:{packet.srcPort} → {packet.dstIp}:{packet.dstPort}</p>
          </Panel>
          <Panel title="国家信息">
            <Info label="源国家" value={`${getCountryFlag(packet.srcCountry)} ${getCountryDisplayName(packet.srcCountry)}`} />
            <Info label="目标国家" value={`${getCountryFlag(packet.dstCountry)} ${getCountryDisplayName(packet.dstCountry)}`} />
            <Info label="源 IP 类型" value={isPrivateIp(packet.srcIp) ? '局域网地址' : '公网地址'} />
            <Info label="目标 IP 类型" value={isPrivateIp(packet.dstIp) ? '局域网地址' : '公网地址'} />
          </Panel>
          <Panel title="协议与端口说明">
            <Info label="应用层类型" value={packet.appType} />
            <Info label="源端口" value={`${packet.srcPort} · ${getPortDescription(packet.srcPort)}`} />
            <Info label="目标端口" value={`${packet.dstPort} · ${getPortDescription(packet.dstPort)}`} />
            <Info label="包大小" value={formatBytes(packet.size, unit)} />
          </Panel>
          <Panel title="风险说明">
            <div className="mb-2"><StatusBadge value={packet.risk} /></div>
            <p className="text-sm text-slate-500">{packet.risk === 'high' ? '该数据包命中高风险模拟规则，可能涉及异常端口或跨境大流量。' : packet.risk === 'suspicious' ? '该数据包存在可疑特征，建议结合真实后端规则进一步确认。' : '当前模拟规则未发现明显风险。'}</p>
          </Panel>
        </div>
      </aside>
    </div>
  )
}

function Panel({ title, children }) {
  return <section className="rounded border border-slate-200/80 bg-white/60 p-4 shadow-sm"><h3 className="mb-3 text-sm font-bold text-slate-900">{title}</h3>{children}</section>
}

function Info({ label, value }) {
  return <div className="mb-2 flex justify-between gap-4 text-sm"><span className="text-slate-500">{label}</span><span className="text-right text-slate-900">{value}</span></div>
}
