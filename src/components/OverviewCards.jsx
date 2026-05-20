import { Activity, Clock, Globe2, Network, Radio, ShieldAlert, Upload, Download, Wifi, Zap } from 'lucide-react'
import { formatBytes, formatNumber, formatRuntime } from '../utils/formatters'
import StatusBadge from './StatusBadge'

export default function OverviewCards({ stats, unit }) {
  const cards = [
    ['当前总流量', formatBytes(stats.totalTraffic, unit), Activity, 'text-cyan-neon'],
    ['上传流量', formatBytes(stats.uploadTraffic, unit), Upload, 'text-amber-neon'],
    ['下载流量', formatBytes(stats.downloadTraffic, unit), Download, 'text-matrix-bright'],
    ['数据包总数', formatNumber(stats.totalPackets), Network, 'text-cyan-neon'],
    ['TCP 包数量', formatNumber(stats.tcpPackets), Radio, 'text-sky-500'],
    ['UDP 包数量', formatNumber(stats.udpPackets), Zap, 'text-violet-500'],
    ['ICMP 包数量', formatNumber(stats.icmpPackets), ShieldAlert, 'text-amber-neon'],
    ['活跃连接数', formatNumber(stats.activeConnections), Activity, 'text-matrix-bright'],
    ['最大来源国家', stats.topCountry, Globe2, 'text-cyan-neon'],
    ['当前监听网卡', stats.interfaceName, Wifi, 'text-slate-500'],
    ['监听状态', <StatusBadge value={stats.status} />, Activity, 'text-matrix-bright'],
    ['运行时长', formatRuntime(stats.runtimeSeconds), Clock, 'text-cyan-neon'],
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
      {cards.map(([label, value, Icon, color], index) => (
        <div key={label} className="glass-panel group min-h-[118px] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-neon-cyan">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
            <span className="rounded border border-slate-200/80 bg-white/60 p-1.5">
              <Icon className={`h-4 w-4 ${color}`} />
            </span>
          </div>
          <div className="min-h-8 break-words font-display text-xl font-black tracking-wide text-slate-950">{value}</div>
          <div className="mt-3 flex items-center gap-1">
            <span className="h-1 w-8 rounded-full bg-cyan-neon/70" />
            <span className={`h-1 rounded-full ${index % 3 === 0 ? 'w-14 bg-matrix-bright/70' : index % 3 === 1 ? 'w-10 bg-amber-neon/70' : 'w-12 bg-violet-400/70'}`} />
          </div>
        </div>
      ))}
    </section>
  )
}
