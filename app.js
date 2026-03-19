// Data Model for Skills - Now with Popularity Metrics
let popularSkills = [];
let myCollection = JSON.parse(localStorage.getItem('mySkills')) || [];
let currentPage = 'discover';
let currentFilter = 'All';

// Configuration
const DATA_SOURCE = 'skills_data.json'; // Local file updated by crawler

// Initial hardcoded fallback
const fallbackData = [
    {
        "id": "smithery_docker",
        "name": "Docker MCP",
        "platform": "Smithery",
        "category": "DevOps",
        "description": "Manage Docker containers and images directly through MCP.",
        "url": "https://smithery.ai/mcp/@mcp-get/docker",
        "install_command": "npx @smithery/cli install @mcp-get/docker --client claude",
        "trending": true,
        "hotness": 100,
        "downloads": "25.4K"
    },
    {
        "id": "glama_browser",
        "name": "Browser Tool",
        "platform": "Glama",
        "category": "Search",
        "description": "High-quality browser automation and web scraping tool.",
        "url": "https://glama.ai/mcp/browser",
        "install_command": null,
        "trending": true,
        "hotness": 98,
        "downloads": "18.2K"
    },
    {
        "id": "e2b_code_interpreter",
        "name": "E2B Code Interpreter",
        "platform": "E2B",
        "category": "Coding",
        "description": "Secure sandboxed environment for code execution.",
        "url": "https://e2b.dev",
        "install_command": "claude skill add https://github.com/e2b-dev/mcp-server",
        "trending": true,
        "hotness": 97,
        "downloads": "12.1K"
    }
];

async function fetchLatestData() {
    try {
        const response = await fetch(DATA_SOURCE);
        if (response.ok) {
            popularSkills = await response.json();
            console.log('Successfully synced with latest market data.');
        } else {
            console.warn('Market data file not found, using fallback.');
            popularSkills = fallbackData;
        }
    } catch (e) {
        console.warn('Network error fetching market data, using fallback.');
        popularSkills = fallbackData;
    }
    renderPage();
}

// DOM Elements
const pageContent = document.getElementById('page-content');
const navLinks = document.querySelectorAll('.nav-links li');
const addSkillBtn = document.getElementById('add-skill-btn');
const modalOverlay = document.getElementById('add-modal');
const closeModalBtn = document.getElementById('close-modal');
const addSkillForm = document.getElementById('add-skill-form');
const syncDataBtn = document.getElementById('sync-data-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestData(); // Load dynamic data
    setupEventListeners();
});

function setupEventListeners() {
    // Sync Button
    syncDataBtn.addEventListener('click', async () => {
        syncDataBtn.textContent = '⌛ Syncing...';
        syncDataBtn.disabled = true;
        await fetchLatestData();
        setTimeout(() => {
            syncDataBtn.textContent = '🔄 Sync Market';
            syncDataBtn.disabled = false;
        }, 1000);
    });
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentPage = link.dataset.page;
            renderPage();
        });
    });

    // Modal
    addSkillBtn.addEventListener('click', () => modalOverlay.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => modalOverlay.classList.add('hidden'));

    // Form Submission
    addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newSkill = {
            id: Date.now().toString(),
            name: document.getElementById('skill-name').value,
            platform: document.getElementById('skill-platform').value,
            category: document.getElementById('skill-category').value || 'Uncategorized',
            description: document.getElementById('skill-desc').value,
            url: document.getElementById('skill-url').value,
            install_command: document.getElementById('skill-install').value || null,
            trending: false
        };
        saveToCollection(newSkill);
        addSkillForm.reset();
        modalOverlay.classList.add('hidden');
        renderPage();
    });

    // Global click for "Save" and "Copy" buttons (Event Delegation)
    document.addEventListener('click', (e) => {
        const saveBtn = e.target.closest('.save-btn');
        const copyBtn = e.target.closest('.copy-btn');
        const copyCmdBtn = e.target.closest('.copy-cmd-btn');

        if (saveBtn) {
            const skillId = saveBtn.dataset.id;
            const skill = popularSkills.find(s => s.id === skillId) || myCollection.find(s => s.id === skillId);
            
            if (isSaved(skillId)) {
                removeFromCollection(skillId);
                saveBtn.classList.remove('active');
                saveBtn.textContent = '☆';
            } else {
                saveToCollection(skill);
                saveBtn.classList.add('active');
                saveBtn.textContent = '★';
            }
        }

        if (copyBtn) {
            const url = copyBtn.dataset.url;
            navigator.clipboard.writeText(url).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '✅ Copied';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
        }

        if (copyCmdBtn) {
            const cmd = copyCmdBtn.dataset.cmd;
            navigator.clipboard.writeText(cmd).then(() => {
                const originalText = copyCmdBtn.innerHTML;
                copyCmdBtn.innerHTML = '✅';
                setTimeout(() => {
                    copyCmdBtn.innerHTML = originalText;
                }, 2000);
            });
        }
    });

    // Search focus
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (currentPage === 'discover') {
            renderDiscoverPage(query);
        } else if (currentPage === 'my-collection') {
            renderCollectionPage(query);
        }
    });
}

function renderPage() {
    pageContent.innerHTML = '';
    pageContent.className = 'page-fade-in';
    
    switch(currentPage) {
        case 'discover':
            renderDiscoverPage();
            break;
        case 'my-collection':
            renderCollectionPage();
            break;
        case 'platforms':
            renderPlatformsPage();
            break;
    }
}

