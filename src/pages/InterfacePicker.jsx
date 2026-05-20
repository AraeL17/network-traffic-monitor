import { useEffect, useState } from 'react'
import NetworkInterfaceSelector from '../components/NetworkInterfaceSelector'
import { api } from '../services/api'

export default function InterfacePicker({ onSelect }) {
  const [interfaces, setInterfaces] = useState([])

  useEffect(() => {
    api.getInterfaces().then(setInterfaces)
  }, [])

  return <NetworkInterfaceSelector interfaces={interfaces} onStart={onSelect} />
}
