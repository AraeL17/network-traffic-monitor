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
      {cards.map(([label, value, Icon, color]) => (
        <div key={label} className="glass-panel p-4 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">{label}</span>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
          <div className="min-h-8 font-display text-xl font-black text-slate-950">{value}</div>
        </div>
      ))}
    </section>
  )
}
