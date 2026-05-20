/**
 * 计算协议占比。metric=count 表示按包数量，metric=bytes 表示按流量大小。
 */
export function calculateProtocolStats(packets, metric = 'count') {
  const protocols = ['TCP', 'UDP', 'ICMP', 'OTHER']
  return protocols.map((protocol) => {
    const related = packets.filter((packet) => packet.protocol === protocol)
    return {
      name: protocol,
      value: metric === 'bytes' ? related.reduce((sum, packet) => sum + packet.size, 0) : related.length,
      count: related.length,
      bytes: related.reduce((sum, packet) => sum + packet.size, 0),
    }
  })
}

/**
 * 计算国家排行，上传看目标国家，下载看来源国家。
 */
export function calculateCountryStats(packets, metric = 'count') {
  const countryMap = new Map()
  packets.forEach((packet) => {
    const country = packet.direction === 'download' ? packet.srcCountry : packet.dstCountry
    const current = countryMap.get(country) || { name: country, packets: 0, bytes: 0, riskScore: 0 }
    current.packets += 1
    current.bytes += packet.size
    current.riskScore += packet.risk === 'high' ? 3 : packet.risk === 'suspicious' ? 1 : 0
    countryMap.set(country, current)
  })

  const totalBytes = packets.reduce((sum, packet) => sum + packet.size, 0) || 1
  const totalPackets = packets.length || 1

  return Array.from(countryMap.values())
    .map((item) => ({
      ...item,
      value: metric === 'bytes' ? item.bytes : item.packets,
      percent: metric === 'bytes' ? (item.bytes / totalBytes) * 100 : (item.packets / totalPackets) * 100,
      status: item.riskScore >= 6 ? '高风险' : item.riskScore >= 2 ? '需关注' : '正常',
    }))
    .sort((a, b) => b.value - a.value)
}

export function calculateOverviewStats(packets, selectedInterface, runtimeSeconds, status) {
  const totalTraffic = packets.reduce((sum, packet) => sum + packet.size, 0)
  const uploadTraffic = packets.filter((p) => p.direction === 'upload').reduce((sum, packet) => sum + packet.size, 0)
  const downloadTraffic = totalTraffic - uploadTraffic
  const byProtocol = (protocol) => packets.filter((packet) => packet.protocol === protocol).length
  const topCountry = calculateCountryStats(packets, 'bytes')[0]?.name || 'N/A'

  return {
    totalTraffic,
    uploadTraffic,
    downloadTraffic,
    totalPackets: packets.length,
    tcpPackets: byProtocol('TCP'),
    udpPackets: byProtocol('UDP'),
    icmpPackets: byProtocol('ICMP'),
    activeConnections: new Set(packets.map((packet) => `${packet.srcIp}:${packet.srcPort}-${packet.dstIp}:${packet.dstPort}`)).size,
    topCountry,
    interfaceName: selectedInterface?.name || 'N/A',
    status,
    runtimeSeconds,
  }
}
