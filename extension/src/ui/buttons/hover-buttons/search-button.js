async function setHoverForSearchButton(addToCollectionButton) {
    const categoryPanel = createHoverPanelForButton(addToCollectionButton, undefined, undefined, true);
    categoryPanel.classList.add("no-padding-tooltip");
    categoryPanel.style.textAlign = configs.reverseTooltipButtonsOrder ? "end" : "start";
  
    const categories = await chrome.storage.local.get("snipd_categories");
  
    const containerPrototype = createCategoryButtonPrototype(categories.snipd_categories.length, configs);
  
    // Loop through categories and create buttons
    for (const category of categories.snipd_categories) {
      const container = containerPrototype.cloneNode(true);
      const imgButton = createCategoryIconButton();
      const labelSpan = createCategoryLabelSpan(category);
  
      container.appendChild(configs.reverseTooltipButtonsOrder ? labelSpan : imgButton);
      container.appendChild(configs.reverseTooltipButtonsOrder ? imgButton : labelSpan);
  
      categoryPanel.appendChild(container);
  
      // Add click listener with proper binding
      container.addEventListener("mousedown", (event) => {
        event.stopPropagation();
        // TODO: Implement category click logic here
      });
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
    container.style.gridTemplateColumns = `repeat(${Math.min(categoryCount, configs.maxIconsInRow)}, 1fr)`;
  
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
  