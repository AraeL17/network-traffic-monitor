/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 数据字体：Share Tech Mono
        mono: ['"Share Tech Mono"', 'monospace'],
        // 界面字体：Inter 优先，适合浅色 Admin
        sans: ['Inter', 'Rajdhani', 'sans-serif'],
        // 数字/重点数据字体
        display: ['Inter', 'Orbitron', 'sans-serif'],
      },
      colors: {
        // 浅色玻璃拟态背景色系
        void: {
          950: '#f7fbff',
          900: '#eef6ff',
          800: '#e3edf8',
          700: '#d3e1ef',
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
          neon: '#d97706',
          glow: '#f59e0b',
        },
        // 危险状态
        danger: {
          neon: '#dc2626',
          glow: '#b91c1c',
        },
        // 玻璃面板边框
        panel: {
          border: 'rgba(148, 163, 184, 0.28)',
          glow: 'rgba(59, 130, 246, 0.32)',
        }
      },
      boxShadow: {
        'neon-cyan': '0 12px 32px rgba(37,99,235,0.18)',
        'neon-green': '0 12px 32px rgba(5,150,105,0.16)',
        'neon-red': '0 12px 32px rgba(220,38,38,0.16)',
        'neon-amber': '0 12px 32px rgba(217,119,6,0.16)',
        'panel': '0 18px 45px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.72)',
        'card': '0 14px 35px rgba(15,23,42,0.07), inset 0 1px 0 rgba(255,255,255,0.78)',
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
