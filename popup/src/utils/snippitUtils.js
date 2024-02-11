import { ERROR_MESSAGES } from "./errorMessages";


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

const validateCategory = (newCategory, snipdCategories) => {
  if (!newCategory.trim()) {
    throw new Error(ERROR_MESSAGES.EMPTY_CATEGORY);
  }

  if (snipdCategories.includes(newCategory)) {
    throw new Error(ERROR_MESSAGES.DUPLICATE_CATEGORY);
  }
};

const truncateString = (str, maxLength) => (str.length > maxLength ? `${str.substring(0, maxLength)}...` : str);


export { saveSnipd, saveNote, openAllSnipdPage, truncateString, validateCategory };
