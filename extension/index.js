const ID_ADD_SELECTED_TEXT_TO_COLLECTION = "add_selected_text_to_collection";

const extApi = chrome;


async function setSidePanelOptions(enabled) {
  await extApi.sidePanel.setOptions({ enabled });
}

function setPanelBehavior() {
  extApi.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
}

function createContextMenu(title, contexts, id) {
  extApi.contextMenus.create({ title, contexts, id });
}

function setStorageDefaults() {
  extApi.storage.local.get(["snipd_store"]).then((e) => {
    if (!e.snipd_store) extApi.storage.local.set({ snipd_store: [] });
  });

  extApi.storage.local.get(["snipd_categories"]).then((e) => {
    if (!e.snipd_categories) extApi.storage.local.set({ snipd_categories: ["Default"] });
  });
}



chrome.tabs.onActivated.addListener(async function (activeInfo) {
  await setSidePanelOptions(false);
});

chrome.action.onClicked.addListener(function () {
  setSidePanelOptions(true);
});

setPanelBehavior();

createContextMenu("Add Selected Text to Collection", ["selection"], ID_ADD_SELECTED_TEXT_TO_COLLECTION);
createContextMenu("Add Image to Collection", ["image"], "add_image_to_collection");
createContextMenu("Add Link to Collection", ["page"], "add_link_to_collection");

extApi.contextMenus.onClicked.addListener((info, tab) => {
  setSidePanelOptions(true);

  function handleMenuItem(menuItemId, snipType, snipContent) {
    extApi.storage.local.set({ snip_type: snipType, snip_content: snipContent });
    extApi.sidePanel.open({ windowId: tab.windowId });
  }

  switch (info.menuItemId) {
    case "add_image_to_collection":
      handleMenuItem("image", info.srcUrl);
      break;

    case ID_ADD_SELECTED_TEXT_TO_COLLECTION:
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        handleMenuItem("text", info.selectionText);
      });
      break;

    case "add_link_to_collection":
      handleMenuItem("link", info.pageUrl);
      break;
  }
});


setStorageDefaults();
