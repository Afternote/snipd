var secondaryColor = 'lightBlue';
var selectionHandleLineHeight = 25;
var addToCollectionLabel = 'Add to collection +';

var selection, selectedText;
var tooltip, secondaryTooltip, arrow, infoPanel, searchButton, verticalSecondaryTooltip;
var tooltipIsShown = false, dontShowTooltip = false, isDraggingTooltip = false, isDraggingDragHandle = false, isDarkTooltip = true;
var draggingHandleIndex, lastMouseUpEvent, ratesLastFetchedDate;
var firstButtonBorderRadius = '3px 0px 0px 3px', lastButtonBorderRadius = '0px 3px 3px 0px', onlyButtonBorderRadius = '3px';
var tooltipOnBottom = false, configsWereLoaded = false, currencyRatesWereLoaded = false, isTextFieldFocused = false;
var isTextFieldEmpty = true, domainIsBlacklistedForSnapping, selectedTextIsCode, addButtonIcons;
var timerToRecreateOverlays, delayToRecreateOverlays = 150;
var floatingTooltipTop = false, floatingTooltipBottom = false;