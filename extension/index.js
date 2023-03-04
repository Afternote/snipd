async function test() {
  const currentWindow = browser.windows.getCurrent();
}

/**
 * @type typeof chrome
 */
let ext_api = browser;

ext_api.contextMenus.create({
  title: "Add Selected Text to Collection",
  contexts: ["selection"],
  id: "txt2col_select",
});

ext_api.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info.menuItemId);
});
