/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 数据字体：Share Tech Mono
        mono: ['"Share Tech Mono"', 'monospace'],
        // 界面字体：Rajdhani 更适合 SOC 监控台的窄体密度
        sans: ['Rajdhani', 'Inter', 'sans-serif'],
        // 数字/重点数据字体
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      colors: {
        // 浅色 SOC 控制台背景色系
        void: {
          950: '#f6f9fc',
          900: '#edf4fb',
          800: '#dce8f3',
          700: '#c8d8e7',
        },
        // 主强调色
        cyan: {
          neon: '#2563eb',
          glow: '#3b82f6',
          dim: '#1d4ed8',
        },
        // 成功状态
        matrix: {
          bright: '#059669',
          mid: '#10b981',
          dim: '#047857',
        },
        // 警告状态
        amber: {
          neon: '#f59e0b',
          glow: '#f59e0b',
        },
        // 危险状态
        danger: {
          neon: '#dc2626',
          glow: '#b91c1c',
        },
        // 玻璃面板边框
        panel: {
          border: 'rgba(148, 163, 184, 0.26)',
          glow: 'rgba(37, 99, 235, 0.24)',
        }
      },
      boxShadow: {
        'neon-cyan': '0 14px 38px rgba(37,99,235,0.16)',
        'neon-green': '0 14px 34px rgba(5,150,105,0.14)',
        'neon-red': '0 14px 34px rgba(239,68,68,0.18)',
        'neon-amber': '0 14px 34px rgba(245,158,11,0.18)',
        'panel': '0 22px 54px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.82)',
        'card': '0 18px 42px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.84)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'data-flow': 'dataFlow 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        dataFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 12px 32px rgba(37,99,235,0.12)' },
          '50%': { boxShadow: '0 18px 44px rgba(37,99,235,0.22)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
