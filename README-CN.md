# Omni Skill Explorer | 技能市场探索器

这是一个用于收集和发现热门 AI 技能（Coze, Dify, GPT Store 等）的在线工具。

**🌐 访问地址：[https://Fel1xKan.github.io/omni-skill-explorer/](https://Fel1xKan.github.io/omni-skill-explorer/)**

## 🌟 功能特点
- **动态更新**：通过 GitHub Actions 每天自动运行同步脚本。
- **热度指标**：实时显示技能的热度（Hotness） and 下载量。
- **一键收藏**：本地持久化保存您感兴趣的技能。
- **全平台支持**：涵盖主流 AI Agent 市场。

## 🚀 快速开始

### 本地运行
1. 确保已安装 Python 3。
2. 在终端运行 `python -m http.server 8000`。
3. 访问 `http://localhost:8000`。

### 数据同步
手动更新市场数据：
```bash
python sync_market.py
```

## 🛠 自动化部署 (GitHub Pages)
本项目已配置 GitHub Actions。
- **自动同步**：每天 00:00 (UTC) 自动运行 `sync_market.py` 并提交更新。
- **手动触发**：在仓库的 `Actions` 标签页，选择 `Market Data Sync` 并点击 `Run workflow`。

## 📄 许可
MIT License
