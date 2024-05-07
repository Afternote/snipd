function addBasicTooltipButtons(layout) {
  searchButton = addBasicTooltipButton(
    addToCollectionLabel,
    function (e) {
      let selectedText = selection.toString();
      onTooltipButtonClick(e, returnSearchUrl(selectedText.trim()));
    },
    true
  );
}
