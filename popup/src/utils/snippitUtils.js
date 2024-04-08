import { ERROR_MESSAGES } from "./errorMessages";
import { v4 as uuidv4 } from "uuid";

function saveSnipd(snipd) {
  return new Promise((res, _) => {
    chrome.storage.local.get(["snipd_store"]).then((old_snipd_store) => {
      const snipd_store = [...old_snipd_store.snipd_store];
      snipd_store.unshift(snipd);
      chrome.storage.local.set({ snipd_store: snipd_store }).then(() => {
        res();
      });
    });
  });
}

function saveNote(content, title) {
  return new Promise((res, _) => {
    chrome.storage.local.get(["snipd_store"]).then((old_snipd_store) => {
      const snipd_store = [...old_snipd_store.snipd_store];
      const uniqueId = generateUniqueId();
      snipd_store.unshift({
        id: uniqueId,
        content: content,
        date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString(),
        source: "",
        title: title,
        type: "note",
      });
      chrome.storage.local.set({ snipd_store: snipd_store }).then(() => {
        res();
      });
    });
  });
}

function generateUniqueId() {
  return uuidv4();
}

function openAllSnipdPage() {
  chrome.runtime.openOptionsPage();
}

const validateCustomNote = (customNote) => {
  if (!customNote.trim()) {
    return true;
  }
};

const validateCategory = (newCategory, snipdCategories) => {
  if (!newCategory.trim()) {
    throw new Error(ERROR_MESSAGES.EMPTY_CATEGORY);
  }

  if (snipdCategories.includes(newCategory)) {
    throw new Error(ERROR_MESSAGES.DUPLICATE_CATEGORY);
  }
};

const truncateString = (str, maxLength) =>
  str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

export {
  saveSnipd,
  saveNote,
  openAllSnipdPage,
  truncateString,
  validateCategory,
  validateCustomNote,
};
