async function setHoverForSearchButton(addToCollectionButton) {
  const categoryPanel = createHoverPanelForButton(
    addToCollectionButton,
    undefined,
    undefined,
    true
  );
  categoryPanel.classList.add("no-padding-tooltip");
  categoryPanel.style.textAlign = configs.reverseTooltipButtonsOrder ? "end" : "start";

  const categories = await chrome.storage.local.get("snipd_categories");

  const containerPrototype = createCategoryButtonPrototype(
    categories.snipd_categories.length,
    configs
  );

  // Loop through categories and create buttons
  for (const category of categories.snipd_categories) {
    const container = containerPrototype.cloneNode(true);
    const imgButton = createCategoryIconButton();
    const labelSpan = createCategoryLabelSpan(category);

    container.appendChild(configs.reverseTooltipButtonsOrder ? labelSpan : imgButton);
    container.appendChild(configs.reverseTooltipButtonsOrder ? imgButton : labelSpan);

    categoryPanel.appendChild(container);

    // Add click listener with proper binding
    container.addEventListener("mousedown", async (event) => {
      event.stopPropagation();
      console.log(category);
      const snipd = {
        id: crypto.randomUUID(),//add uuidv4
        category: category,
        customNotes: null,
        content: window.getSelection().toString(),
        source: window.location.href,
        title: document.title,
        type: "text",
        date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString(),
      };   

      console.log(snipd)


      chrome.storage.local.get(["snipd_store"]).then((old_snipd_store) => {
        const snipd_store = [...old_snipd_store.snipd_store];
        snipd_store.unshift(snipd);
        chrome.storage.local.set({ snipd_store: snipd_store }).then(() => {
          hideTooltip();
          clearSelection()
        });
      });
    });
  }

  function clearSelection() {
    if (window.getSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges(); // For most browsers
    } else if (document.selection && document.selection.empty) { // For older IE versions
      document.selection.empty();
    }
  }
  

  // Cleanup
  containerPrototype.remove();

  if (!verticalSecondaryTooltip && categories.snipd_categories.length > configs.maxIconsInRow) {
    categoryPanel.style.display = "grid";
    categoryPanel.style.gridTemplateColumns = `repeat(${configs.maxIconsInRow}, 1fr)`;
  }

  addToCollectionButton.appendChild(categoryPanel);
}

function createCategoryButtonPrototype(categoryCount, configs) {
  const container = document.createElement("div");
  container.style.display = verticalSecondaryTooltip ? "block" : "inline-block";
  container.style.textAlign = configs.reverseTooltipButtonsOrder ? "end" : "start";
  container.className = "custom-category-button";
  if (!verticalSecondaryTooltip) container.style.padding = "0px";

  // Pre-allocate space for expected number of category buttons
  container.style.gridTemplateColumns = `repeat(${Math.min(
    categoryCount,
    configs.maxIconsInRow
  )}, 1fr)`;

  return container;
}

function createCategoryIconButton() {
  const imgButton = document.createElement("img");
  imgButton.setAttribute("class", "category-tooltip-icon");
  return imgButton;
}

function createCategoryLabelSpan(category) {
  const labelSpan = document.createElement("span");
  labelSpan.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  return labelSpan;
}
