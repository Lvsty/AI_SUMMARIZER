# AI_SUMMARIZER
A Chrome extension that summarizes articles using Google's Gemini API. Designed for quick, readable summaries with a clean interface.
## FEATURES
- One-click article summarization
- Supports brief, detailed, and bullet-point formats
- Automatically opens setup page on first install
- Clean popup interface for fast access
## INSTALLATION
1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder
## SETUP
- On first install, the extension opens the options page
- Paste your Gemini API key and click **Save**
- You're ready to start summarizing articles!
## FILE OVERVIEW
| File            | Purpose |
|-----------------|---------|
| `manifest.json` | Defines extension structure and permissions |
| `popup.html/js` | UI and logic for triggering summaries |
| `option.html/js`| Setup page for entering Gemini API key |
| `background.js` | Opens options page on first install |
| `content.js`    | Extracts readable text from the current webpage |
| `icon.png`      | Extension icon shown in Chrome toolbar |

## CREDITS
Built by CHITHRASHREE D using GEMINI API and Chrome Extension APIs
