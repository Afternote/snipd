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


//context menu item for image
ext_api.contextMenus.create({
  title: "Add Image to Collection",
  contexts: ["image"],
  id: "add_image_to_collection",
});

ext_api.contextMenus.create({
  title: "Add Link to Collection",
  contexts: ["page"],
  id: "add_link_to_collection",
});

ext_api.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "add_image_to_collection":
      chrome.storage.local.set({
        snip_type: "image",
        snip_content: info.srcUrl,
      });
    
      ext_api.sidePanel.open({windowId: tab.windowId});
      break;

    case "add_selected_text_to_collection":
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs[0].url.endsWith(".pdf")) {
          chrome.storage.local.set({
            snip_type: "text",
            snip_content: info.selectionText,
          });
          ext_api.sidePanel.open({windowId: tabs[0].windowId});

        }
      });
      break;

    case "add_link_to_collection":
      chrome.storage.local.set({
        snip_type: "link",
        snip_content: info.pageUrl,
      });
      ext_api.sidePanel.open({windowId: tab.windowId});
      break;
  }
});

// Make a storage array if it doesn't exist
ext_api.storage.local.get(["snipd_store"]).then((e) => {
  if (!e.snipd_store) ext_api.storage.local.set({ snipd_store: [] });
});

// Make a storage array if it doesn't exist
ext_api.storage.local.get(["snipd_categories"]).then((e) => {
  if (!e.snipd_categories) ext_api.storage.local.set({ snipd_categories: ["Default"] });
});
