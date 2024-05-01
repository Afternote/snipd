/**
 * @type typeof chrome
 */
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

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "mySidepanel") {
    port.onDisconnect.addListener(async () => {
      console.log("Sidepanel closed.");
      chrome.storage.local.remove(["snip_content", "snip_type"]);
    });
  }
});

// chrome.tabs.onSelectionChanged.addListener((tabId, changeInfo, tab) => {
//   chrome.tabs.sendMessage(tabId, { action: "showTooltip" });
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "selectedTextAction") {
//     // Handle the selected text action here (e.g., search the web)
//     console.log("helloooo from the ooutsideee");
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "showTooltip") {
//     const selection = window.getSelection();
//     if (selection.toString().trim() !== "") {
//       const tooltip = document.createElement("div");
//       tooltip.classList.add("tooltip");
//       tooltip.innerHTML = `
//         <span class="option" data-action="search">Search</span>
//         <span class="option" data-action="translate">Translate</span>
//       `;
//       document.body.appendChild(tooltip);
//       positionTooltip(tooltip, selection);

//       // Handle option clicks here (send message with selected text and action)
//       const options = document.querySelectorAll(".option");
//       options.forEach(option => {
//         option.addEventListener("click", () => {
//           const action = option.dataset.action;
//           chrome.runtime.sendMessage({ action: "selectedTextAction", text: selection.toString(), chosenAction: action });
//         });
//       });
//     }
//   }
// });

// function positionTooltip(tooltip, selection) {
//   const rect = selection.getRangeAt(0).getBoundingClientRect();
//   tooltip.style.left = `${rect.left + window.scrollX}px`;
//   tooltip.style.top = `${rect.top + window.scrollY + rect.height}px`;
// }

// document.addEventListener("mouseleave", () => {
//   const tooltip = document.querySelector(".tooltip");
//   if (tooltip) {
//     tooltip.remove();
//   }
// });

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: "https://snipd-landing.vercel.app/",
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === "textSelected") {
    console.log("Selected text:", message.text);
    // Add your extension logic here based on the selected text
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

// Make a storage array if it doesn't exist
ext_api.storage.local.get(["snipd_store"]).then((e) => {
  if (!e.snipd_store) ext_api.storage.local.set({ snipd_store: [] });
});

// Make a storage array if it doesn't exist
ext_api.storage.local.get(["snipd_categories"]).then((e) => {
  if (!e.snipd_categories) ext_api.storage.local.set({ snipd_categories: ["Default"] });
});
