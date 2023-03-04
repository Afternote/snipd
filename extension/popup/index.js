async function getCurrentSelection() {
    const [currentTab] = await browser.tabs.query({active: true, currentWindow: true});
    let [{ result }] = await browser.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: () => window.getSelection().toString(),
    });
    return result
}

async function getSnipObjectFromCurrentSelection() {
    const [currentTab] = await browser.tabs.query({active: true, currentWindow: true});
    let currentSelection = await getCurrentSelection();

    return {
        "source": currentTab.url,
        "title": currentTab.title,
        "content": currentSelection,
        "date": (new Date()).toString()
    };
}
