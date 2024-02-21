import { useEffect, useState } from "react";
import Note from "./components/Note";
import { EmptySelection } from "./components/EmptySelection";

async function getCurrentSelectionData() {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    func: async () => {
      let selectionText = await chrome.storage.local.get(["snip_content", "snip_type"]);
      await chrome.storage.local.remove(["snip_content", "snip_type"]);

      if (!window.location.href.endsWith(".pdf") && selectionText.snip_content === undefined) {
        return {
          snip_content: window.getSelection().toString(),
          snip_type: "text",
        };
      } else {
        return selectionText;
      }
    },
  });

  return {
    source: currentTab.url,
    title: currentTab.title,
    type: result.snip_type,
    content: result.snip_content,
    date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString() ,
  };
}

function App() {
  const [snipd, setSnipd] = useState();
  const [snipdStore, setSnipdStore] = useState(chrome.storage.local.get(["snipd_store"]))

  console.log(chrome.storage.local.get(["snipd_store"]))
  useEffect(() => {
    console.log(snipdStore)
  }, [snipdStore])
  

  useEffect(() => {

    getCurrentSelectionData().then((selection) => {
      setSnipd(selection);
    });
  }, []);

  return (
    <div
      className="App"
      >
      {!!snipd?.content ? (
        <Note
          snipd={snipd}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <EmptySelection />
      )}
    </div>
  );
}

export default App;
