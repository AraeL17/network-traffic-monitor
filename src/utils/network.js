const countryNameMap = {
  'United States': 'United States / 美国',
  China: 'China / 中国',
  Japan: 'Japan / 日本',
  Germany: 'Germany / 德国',
  Singapore: 'Singapore / 新加坡',
  'Local Network': 'Local Network / 局域网',
}

/**
 * 判断 IPv4 是否属于局域网地址段。
 * 真实后端可复用该规则做本地兜底判断。
 */
export function isPrivateIp(ip = '') {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false
  const [a, b] = parts
  return a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a === 127
}

export function getCountryDisplayName(country = 'Unknown') {
  return countryNameMap[country] || country
}

export function getCountryFlag(country = '') {
  const flags = {
    'United States': '🇺🇸',
    China: '🇨🇳',
    Japan: '🇯🇵',
    Germany: '🇩🇪',
    Singapore: '🇸🇬',
    'Local Network': '🏠',
  }
  return flags[country] || '🌐'
}

export function getPortDescription(port) {
  const map = {
    22: 'SSH 远程登录',
    53: 'DNS 域名解析',
    80: 'HTTP Web 流量',
    123: 'NTP 时间同步',
    443: 'HTTPS 加密 Web 流量',
    3306: 'MySQL 数据库',
    5432: 'PostgreSQL 数据库',
    6379: 'Redis 服务',
  }
  return map[port] || '临时端口 / 自定义服务'
}
