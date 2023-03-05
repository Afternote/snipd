function saveSnipd(snipd) {
  return new Promise((res, _) => {
      chrome.storage.local.get(["snipd_store"]).then((old_snipd_store) => {
        console.log(old_snipd_store.snipd_store);
        const snipd_store = [...old_snipd_store.snipd_store];
        snipd_store.unshift(snipd);
        chrome.storage.local.set({ snipd_store: snipd_store }).then(() => {
            res();
        });
      });
  });
}

function saveNote(content) {
  return new Promise((res, _) => {
      chrome.storage.local.get(["snipd_store"]).then((old_snipd_store) => {
        console.log(old_snipd_store.snipd_store);
        const snipd_store = [...old_snipd_store.snipd_store];
        snipd_store.unshift({
            content: content,
            date: (new Date()).toString(),
            source: "",
            title: "",
            type: "note"
        });
        chrome.storage.local.set({ snipd_store: snipd_store }).then(() => {
            res();
        });;
      });
  });
}

function openAllSnipdPage() {
  chrome.runtime.openOptionsPage();
}

export { saveSnipd, saveNote, openAllSnipdPage };
