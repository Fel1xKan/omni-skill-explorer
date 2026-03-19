# Omni Skill Explorer

An online tool for discovering popular AI skills, plugins, and agents across various marketplaces including Coze, Dify, GPT Store, Smithery, HiMCP, and more.

**🌐 Live Demo: [https://Fel1xKan.github.io/omni-skill-explorer/](https://Fel1xKan.github.io/omni-skill-explorer/)**

## 🌟 Features
- **Auto-Sync**: Daily data updates powered by GitHub Actions.
- **Popularity Metrics**: Real-time display of skill "Hotness" and download counts.
- **Personal Collection**: Locally persist markers for your favorite skills.
- **Multi-Platform Support**: Comprehensive coverage of major AI ecosystems.

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
- **Coze / Dify / GPT Store / Poe**
- **Model Context Protocol (MCP)**: Smithery.ai, HiMCP.ai, MCP.run, Pulse MCP
- **Agent Extensions**: ClawHub, Composio, Toolhouse
- **Developer Hubs**: LangChain Hub

## 📄 License
MIT License
