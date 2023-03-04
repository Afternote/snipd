(async () => {
    const [tab] = await browser.tabs.query({active: true, currentWindow: true});
    let result;
    try {
    [{result}] = await browser.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => window.getSelection().toString(),
        });
    } catch (e) {
        document.body.append('error\n');
    }
    document.body.append('Selection: ' + result);
    document.body.append((new Date()).toString());
})();
