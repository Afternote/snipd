function detectSelection() {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      // Create the tooltip element
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip'); // Add a CSS class for styling (optional)
      tooltip.textContent = selection.toString(); // Set tooltip content
  
      // Position the tooltip near the selection
      const range = selection.getRangeAt(0);
      const rect = range.getClientRects()[0]; // Get bounding rectangle of selection
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.top + window.scrollY}px`;
  
      // Append the tooltip to the document body
      document.body.appendChild(tooltip);
  
      // Optionally, remove the tooltip after a delay
      setTimeout(() => {
        tooltip.remove();
      }, 2000); // Remove tooltip after 2 seconds (adjust as needed)
    }
  }
  
  document.addEventListener('selectionchange', detectSelection);
  