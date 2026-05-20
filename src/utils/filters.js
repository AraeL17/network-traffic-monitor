/**
 * 根据筛选条件过滤数据包。
 * 所有 Dashboard 联动都基于过滤后的 packets 重新计算。
 */
export function filterPackets(packets, filters) {
  return packets.filter((packet) => {
    const keyword = filters.ipKeyword.trim()
    const matchesProtocol = filters.protocol === 'ALL' || packet.protocol === filters.protocol
    const matchesCountry =
      filters.country === 'ALL' || packet.srcCountry === filters.country || packet.dstCountry === filters.country
    const matchesIp = !keyword || packet.srcIp.includes(keyword) || packet.dstIp.includes(keyword)
    const matchesPort =
      !filters.port || String(packet.srcPort).includes(filters.port) || String(packet.dstPort).includes(filters.port)
    const matchesDirection = filters.direction === 'ALL' || packet.direction === filters.direction
    const matchesRisk = filters.risk === 'ALL' || packet.risk === filters.risk
    const size = Number(packet.size)
    const minOk = filters.minSize === '' || size >= Number(filters.minSize)
    const maxOk = filters.maxSize === '' || size <= Number(filters.maxSize)

    return matchesProtocol && matchesCountry && matchesIp && matchesPort && matchesDirection && matchesRisk && minOk && maxOk
  })
}

export const defaultFilters = {
  protocol: 'ALL',
  country: 'ALL',
  ipKeyword: '',
  port: '',
  minSize: '',
  maxSize: '',
  direction: 'ALL',
  risk: 'ALL',
  timeRange: '15m',
}
