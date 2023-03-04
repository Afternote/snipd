/**
 * @type typeof chrome
 */
let ext_api = chrome;
const ID_ADD_SELECTED_TEXT_TO_COLLECTION = "add_selected_text_to_collection";

ext_api.contextMenus.create({
  title: "Add Selected Text to Collection",
  contexts: ["selection"],
  id: ID_ADD_SELECTED_TEXT_TO_COLLECTION,
});

ext_api.contextMenus.onClicked.addListener((info, _) => {
  if (info.menuItemId === ID_ADD_SELECTED_TEXT_TO_COLLECTION) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      if (tabs[0].url.endsWith(".pdf")) {
        chrome.storage.local.set({ selectionText: info.selectionText });
      }
    });
    chrome.action.openPopup();
  }
});

// Make a storage array if it doesn't exist
ext_api.storage.local.get(["snipd_store"]).then((e) => {
  if (!e.snipd_store);
  ext_api.storage.local.set({ snipd_store: [] });
});
