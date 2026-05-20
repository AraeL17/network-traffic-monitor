/**
 * 模拟网卡列表数据
 * 后端接入时替换为 API 调用：GET /api/interfaces
 */

export const mockInterfaces = [
  {
    id: 'eth0',
    name: 'eth0',
    displayName: 'Ethernet 0',
    type: 'ethernet',
    description: 'Intel I219-V Gigabit Ethernet',
    status: 'active',
    mac: '00:1A:2B:3C:4D:5E',
    ip: '192.168.1.100',
    speed: '1000 Mbps',
  },
  {
    id: 'wlan0',
    name: 'wlan0',
    displayName: 'Wi-Fi (wlan0)',
    type: 'wireless',
    description: 'Intel AX210 Wi-Fi 6E',
    status: 'active',
    mac: 'AA:BB:CC:DD:EE:FF',
    ip: '192.168.1.101',
    speed: '2400 Mbps',
  },
  {
    id: 'eth1',
    name: 'eth1',
    displayName: 'Ethernet 1',
    type: 'ethernet',
    description: 'Realtek RTL8125 2.5GbE',
    status: 'inactive',
    mac: '11:22:33:44:55:66',
    ip: '—',
    speed: '2500 Mbps',
  },
  {
    id: 'lo',
    name: 'lo',
    displayName: 'Loopback (lo)',
    type: 'loopback',
    description: 'Local Loopback',
    status: 'active',
    mac: '00:00:00:00:00:00',
    ip: '127.0.0.1',
    speed: '—',
  },
  {
    id: 'tun0',
    name: 'tun0',
    displayName: 'VPN Tunnel (tun0)',
    type: 'tunnel',
    description: 'OpenVPN TUN Interface',
    status: 'active',
    mac: '—',
    ip: '10.8.0.10',
    speed: '100 Mbps',
  },
]

/** 网卡类型对应图标名称（lucide-react） */
export const interfaceTypeIcons = {
  ethernet: 'Cable',
  wireless: 'Wifi',
  loopback: 'Repeat',
  tunnel: 'Lock',
}
