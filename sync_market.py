import json
import random
import time
from datetime import datetime

# This is a template for an aggregator script. 
# Real scraping would require library like Playwright for JS-heavy sites like GPT Store.
# For this demo, this script 'refreshes' the local data with simulated trending changes.

DATA_FILE = 'skills_data.json'

def load_data():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def refresh_metrics():
    """Simulates a crawl that updates hotness and download counts."""
    data = load_data()
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Started market sync...")
    
    for item in data:
        # Simulate download growth
        if 'downloads' in item:
            num = float(item['downloads'].replace('M', '').replace('K', ''))
            suffix = 'M' if 'M' in item['downloads'] else 'K'
            # Random growth between 0.1% and 1%
            num *= (1 + random.uniform(0.001, 0.01))
            item['downloads'] = f"{num:.1f}{suffix}"
            
        # Randomize priority Score (Hotness)
        item['hotness'] = max(10, min(100, item['hotness'] + random.randint(-2, 3)))
        
        # Randomly toggle trending status for high performers
        if item['hotness'] > 95:
            item['trending'] = True
        elif item['hotness'] < 80:
            item['trending'] = False
            
    # Sort by hotness descending
    data.sort(key=lambda x: x['hotness'], reverse=True)
    
    save_data(data)
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Sync complete. {len(data)} items updated.")

if __name__ == "__main__":
    refresh_metrics()
