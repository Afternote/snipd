/**
 * @type typeof chrome
 */
let ext_api = chrome;
const ID_ADD_SELECTED_TEXT_TO_COLLECTION = "add_selected_text_to_collection";

async function getCurrentSelection() {
  const [currentTab] = await ext_api.tabs.query({
    active: true,
    currentWindow: true,
  });
  let [{ result }] = await ext_api.scripting.executeScript({
    target: { tabId: currentTab.id },
    func: () => window.getSelection().toString(),
  });
  return result;
}

async function getSnipObjectFromCurrentSelection() {
  const [currentTab] = await ext_api.tabs.query({
    active: true,
    currentWindow: true,
  });
  let currentSelection = await getCurrentSelection();

  return {
    source: currentTab.url,
    title: currentTab.title,
    content: currentSelection,
    date: new Date().toString(),
  };
}

ext_api.contextMenus.create({
  title: "Add Selected Text to Collection",
  contexts: ["selection"],
  id: ID_ADD_SELECTED_TEXT_TO_COLLECTION,
});

ext_api.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === ID_ADD_SELECTED_TEXT_TO_COLLECTION) {
    getSnipObjectFromCurrentSelection().then((e) => {
      console.log(e);
    });
  }
});
