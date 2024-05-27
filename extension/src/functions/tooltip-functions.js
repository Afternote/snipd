function returnTooltipRevealTransform(endPosition = true, shouldShift = true) {
  const dxOffset = shouldShift ? "-50%" : "0";
  const dyPercentOffset = configs.verticalLayoutTooltip ? 30 : 100;

  switch (configs.tooltipRevealEffect) {
    case "noTooltipEffect":
      return `translate(${dxOffset},0)`;
    case "moveUpTooltipEffect":
      return endPosition
        ? `translate(${dxOffset},0)`
        : `translate(${dxOffset}, ${dyPercentOffset}%)`;
    case "moveDownTooltipEffect":
      return endPosition
        ? `translate(${dxOffset},0)`
        : `translate(${dxOffset}, -${dyPercentOffset}%)`;
    case "scaleUpTooltipEffect":
      return endPosition
        ? `translate(${dxOffset},0) scale(1.0)`
        : `translate(${dxOffset},0) scale(0.0)`;
    case "scaleUpFromBottomTooltipEffect":
      return endPosition
        ? `translate(${dxOffset},0) scale(1.0)`
        : `translate(${dxOffset},0) scale(0.0)`;
  }
}

function onTooltipButtonClick(e, url, text) {
  try {
    const evt = e || window.event;

    if ("buttons" in evt) {
      if (evt.button == 0) {
        /// Left button click
        hideTooltip();
        removeSelectionOnPage();

        chrome.runtime.sendMessage({
          type: "selecton-open-new-tab",
          url: url,
          focused: configs.leftClickBackgroundTab ? false : true,
        });
      } else if (evt.button == 1) {
        /// Middle button click
        evt.preventDefault();
        if (configs.middleClickHidesTooltip) {
          hideTooltip();
          removeSelectionOnPage();
        }

        chrome.runtime.sendMessage({ type: "selecton-open-new-tab", url: url, focused: false });
      }
    }
  } catch (e) {
    window.open(url, "_blank");
  }
}

function checkTooltipForCollidingWithSideEdges() {
  if (configs.debugMode) console.log("Checking Selecton tooltip for colliding with side edges...");

  if (tooltip == null) return;

  let dx = tooltip.getBoundingClientRect().left;
  let tooltipWidth = 4.0;

  if (configs.verticalLayoutTooltip) {
    tooltipWidth = 140;
  } else {
    const tooltipButtons = tooltip.querySelectorAll(".selection-tooltip > .selection-popup-button");
    for (let i = 0, l = tooltipButtons.length; i < l; i++) {
      tooltipWidth += tooltipButtons[i].offsetWidth;
    }
  }

  /// fix for collision detection not working with 'scale up' effects
  if (
    configs.tooltipRevealEffect == "scaleUpTooltipEffect" ||
    configs.tooltipRevealEffect == "scaleUpFromBottomTooltipEffect"
  ) {
    dx -= tooltipWidth / 2;
  }

  /// Tooltip is off-screen on the left
  if (dx < 0) {
    if (configs.debugMode) console.log("Tooltip is colliding with left edge. Fixing...");

    tooltip.style.left = `${5 + tooltipWidth / 2}px`;

    /// Shift the arrow to match new position
    if (configs.showTooltipArrow && arrow) {
      const newLeftPercentForArrow = ((-dx + 5) / tooltipWidth) * 100;
      arrow.style.left = `${50 - newLeftPercentForArrow}%`;
    }
  } else {
    /// Check tooltip to be off-screen on the right
    const screenWidth =
      document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;

    const offscreenAmount = dx + tooltipWidth - screenWidth;

    /// Tooltip is off-screen on the right
    if (offscreenAmount > 0) {
      if (configs.debugMode)
        console.log(`Tooltip is colliding with right edge by ${offscreenAmount}px`);

      tooltip.style.left = "unset";
      tooltip.style.right = `${5 - tooltipWidth / 2}px`;

      /// Shift the arrow to match new position
      if (configs.showTooltipArrow && arrow) {
        const newLeftPercentForArrow = ((offscreenAmount + 5) / tooltipWidth) * 100;
        arrow.style.left = `${50 + newLeftPercentForArrow}%`;
      }
    } else {
      if (configs.debugMode) console.log("Tooltip is not colliding with side edges");
    }
  }
}

function setBorderRadiusForSideButtons(parent, applyOnlyToButtons = true) {
  /// Set border radius for first and last buttons of horizontal tooltip
  const children = applyOnlyToButtons
    ? parent.querySelectorAll(".selection-tooltip > .selection-popup-button")
    : parent.children;
  const childrenLength = children.length;
  if (childrenLength == 1) {
    children[0].style.borderRadius = 0;
  } else {
    const revertedVerticalButtons = configs.verticalLayoutTooltip && tooltipOnBottom;
    children[0].style.borderRadius = revertedVerticalButtons
      ? lastButtonBorderRadius
      : firstButtonBorderRadius;
    children[childrenLength - 1].style.borderRadius = revertedVerticalButtons
      ? firstButtonBorderRadius
      : lastButtonBorderRadius;
  }
}

