import { useState } from 'react'
import { Activity, Cable, Lock, Radar, Wifi } from 'lucide-react'
import StatusBadge from './StatusBadge'

const iconMap = { 'Wi-Fi': Wifi, Ethernet: Cable, Loopback: Radar, 'VPN Tunnel': Lock }

export default function NetworkInterfaceSelector({ interfaces, onStart }) {
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  const handleStart = () => {
    if (!selected) {
      setMessage('请先选择一个网卡')
      return
    }
    if (selected.status !== 'available') {
      setMessage(`${selected.name} 当前不可用，无法开始监听`)
      return
    }
    onStart(selected)
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(16,185,129,0.13),transparent_26%),linear-gradient(135deg,#f8fbff_0%,#eef6ff_52%,#f7fbff_100%)] px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-neon">Network Traffic Monitor</div>
            <h1 className="font-display text-4xl font-black text-slate-950 neon-text-cyan">网络流量监控与可视化系统</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">选择一个可用网卡进入 Dashboard，当前演示使用模拟数据并预留后端抓包接口。</p>
          </div>
          <div className="hidden rounded-lg border border-white/70 bg-white/55 px-4 py-3 text-right shadow-panel backdrop-blur-xl md:block">
            <div className="text-xs text-slate-500">Capture Engine</div>
            <div className="font-display text-lg text-matrix-bright">READY</div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-5">
          {interfaces.map((iface) => {
            const Icon = iconMap[iface.type] || Activity
            const active = selected?.id === iface.id
            return (
              <button
                key={iface.id}
                onClick={() => {
                  setSelected(iface)
                  setMessage('')
                }}
                className={`glass-panel min-h-56 p-5 text-left shadow-panel transition ${active ? 'border-blue-300 bg-blue-50/70 shadow-neon-cyan' : ''}`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-lg border border-blue-200/80 bg-white/55 p-3 text-cyan-neon shadow-sm"><Icon className="h-6 w-6" /></span>
                  <StatusBadge value={iface.status} />
                </div>
                <div className="font-display text-2xl text-slate-950">{iface.name}</div>
                <div className="mt-1 text-sm text-slate-400">{iface.type}</div>
                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">IP</span><span>{iface.ip}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">速率</span><span className="text-cyan-neon">{iface.speed}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">活动</span><span>{iface.activity}</span></div>
                </div>
              </button>
            )
          })}
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/70 bg-white/58 p-4 shadow-panel backdrop-blur-xl">
          <div className="text-sm text-slate-500">{message || (selected ? `已选择 ${selected.name}，点击开始监听进入 Dashboard` : '请选择一个可用网卡')}</div>
          <button onClick={handleStart} className="rounded-lg bg-cyan-neon px-6 py-3 text-sm font-black text-white shadow-neon-cyan transition hover:scale-[1.02]">
            开始监听
          </button>
        </div>
      </div>
    </main>
  )
}
