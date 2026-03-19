# Omni Skill Explorer

An online tool for discovering popular AI skills, plugins, and agents across various marketplaces including Coze, Dify, GPT Store, Smithery, HiMCP, and more.

**🌐 Live Demo: [https://Fel1xKan.github.io/omni-skill-explorer/](https://Fel1xKan.github.io/omni-skill-explorer/)**

## 🌟 Features
- **Auto-Sync**: Daily data updates powered by GitHub Actions.
- **Popularity Metrics**: Real-time display of skill "Hotness" and download counts.
- **Personal Collection**: Locally persist markers for your favorite skills.
- **Claude Code & MCP Support**: Direct installation commands for modern AI agent environments.
- **Multi-Platform Support**: Comprehensive coverage of major AI ecosystems including Smithery, Glama, E2B, and more.

## 🚀 Quick Start

### Local Development
1. Ensure Python 3 is installed.
2. Run the local server: `python -m http.server 8000`.
3. Open `http://localhost:8000`.

### Data Synchronization
Manually refresh market data:
```bash
python sync_market.py
```

## 🛠 Automation & Deployment
This project uses GitHub Actions for CI/CD.
- **Daily Sync**: Automatically runs `sync_market.py` at 00:00 UTC.
- **Manual Trigger**: Go to the `Actions` tab, select `Market Data Sync`, and click `Run workflow`.

## 📂 Supported Platforms
- **Claude Code Skills**: Direct `claude skill add` support.
- **Model Context Protocol (MCP)**: Smithery.ai, Glama.ai, MCP Directory, MCP.run, Pulse MCP
- **Agent Extensions**: Linkup, E2B, Composio, Toolhouse
- **Developer Ecosystems**: Coze, Dify, GPT Store, Warp Drive

## 📄 License
MIT License