function addBasicTooltipButton(label, icon, onClick, isFirstButton = false, iconOpacity) {
  /// Used for basic button with action label + icon, when enabled
  const button = document.createElement("button");
  button.classList.add("circular-button");
  button.setAttribute(
    "class",
    isFirstButton || configs.showButtonBorders == false
      ? "selection-popup-button circular-button first-button"
      : "selection-popup-button circular-button first-button"
  );

  const image = document.createElement("img");
  image.src = chrome.runtime.getURL("../icons/button-icons/snipd2.png");
  button.appendChild(image);
  console.log(image.src);

  button.onmousedown = onClick;

  const sidepanelButton = document.createElement("button");
  sidepanelButton.classList.add("circular-button");
  sidepanelButton.setAttribute(
    "class",
    isFirstButton || configs.showButtonBorders == false
      ? "selection-popup-button circular-button"
      : "selection-popup-button circular-button"
  );
  const snipdLogoImage = document.createElement("img");
  snipdLogoImage.src = chrome.runtime.getURL("../icons/button-icons/marker.svg");
  sidepanelButton.appendChild(snipdLogoImage);

  sidepanelButton.onmousedown = () => {
    console.log("sidepanel clicked");
    chrome.runtime.sendMessage({ type: "open-sidepanel" });
  };

  const centralPageButton = document.createElement("button");
  centralPageButton.classList.add("circular-button");
  centralPageButton.setAttribute(
    "class",
    isFirstButton || configs.showButtonBorders == false
      ? "selection-popup-button circular-button"
      : "selection-popup-button circular-button"
  );
  const homeImage = document.createElement("img");
  homeImage.src = chrome.runtime.getURL("../icons/button-icons/home.svg");
  centralPageButton.appendChild(homeImage);

  centralPageButton.onmousedown = () => {
    chrome.runtime.sendMessage({ type: "open-central-page" });

  }

  if (configs.reverseTooltipButtonsOrder && isFirstButton == false)
    tooltip.insertBefore(button, tooltip.children[1]);
  else tooltip.appendChild(button);

  const separator = document.createElement("div");
  separator.classList.add("tooltip-separator");
  separator.setAttribute("class", "tooltip-separator");
  tooltip.appendChild(separator);

  tooltip.appendChild(sidepanelButton);
  tooltip.appendChild(centralPageButton);

  return button;
}

/// Hide tooltip when mouse moved far from text selection
function mouseMoveToHideListener(mouseMoveEvent) {
  if (tooltipIsShown == false || configs.hideTooltipWhenCursorMovesAway == false) {
    window.removeEventListener("mousemove", mouseMoveToHideListener);
    return;
  }

  if (
    Math.abs(mouseMoveEvent.clientX - lastMouseUpEvent.clientX) > this.window.screen.width / 4 ||
    Math.abs(mouseMoveEvent.clientY - lastMouseUpEvent.clientY) > this.window.screen.height / 4
  ) {
    window.removeEventListener("mousemove", mouseMoveToHideListener);

    try {
      hideTooltip();
      hideDragHandles();
    } catch (e) {}
  }
}

/// Set tooltip styling to be on bottom of text selection
function setTooltipOnBottom() {
  arrow.classList.add("arrow-on-bottom");
  tooltipOnBottom = true;

  if (configs.showInfoPanel && infoPanel && infoPanel.isConnected) {
    const newInfoPanel = infoPanel.cloneNode(true);
    newInfoPanel.classList.add("info-panel-on-bottom");
    tooltip.appendChild(newInfoPanel);
    try {
      infoPanel.remove();
      tooltip.removeChild(infoPanel);
    } catch (e) {}
    infoPanel = newInfoPanel;
  }
}

/// Makes tooltip draggable by given element (for example, arrow)
function makeTooltipElementDraggable(element, compensateTooltipHeight = true) {
  element.style.cursor = "grab";
  element.onmousedown = function (e) {
    isDraggingTooltip = true;
    e.preventDefault();
    if (configs.debugMode) console.log("Started dragging tooltip...");

    tooltip.style.left = `0px`;
    tooltip.style.top = `0px`;
    tooltip.style.transition = `opacity ${configs.animationDuration}ms ease-in-out`;
    document.body.style.cursor = "grabbing";

    // const tooltipOnBottom = arrow.classList.contains('arrow-on-bottom');
    const tooltipHeightCompensation = tooltipOnBottom
      ? arrow.clientHeight / 3
      : compensateTooltipHeight
      ? tooltip.clientHeight
      : 0;
    tooltip.style.transform = `translate(${e.clientX - tooltip.clientWidth / 2}px, ${
      tooltipOnBottom
        ? e.clientY + tooltipHeightCompensation
        : e.clientY - tooltipHeightCompensation
    }px)`;
    tooltip.style.pointerEvents = "none";

    document.onmousemove = function (e) {
      e.preventDefault();

      /// Move main tooltip
      tooltip.style.transform = `translate(${e.clientX - tooltip.clientWidth / 2}px, ${
        tooltipOnBottom
          ? e.clientY + tooltipHeightCompensation
          : e.clientY - tooltipHeightCompensation
      }px)`;
    };

    document.onmouseup = function (e) {
      e.preventDefault();
      document.onmousemove = null;
      document.onmouseup = null;
      isDraggingTooltip = false;
      document.body.style.cursor = "unset";

      tooltip.style.left = `${e.clientX - tooltip.clientWidth / 2}px`;
      tooltip.style.top = `${
        tooltipOnBottom
          ? e.clientY + tooltipHeightCompensation
          : e.clientY - tooltipHeightCompensation
      }px`;
      tooltip.style.transform = null;
      tooltip.style.pointerEvents = "auto";

      if (configs.debugMode) console.log("Dragging tooltip finished");
    };

    if (configs.hideTooltipWhenCursorMovesAway) {
      window.removeEventListener("mousemove", mouseMoveToHideListener);
    }
  };
}
