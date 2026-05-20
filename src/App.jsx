import { useState, useCallback } from 'react'
import InterfacePicker from './pages/InterfacePicker'
import Dashboard from './pages/Dashboard'

/**
 * 应用根组件
 * 路由逻辑：未选网卡 → 选择页，已选网卡 → Dashboard
 */
export default function App() {
  const [selectedInterface, setSelectedInterface] = useState(null)

  // 选择网卡后进入 Dashboard
  const handleInterfaceSelect = useCallback((iface) => {
    setSelectedInterface(iface)
  }, [])

  // 返回网卡选择页
  const handleBack = useCallback(() => {
    setSelectedInterface(null)
  }, [])

  return (
    <div className="min-h-screen bg-void-950 text-slate-900">
      {selectedInterface ? (
        <Dashboard
          selectedInterface={selectedInterface}
          onBack={handleBack}
        />
      ) : (
        <InterfacePicker onSelect={handleInterfaceSelect} />
      )}
    </div>
  )
}
