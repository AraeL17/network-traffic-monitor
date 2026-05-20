export const UNIT_OPTIONS = ['bits', 'bytes', 'KB', 'MB']

/**
 * 将字节数转换为用户选择的展示单位。
 * 后端真实接入时建议仍统一传 bytes，前端只负责展示转换。
 */
export function convertUnit(bytes = 0, unit = 'KB') {
  if (unit === 'bits') return bytes * 8
  if (unit === 'bytes') return bytes
  if (unit === 'MB') return bytes / 1024 / 1024
  return bytes / 1024
}

/**
 * 格式化流量大小，保证概览卡片、表格、图表使用统一单位。
 */
export function formatBytes(bytes = 0, unit = 'KB', digits = 2) {
  const value = convertUnit(bytes, unit)
  const suffix = unit === 'bits' ? 'bits' : unit
  return `${Number(value).toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: value >= 100 ? 0 : 1,
  })} ${suffix}`
}

export function formatRate(bytes = 0, unit = 'KB') {
  return `${formatBytes(bytes, unit)}/s`
}

export function formatNumber(value = 0) {
  return Number(value).toLocaleString('en-US')
}

export function formatRuntime(seconds = 0) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
