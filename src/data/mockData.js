const countries = [
  { name: 'United States', ips: ['8.8.8.8', '34.117.59.81', '104.18.32.47'] },
  { name: 'China', ips: ['101.35.88.12', '120.53.18.9', '223.5.5.5'] },
  { name: 'Japan', ips: ['13.115.43.21', '43.206.12.66', '210.140.92.183'] },
  { name: 'Germany', ips: ['49.12.45.8', '88.198.33.10', '116.203.22.7'] },
  { name: 'Singapore', ips: ['13.250.91.16', '18.138.75.33', '139.59.220.10'] },
  { name: 'Local Network', ips: ['192.168.1.8', '192.168.1.20', '10.0.0.5', '172.16.2.12'] },
]

const protocols = ['TCP', 'UDP', 'ICMP', 'OTHER']
const risks = ['normal', 'normal', 'normal', 'suspicious', 'high']
const appByPort = { 22: 'SSH', 53: 'DNS', 80: 'HTTP', 123: 'NTP', 443: 'HTTPS', 3306: 'MySQL', 5432: 'PostgreSQL' }
const commonPorts = [22, 53, 80, 123, 443, 3306, 5432, 6379, 8080, 49152, 53211]

export const mockInterfaces = [
  { id: 'en0', name: 'en0', type: 'Wi-Fi', ip: '192.168.1.8', status: 'available', speed: '468 Mbps', activity: '活跃' },
  { id: 'eth0', name: 'eth0', type: 'Ethernet', ip: '192.168.1.18', status: 'available', speed: '1.0 Gbps', activity: '稳定' },
  { id: 'wlan0', name: 'wlan0', type: 'Wi-Fi', ip: '10.0.0.24', status: 'available', speed: '221 Mbps', activity: '中等' },
  { id: 'lo', name: 'lo', type: 'Loopback', ip: '127.0.0.1', status: 'unavailable', speed: '0 Kbps', activity: '本机回环' },
  { id: 'tun0', name: 'tun0', type: 'VPN Tunnel', ip: '10.8.0.10', status: 'available', speed: '86 Mbps', activity: '加密隧道' },
]

export const mockSystemInfo = {
  os: 'Ubuntu 22.04',
  cpu: 'Intel Xeon Silver 4314',
  cpuUsage: 38,
  memoryTotal: '8GB',
  memoryUsed: '3.2GB',
  diskUsage: 46,
  hostname: 'easton-server',
  localIp: '192.168.1.8',
  uptime: '3 days 12 hours',
  backendStatus: 'running',
}

function pick(list, index) {
  return list[index % list.length]
}

/**
 * 生成足量模拟数据包，覆盖协议、国家、端口、方向和风险等级变化。
 */
export function generateMockPackets(count = 72) {
  return Array.from({ length: count }, (_, index) => {
    const direction = index % 3 === 0 ? 'upload' : 'download'
    const remoteCountry = pick(countries.slice(0, 5), index * 2 + 1)
    const localCountry = countries[5]
    const remoteIp = pick(remoteCountry.ips, index)
    const localIp = pick(localCountry.ips, index + 2)
    const protocol = protocols[index % protocols.length]
    const servicePort = pick(commonPorts, index + (protocol === 'UDP' ? 1 : 0))
    const srcPort = direction === 'download' ? servicePort : 49152 + (index * 37) % 12000
    const dstPort = direction === 'download' ? 49152 + (index * 41) % 12000 : servicePort
    const size = Math.round(96 + ((index * 733) % 9500) + (index % 11 === 0 ? 42000 : 0))
    const time = new Date(Date.now() - (count - index) * 4000).toLocaleTimeString('zh-CN', { hour12: false })
    const risk = pick(risks, index + (remoteCountry.name === 'China' ? 1 : 0))

    return {
      id: index + 1,
      time,
      srcIp: direction === 'download' ? remoteIp : localIp,
      srcCountry: direction === 'download' ? remoteCountry.name : 'Local Network',
      dstIp: direction === 'download' ? localIp : remoteIp,
      dstCountry: direction === 'download' ? 'Local Network' : remoteCountry.name,
      protocol,
      srcPort,
      dstPort,
      size,
      direction,
      appType: appByPort[servicePort] || (protocol === 'ICMP' ? 'ICMP Echo' : 'Unknown'),
      risk,
      summary: `${direction === 'download' ? '入站' : '出站'} ${protocol} ${remoteCountry.name} 通信`,
    }
  }).reverse()
}

/**
 * 生成实时流量图表数据，单位统一为 bytes/s。
 */
export function generateMockTrafficData(seconds = 900) {
  const now = Date.now()
  return Array.from({ length: seconds }, (_, index) => {
    const point = seconds - index
    const t = new Date(now - point * 1000)
    const wave = Math.sin(index / 9) + Math.cos(index / 17)
    const spike = index % 53 === 0 ? 4.8 : index % 37 === 0 ? 2.4 : 1
    return {
      time: t.toLocaleTimeString('zh-CN', { hour12: false }),
      upload: Math.max(28000, Math.round((420000 + wave * 120000 + (index % 13) * 22000) * spike)),
      download: Math.max(80000, Math.round((1300000 + wave * 360000 + (index % 19) * 58000) * spike)),
    }
  })
}

export const mockPackets = generateMockPackets()
export const mockTrafficData = generateMockTrafficData()
