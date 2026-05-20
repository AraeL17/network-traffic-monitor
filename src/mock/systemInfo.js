/**
 * 模拟系统配置信息
 * 后端接入：GET /api/system/info
 */

export const mockSystemInfo = {
  os: {
    name: 'Ubuntu 22.04.4 LTS',
    kernel: 'Linux 6.5.0-28-generic',
    arch: 'x86_64',
    uptime: '14 days 6 hours 32 minutes',
  },
  cpu: {
    model: 'Intel Core i7-13700K',
    cores: 16,
    threads: 24,
    usage: 34,
    frequency: '3.40 GHz',
  },
  memory: {
    total: '32 GB',
    used: '18.5 GB',
    free: '13.5 GB',
    usage: 58,
  },
  disk: {
    total: '1 TB NVMe SSD',
    used: '420 GB',
    free: '580 GB',
    usage: 42,
  },
  network: {
    hostname: 'sec-monitor-node-01',
    interfaces: 5,
    activeInterfaces: 3,
    totalBandwidth: '3600 Mbps',
  },
}
