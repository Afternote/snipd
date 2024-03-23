function moveSnipd(from, to) {
  return new Promise((res, _) => {
    chrome.storage.local.get(["snipd_store"]).then((obj) => {
      const new_store = [...obj.snipd_store];
      new_store.splice(to, 0, new_store.splice(from, 1)[0]);
      chrome.storage.local.set({ snipd_store: new_store }).then(() => {
        res();
      });
    });
  });
}

async function moveSnipdUp(id) {
  if (id > 0) {
    await moveSnipd(id, id - 1);
  }
}

async function moveSnipdTo(id, destination) {
  await moveSnipd(id, destination);
}

async function moveSnipdDown(id) {
  let obj = await chrome.storage.local.get(["snipd_store"]);
  const len = obj.snipd_store.length;

  if (id < len - 1) {
    await moveSnipd(id, id + 1);
  }
}

async function deleteSnipd(id) {
  let obj = await chrome.storage.local.get(["snipd_store"]);
  const len = obj.snipd_store.length;

  if (id >= 0 && id <= len - 1) {
    let new_store = [...obj.snipd_store];
    new_store.splice(id, 1);
    await chrome.storage.local.set({ snipd_store: new_store });
  }
}

function filterSnipds(searchQuery, category, type, snipds) {
  const typeCountsTemp = {};
  const filteredSnipds = snipds.filter((a) => {
    const textToSearch = `${a.content} ${a.title}`.toLowerCase();
    const matchesCriteria =
      (!category || a.category === category) &&
      (!type || a.type === type) &&
      textToSearch.includes(searchQuery.toLowerCase());

    if (matchesCriteria) {
      typeCountsTemp[a.type] = (typeCountsTemp[a.type] || 0) + 1;
    }

    return matchesCriteria;
  });

  return { filteredSnipds, typeCountsTemp };
}

export { moveSnipdUp, moveSnipdDown, deleteSnipd, moveSnipdTo, filterSnipds };
