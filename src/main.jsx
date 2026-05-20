import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 网络流量监控系统入口
// 使用 React 18 createRoot API 渲染应用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
