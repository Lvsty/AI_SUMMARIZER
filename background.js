chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(["geminiApiKey"], (result) => {
        if (!result.geminiApiKey) {
            // open extension options page
            chrome.runtime.openOptionsPage();
            // alternative: chrome.tabs.create({ url: chrome.runtime.getURL("options.html") });
        }
    });
})
