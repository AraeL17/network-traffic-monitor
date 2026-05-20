import { Cpu, Database, HardDrive, Server } from 'lucide-react'

export default function SystemInfoPanel({ info }) {
  const rows = [
    ['操作系统', info.os, Server],
    ['CPU 型号', info.cpu, Cpu],
    ['内存', `${info.memoryUsed} / ${info.memoryTotal}`, Database],
    ['主机名', info.hostname, Server],
    ['本机 IP', info.localIp, Server],
    ['运行时间', info.uptime, Server],
    ['后端服务', info.backendStatus, Server],
  ]

  return (
    <section className="glass-panel p-4 shadow-panel">
      <h2 className="console-panel-title mb-4">当前电脑系统配置</h2>
      <div className="space-y-3">
        {rows.map(([label, value, Icon]) => (
          <div key={label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-500"><Icon className="h-4 w-4 text-cyan-neon" />{label}</span>
            <span className="text-right text-slate-900">{value}</span>
          </div>
        ))}
      </div>
      <Metric label="CPU 使用率" value={info.cpuUsage} />
      <Metric label="磁盘使用率" value={info.diskUsage} icon={HardDrive} />
    </section>
  )
}

function Metric({ label, value }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-xs text-slate-500"><span>{label}</span><span>{value}%</span></div>
      <div className="h-2 rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-matrix-bright" style={{ width: `${value}%` }} /></div>
    </div>
  )
}
