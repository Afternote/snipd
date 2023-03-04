function saveSnipd(snipd) {
    chrome.storage.local.get(["snipd_store"]).then(old_snipd_store => {
        console.log(old_snipd_store.snipd_store);
        const snipd_store = [...old_snipd_store.snipd_store];
        snipd_store.unshift(snipd);
        chrome.storage.local.set({ snipd_store: snipd_store });
    });
}

export { saveSnipd };
