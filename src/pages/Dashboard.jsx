import { useEffect, useMemo, useState } from 'react'
import CaptureControlPanel from '../components/CaptureControlPanel'
import CountryTrafficPanel from '../components/CountryTrafficPanel'
import DashboardLayout from '../components/DashboardLayout'
import HeaderBar from '../components/HeaderBar'
import OverviewCards from '../components/OverviewCards'
import PacketDetailDrawer from '../components/PacketDetailDrawer'
import PacketFilterBar from '../components/PacketFilterBar'
import PacketTable from '../components/PacketTable'
import ProtocolPieChart from '../components/ProtocolPieChart'
import SystemInfoPanel from '../components/SystemInfoPanel'
import TrafficWaveChart from '../components/TrafficWaveChart'
import { defaultFilters, filterPackets } from '../utils/filters'
import { calculateCountryStats, calculateOverviewStats, calculateProtocolStats } from '../utils/stats'
import { api } from '../services/api'

export default function Dashboard({ selectedInterface, onBack }) {
  const [status, setStatus] = useState('running')
  const [runtimeSeconds, setRuntimeSeconds] = useState(0)
  const [unit, setUnit] = useState('KB')
  const [packets, setPackets] = useState([])
  const [trafficData, setTrafficData] = useState([])
  const [systemInfo, setSystemInfo] = useState(null)
  const [draftFilters, setDraftFilters] = useState(defaultFilters)
  const [filters, setFilters] = useState(defaultFilters)
  const [chartMetric, setChartMetric] = useState('count')
  const [selectedPacket, setSelectedPacket] = useState(null)

  useEffect(() => {
    api.startCapture(selectedInterface.id)
    api.getPackets().then(setPackets)
    api.getTrafficStats().then(setTrafficData)
    api.getSystemInfo().then(setSystemInfo)
  }, [selectedInterface.id])

  useEffect(() => {
    if (status !== 'running') return undefined
    const timer = setInterval(() => setRuntimeSeconds((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [status])

  const filteredPackets = useMemo(() => filterPackets(packets, filters), [packets, filters])
  const overview = useMemo(() => calculateOverviewStats(filteredPackets, selectedInterface, runtimeSeconds, status), [filteredPackets, selectedInterface, runtimeSeconds, status])
  const protocolStats = useMemo(() => calculateProtocolStats(filteredPackets, chartMetric), [filteredPackets, chartMetric])
  const countryStats = useMemo(() => calculateCountryStats(filteredPackets, chartMetric), [filteredPackets, chartMetric])
  const countryOptions = useMemo(() => Array.from(new Set(packets.flatMap((packet) => [packet.srcCountry, packet.dstCountry]))), [packets])

  const applyFilters = () => setFilters(draftFilters)
  const resetFilters = () => {
    setDraftFilters(defaultFilters)
    setFilters(defaultFilters)
  }

  const updateCountryFilter = (country) => {
    const next = { ...draftFilters, country }
    setDraftFilters(next)
    setFilters(next)
  }

  const handleStop = async () => {
    await api.stopCapture()
    setStatus('stopped')
    onBack()
  }

  return (
    <DashboardLayout>
      <HeaderBar selectedInterface={selectedInterface} status={status} unit={unit} onUnitChange={setUnit} onBack={onBack} />
      <main className="mx-auto max-w-[1500px] space-y-4 p-5">
        <OverviewCards stats={overview} unit={unit} />
        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <TrafficWaveChart data={trafficData} range={draftFilters.timeRange} onRangeChange={(timeRange) => setDraftFilters((prev) => ({ ...prev, timeRange }))} unit={unit} />
          <CaptureControlPanel
            status={status}
            selectedInterface={selectedInterface}
            runtimeSeconds={runtimeSeconds}
            onStart={() => setStatus('running')}
            onPause={async () => { await api.pauseCapture(); setStatus('paused') }}
            onResume={async () => { await api.resumeCapture(); setStatus('running') }}
            onStop={handleStop}
          />
        </div>
        <PacketFilterBar draftFilters={draftFilters} setDraftFilters={setDraftFilters} onApply={applyFilters} onReset={resetFilters} countries={countryOptions} />
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.95fr]">
          <ProtocolPieChart title="协议占比图" data={protocolStats} metric={chartMetric} onMetricChange={setChartMetric} unit={unit} />
          <ProtocolPieChart title="国家占比图" data={countryStats} metric={chartMetric} onMetricChange={setChartMetric} unit={unit} />
          {systemInfo && <SystemInfoPanel info={systemInfo} />}
        </div>
        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.7fr]">
          <CountryTrafficPanel countries={countryStats} unit={unit} selectedCountry={filters.country} onSelectCountry={updateCountryFilter} />
          <PacketTable packets={filteredPackets} unit={unit} onSelectPacket={setSelectedPacket} />
        </div>
      </main>
      <PacketDetailDrawer packet={selectedPacket} unit={unit} onClose={() => setSelectedPacket(null)} />
    </DashboardLayout>
  )
}
