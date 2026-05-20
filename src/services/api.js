import { mockInterfaces, mockPackets, mockSystemInfo, mockTrafficData } from '../data/mockData'

const delay = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180))

/**
 * 后端 API 预留层。
 * 当前返回 mock 数据；接 Flask/FastAPI 时把这些函数替换为 fetch('/api/...') 即可。
 */
export const api = {
  getInterfaces: () => delay(mockInterfaces),
  startCapture: (interfaceId) => delay({ status: 'running', interfaceId }),
  pauseCapture: () => delay({ status: 'paused' }),
  resumeCapture: () => delay({ status: 'running' }),
  stopCapture: () => delay({ status: 'stopped' }),
  getPackets: () => delay(mockPackets),
  getTrafficStats: () => delay(mockTrafficData),
  getSystemInfo: () => delay(mockSystemInfo),
  queryGeoIp: (ip) => delay({ ip, country: ip.startsWith('192.168.') ? 'Local Network' : 'United States' }),
}
