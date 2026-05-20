/**
 * 模拟流量数据生成器
 * 生成逼真的网络流量波形数据点
 * 后端接入：GET /api/traffic/history?interface=eth0
 */

/**
 * 生成一个流量数据点
 * @returns {{ time: string, upload: number, download: number }}
 *   upload/download 单位为 bytes/s
 */
export function generateTrafficPoint() {
  const now = new Date()
  const time = now.toLocaleTimeString('zh-CN', { hour12: false })

  // 基础流量 + 随机波动，模拟真实网络流量
  const baseDownload = 2_500_000  // ~2.5 MB/s 基础下载
  const baseUpload = 800_000      // ~800 KB/s 基础上传

  // 随机因子：0.3 ~ 2.5 倍
  const noise = () => 0.3 + Math.random() * 2.2
  // 偶尔出现大流量尖峰
  const spike = Math.random() < 0.1 ? (2 + Math.random() * 5) : 1

  return {
    time,
    upload: Math.round(baseUpload * noise() * spike),
    download: Math.round(baseDownload * noise() * spike),
  }
}

/**
 * 生成初始流量历史数据（60个点，用于图表初始化）
 * @returns {Array<{ time: string, upload: number, download: number }>}
 */
export function generateTrafficHistory(count = 60) {
  const points = []
  const now = Date.now()

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now - i * 1000)
    const time = t.toLocaleTimeString('zh-CN', { hour12: false })
    const baseDownload = 2_500_000
    const baseUpload = 800_000
    const noise = () => 0.4 + Math.random() * 1.6
    const spike = Math.random() < 0.08 ? (2 + Math.random() * 4) : 1

    points.push({
      time,
      upload: Math.round(baseUpload * noise() * spike),
      download: Math.round(baseDownload * noise() * spike),
    })
  }

  return points
}
