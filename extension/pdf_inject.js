function getPdfSelectedText() {
  return new Promise((resolve) => {
    window.addEventListener("message", function onMessage(e) {
      if (
        e.origin === "chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai" &&
        e.data &&
        e.data.type === "getSelectedTextReply"
      ) {
        window.removeEventListener("message", onMessage);
        resolve(e.data.selectedText);
      }
    });
    // runs code in page context to access postMessage of the embedded plugin
    const script = document.createElement("script");
    if (chrome.runtime.getManifest().manifest_version > 2) {
      script.src = chrome.runtime.getURL("query-pdf.js");
    } else {
      script.textContent = `(${() => {
        document
          .querySelector("embed")
          .postMessage({ type: "getSelectedText" }, "*");
      }})()`;
    }
    document.documentElement.appendChild(script);
    script.remove();
  });
}

ext_api.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "getPdfSelection") {
    getPdfSelectedText().then(sendResponse);
    return true;
  }
});
