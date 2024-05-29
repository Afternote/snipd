
let ext_api = chrome;
const ID_ADD_SELECTED_TEXT_TO_COLLECTION = "add_selected_text_to_collection";

chrome.tabs.onActivated.addListener(async function (activeInfo) {
  await chrome.sidePanel.setOptions({
    enabled: false,
  });
  await chrome.sidePanel.setOptions({
    enabled: true,
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "open-sidepanel") {
    console.log("message recieved")
    chrome.windows.getCurrent((window) => {
      console.log(window.id)
      chrome.sidePanel.open({ windowId: window.id });
    });
  }else if(message.type === "open-central-page"){
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "mySidepanel") {
    port.onDisconnect.addListener(async () => {
      console.log("Sidepanel closed.");
      chrome.storage.local.remove(["snip_content", "snip_type"]);
    });
  }
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: "https://snipd-landing.vercel.app/",
    });
    await chrome.storage.local.set({"tooltip_enabled": true})

  }
});

chrome.action.onClicked.addListener(async function () {
  await chrome.sidePanel.setOptions({
    enabled: true,
  });
  await chrome.sidePanel
    .setPanelBehavior({
      openPanelOnActionClick: true,
    })
    .catch((error) => console.error(error));
});
chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch((error) => console.error(error));

ext_api.contextMenus.create({
  title: "Add Selected Text to Collection",
  contexts: ["selection"],
  id: ID_ADD_SELECTED_TEXT_TO_COLLECTION,
});

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
  chrome.sidePanel.setOptions({
    enabled: true,
  });
  switch (info.menuItemId) {
    case "add_image_to_collection":
      chrome.storage.local.set({
        snip_type: "image",
        snip_content: info.srcUrl,
      });
      ext_api.sidePanel.open({ windowId: tab.windowId });
      break;

    case "add_selected_text_to_collection":
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.storage.local.set({
          snip_type: "text",
          snip_content: info.selectionText,
        });

        chrome.sidePanel.open({ windowId: tabs[0].windowId });
      });
      break;

    case "add_link_to_collection":
      chrome.storage.local.set({
        snip_type: "link",
        snip_content: info.pageUrl,
      });
      ext_api.sidePanel.open({ windowId: tab.windowId });
      break;
  }
});

ext_api.storage.local.get(["snipd_store"]).then((e) => {
  if (!e.snipd_store) ext_api.storage.local.set({ snipd_store: [] });
});

ext_api.storage.local.get(["snipd_categories"]).then((e) => {
  if (!e.snipd_categories) ext_api.storage.local.set({ snipd_categories: ["Default"] });
});
