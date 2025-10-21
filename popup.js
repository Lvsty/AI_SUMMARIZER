document.getElementById("summarize").addEventListener("click", () => {
    const result = document.getElementById("result");
    const summaryType = document.getElementById("summary-type").value;

    result.innerHTML = '<div class="loader"></div>';

    // get the user api key
    chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
        if (!geminiApiKey) {
            result.textContent = "Please set your Gemini API key in the options page.";
            return;
        }

        // ask content.js for the page text
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
            }, () => {
                chrome.tabs.sendMessage(
                    tab.id,
                    { type: "GET_ARTICLE_TEST" },
                    async ({ text }) => {
                        if (!text) {
                            result.textContent = "No article text found on this page.";
                            return;
                        }

                        // send the text to the gemini
                        try {
                            const summary = await getGeminiSummary(geminiApiKey, text, summaryType);
                            result.textContent = summary;
                        } catch (error) {
                            result.textContent = "Error generating summary: " + error.message;
                        }
                    }
                );
            });
        });
    });
}); // ✅ This closing bracket was missing

// Define getGeminiSummary outside the click handler
async function getGeminiSummary(geminiApiKey, Rawtext, summaryType) {
    const max = 2000;
    const text = Rawtext.length > max ? Rawtext.slice(0, max) + "...." : Rawtext;

    const promptMap = {
        brief: `Summarize the following article in a brief paragraph: \n\n${text}`,
        detailed: `Summarize the following article in a detailed paragraph: \n\n${text}`,
        bullets: `Summarize the following article in bullet points: \n\n${text}`,
    };
    const prompt = promptMap[summaryType] || promptMap.brief;

    const response = await fetch(
        `https://generativeLanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.2 },
            }),
        }
    );

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error?.message || "Request Failed");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary generated.";
}