function renderDiscoverPage(query = '') {
    const categories = ['All', 'Office', 'Automation', 'Finance', 'Communication', 'Utilities', 'Data', 'Education', 'Marketing', 'Sales', 'Lifestyle', 'Legal', 'Search', 'Creative', 'Productivity', 'Research', 'Coding'];
    
    let html = `
        <div class="section-title">
            <h2>Discover Popular Skills</h2>
            <p>Trending tools and plugins from across the AI ecosystem.</p>
        </div>
        
        <div class="filters">
            ${categories.map(cat => `
                <div class="filter-chip ${currentFilter === cat ? 'active' : ''}" onclick="setFilter('${cat}')">
                    ${cat}
                </div>
            `).join('')}
        </div>
        
        <div class="skills-grid">
    `;

    const filtered = popularSkills.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
        const matchesFilter = currentFilter === 'All' || s.category === currentFilter;
        return matchesQuery && matchesFilter;
    });

    if (filtered.length === 0) {
        html += `<div class="no-results">No skills found matching your search.</div>`;
    } else {
        filtered.forEach(skill => {
            html += renderSkillCard(skill);
        });
    }

    html += `</div>`;
    pageContent.innerHTML = html;
}

function renderCollectionPage(query = '') {
    let html = `
        <div class="section-title">
            <h2>My Collection</h2>
            <p>Your curated list of essential AI skills.</p>
        </div>
        <div class="skills-grid">
    `;

    const filtered = myCollection.filter(s => 
        s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        html += `
            <div class="empty-state">
                <p>Your collection is empty. Discover and save skills to see them here.</p>
            </div>
        `;
    } else {
        filtered.forEach(skill => {
            html += renderSkillCard(skill);
        });
    }

    html += `</div>`;
    pageContent.innerHTML = html;
}

function renderPlatformsPage() {
    const platforms = [
        { name: 'Smithery', url: 'https://smithery.ai', desc: 'The leading MCP ecosystem for discovering and installing tools.' },
        { name: 'Glama', url: 'https://glama.ai/mcp', desc: 'Curated directory of high-quality MCP servers with detailed docs.' },
        { name: 'MCP Directory', url: 'https://mcp-directory.com', desc: 'Community-driven registry of open-source MCP projects.' },
        { name: 'Linkup', url: 'https://linkup.ai', desc: 'Deep web search and real-time data API for AI agents.' },
        { name: 'E2B', url: 'https://e2b.dev', desc: 'Secure cloud sandboxes for running code and AI tools.' },
        { name: 'Composio', url: 'https://composio.ai', desc: 'Connect LLMs with 100+ apps like GitHub, Slack, and Jira.' },
        { name: 'Coze', url: 'https://www.coze.com', desc: 'ByteDance\'s platform for building AI agents and plugins.' },
        { name: 'GPT Store', url: 'https://chat.openai.com/gpts', desc: 'The official marketplace for custom ChatGPT versions.' },
        { name: 'Warp Drive', url: 'https://www.warp.dev/drive', desc: 'A market for terminal-based AI workflows and commands.' },
        { name: 'Pulse MCP', url: 'https://pulsemcp.com', desc: 'A hub for tracking trending and new MCP servers.' },
        { name: 'MCP.run', url: 'https://mcp.run', desc: 'Deploy and run MCP servers in a serverless environment.' }
    ];

    let html = `
        <div class="section-title">
            <h2>Top AI Platforms</h2>
            <p>Explore the ecosystems driving the AI skill revolution.</p>
        </div>
        <div class="skills-grid">
            ${platforms.map(p => `
                <div class="skill-card platform-card">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                    <a href="${p.url}" target="_blank" class="btn-primary" style="display:inline-block; text-decoration:none; text-align:center; width:100%">Visit Marketplace</a>
                </div>
            `).join('')}
        </div>
    `;
    pageContent.innerHTML = html;
}

function renderSkillCard(skill) {
    const saved = isSaved(skill.id);
    const hotnessColor = skill.hotness > 90 ? '#ff4d94' : skill.hotness > 70 ? '#ffae42' : '#00f2fe';
    
    let installHtml = '';
    if (skill.install_command) {
        installHtml = `
            <div class="install-cmd">
                <code>${skill.install_command}</code>
                <button class="copy-cmd-btn" data-cmd="${skill.install_command}" title="Copy Command">📋</button>
            </div>
        `;
    }

    return `
        <div class="skill-card ${skill.trending ? 'trending' : ''}">
            <div class="card-header">
                <div class="header-left">
                    <span class="platform-badge">${skill.platform}</span>
                    ${skill.trending ? '<span class="trending-badge">🔥 Hot</span>' : ''}
                </div>
                <button class="save-btn ${saved ? 'active' : ''}" data-id="${skill.id}">
                    ${saved ? '★' : '☆'}
                </button>
            </div>
            <div class="popularity-bar">
                <div class="popularity-fill" style="width: ${skill.hotness}%; background: ${hotnessColor}"></div>
            </div>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            ${installHtml}
            <div class="card-footer">
                <div class="stats">
                    <span class="stat-item">👥 ${skill.downloads || 'N/A'}</span>
                    <span class="category-tag">#${skill.category}</span>
                </div>
                <div class="card-actions">
                    <button class="copy-btn" data-url="${skill.url}">📋 Copy URL</button>
                    <a href="${skill.url}" target="_blank" class="visit-link">Visit →</a>
                </div>
            </div>
        </div>
    `;
}

// Global Filter Helper
window.setFilter = function(filter) {
    currentFilter = filter;
    renderPage();
};

// Storage Helpers
function isSaved(id) {
    return myCollection.some(s => s.id === id);
}

function saveToCollection(skill) {
    if (!isSaved(skill.id)) {
        myCollection.push(skill);
        localStorage.setItem('mySkills', JSON.stringify(myCollection));
    }
}

function removeFromCollection(id) {
    myCollection = myCollection.filter(s => s.id !== id);
    localStorage.setItem('mySkills', JSON.stringify(myCollection));
    if (currentPage === 'my-collection') renderPage();
}
