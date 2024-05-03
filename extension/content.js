function getSelectionRectDimensions() {
  let sel = document.selection, range;
  let width = 0, height = 0;
  let dx = 0, dy = 0;
  if (sel) {
      if (sel.type != "Control") {
          range = sel.createRange();
          const rect = range.getBoundingClientRect();
          width = range.boundingWidth;
          height = range.boundingHeight;
          dx = rect.left;
          dy = rect.top;
      }
  } else if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
          range = sel.getRangeAt(0).cloneRange();
          if (range.getBoundingClientRect) {
              const rect = range.getBoundingClientRect();
              width = rect.right - rect.left;
              height = rect.bottom - rect.top;
              dx = rect.left;
              dy = rect.top;
          }
      }
  }
  return { width: width, height: height, dx: dx, dy: dy };
}

function getSelectionCoordinates(atStart) {
  const sel = window.getSelection();

  // check if selection exists
  if (!sel.rangeCount) return null;

  // get range
  let range = sel.getRangeAt(0).cloneRange();
  if (!range.getClientRects) return null;

  // get client rect
  range.collapse(atStart);

  let rect = range.getBoundingClientRect();

  // Detect if selection is backwards
  let isBackwards;
  try {
      let range = document.createRange();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      isBackwards = range.collapsed;
      range.detach();
  } catch (e) { console.log(e); }

  let coordsToReturn = { dx: rect.x, dy: rect.y, backwards: isBackwards, lineHeight: rect.height };
  var selectionHandleLineHeight = 25;
  var draggingHandleIndex, lastMouseUpEvent, ratesLastFetchedDate;

  if (rect.x == 0 && rect.y == 0) {
      let rectCoords = getSelectionRectDimensions();
      if (atStart)
          coordsToReturn = { dx: rectCoords.dx, dy: rectCoords.dy, backwards: isBackwards };
      else
          coordsToReturn = { dx: rectCoords.dx + rectCoords.width, dy: rectCoords.dy + rectCoords.height - (selectionHandleLineHeight - 7.5), backwards: isBackwards };
  }

  if (coordsToReturn.dx == 0 && coordsToReturn.dy == 0)
      coordsToReturn = { dx: lastMouseUpEvent.clientX, dy: lastMouseUpEvent.clientY - 8, backwards: isBackwards, dontAddDragHandles: true };

  return coordsToReturn;
}


function detectSelection(event) {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = "s";

    const range = selection.getRangeAt(0);
    const rect = range.getClientRects()[0]; 
    console.log("range: " + range)
    console.log("rect: " + rect)
    console.log(getSelectionCoordinates(true))
    // Center the tooltip horizontally within the selection rectangle
    const tooltipWidth = tooltip.offsetWidth;  // Get tooltip width after creation
    console.log("tooltip: " + tooltipWidth)

    const left = rect.left + (rect.width - tooltipWidth) / 2;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${rect.top + 10}px`;  // Add 10px for vertical offset

    // Append the tooltip to the document body
    document.body.appendChild(tooltip);

    // Optionally, remove the tooltip after a delay
    setTimeout(() => {
      tooltip.remove();
    }, 2000);
  }
}



document.addEventListener("selectionchange", detectSelection);
