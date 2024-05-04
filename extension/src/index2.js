function initConfigs(shouldCreateTooltip = false, e) {
  const userSettingsKeys = Object.keys(configs);

  chrome.storage.local.get(
    userSettingsKeys, function (loadedConfigs) {
      configs.enabled = loadedConfigs.enabled ?? true;
;

      if (configs.enabled) {
        
        const keys = Object.keys(configs);
        for (let i = 0, l = keys.length; i < l; i++) {
          try {
            let key = keys[i];
            if (loadedConfigs[key] !== null && loadedConfigs[key] !== undefined)
              configs[key] = loadedConfigs[key];
          } catch (e) {
            console.log('Selecton failed to restore config: ' + keys[i].toString());
            console.log('Error: ' + e.toString());
          }
        }

        if (configs.animationDuration < 0) configs.animationDuration = 0;

        addButtonIcons = configs.buttonsStyle == 'onlyicon' || configs.buttonsStyle == 'iconlabel';
        verticalSecondaryTooltip = configs.secondaryTooltipLayout == 'verticalLayout';

        if (configs.debugMode) {
          console.log('Loaded Selecton settings from memory:');
          console.log(configs);
        }

        if (configsWereLoaded == false) {
          setTimeout(function () {
            if (configs.addActionButtonsForTextFields)
              initMouseListeners();
            else {
              document.addEventListener('selectionchange', selectionChangeInitListener);
            }

            if (configs.addMarkerButton)
              initMarkersRestore();
          }, 1);

          configsWereLoaded = true;

        }

        if (shouldCreateTooltip)
          createTooltip(e);
      }
    });
}



function setDocumentStyles(){
  /// Set font-size
  document.documentElement.style.setProperty('--selecton-font-size', `${configs.useCustomStyle ? configs.fontSize : 12.5}px`);

  /// styles of tooltip button icon
  document.documentElement.style.setProperty('--selecton-button-icon-height', `${configs.fontSize * 1.35}px`);

  /// Set border radius
  document.documentElement.style.setProperty('--selecton-border-radius', `${configs.useCustomStyle ? configs.borderRadius : 3}px`);

  /// pop-up buttons border
  document.documentElement.style.setProperty('--selecton-button-border-left', configs.reverseTooltipButtonsOrder ? 'none' : '1px solid var(--selection-button-background-hover)');
  document.documentElement.style.setProperty('--selecton-button-border-right', configs.reverseTooltipButtonsOrder ? '1px solid var(--selection-button-background-hover)' : 'none');

  /// pop-up inner and button inner paddings
  document.documentElement.style.setProperty('--selecton-tooltip-inner-padding', '2px');

  switch (configs.buttonsStyle) {
    case 'onlylabel': {
      document.documentElement.style.setProperty('--selecton-button-padding', '4px 10px');
    } break;
    case 'onlyicon': {
      document.documentElement.style.setProperty('--selecton-button-padding', '3px 10px');
    } break;
    case 'iconlabel': {
      document.documentElement.style.setProperty('--selecton-button-padding', '3px 8px');
    } break;
    default: {
      document.documentElement.style.setProperty('--selecton-button-padding', '4px 10px');
    } break;
  }

  /// selection handle circle radius
  document.documentElement.style.setProperty('--selecton-handle-circle-radius', '12.5px');

  /// search tooltip icon size
  document.documentElement.style.setProperty('--selecton-search-tooltip-icon-size', `${configs.secondaryTooltipIconSize}px`);

  /// Anim duration
  document.documentElement.style.setProperty('--selecton-anim-duration', `${configs.animationDuration}ms`);
}




function initMouseListeners() {
  document.addEventListener("mousedown", function (e) {
    if (isDraggingTooltip || isDraggingDragHandle) return;
    if (tooltipIsShown == false) return;

    if (e.button == 0) {
      if (isTextFieldFocused)
        hideTooltip();

      /// Remove text selection when clicked on link, to prevent creating new tooltip over link
      try {
        if (document.elementFromPoint(e.clientX, e.clientY).tagName == 'A') removeSelectionOnPage();
      } catch (e) { }
    }
  });

  document.addEventListener("mouseup", function (e) {
    if (!configs.enabled) return;
    if (isDraggingTooltip) return;

    /// Don't recreate tooltip when some text selected on page — and user clicked a button
    const activeEl = document.activeElement;
    if (activeEl.tagName == 'BUTTON') return;

    setTimeout(function () {
      if (e.detail == 3) hideDragHandles(false);

      /// Get page selection
      selection = window.getSelection();
      selectedText = selection.toString().trim();

      /// Fix for recreating tooltip when clicked on <a> link with active text selection on the screen
      try {
        if (activeEl.tagName == 'A') {
          let selectionNode = selection.focusNode.parentNode;
          if (selectionNode !== activeEl && selectionNode.parentNode !== activeEl) return;
        }
      } catch (e) { }

      if (selectedText.length > 0) {
        /// create tooltip for selection
        setCssStyles();
        initTooltip(e);
      } else {
        /// no selection on page - check if textfield is focused to create 'Paste' tooltip
        if (configs.addActionButtonsForTextFields && isTextFieldFocused) {
          setCssStyles();
          initTooltip(e);
        }
      }

    }, e.detail == 3 ? 200 : 0) /// special handling for triple mouse click (paragraph selection)
  });

  function setCssStyles() {
    if (configs.debugMode)
      console.log('--- Creating Selecton tooltip ---');

    /// Check page to have dark background
    setTimeout(function () {
      let isDarkPage = false;

      if (configs.invertColorOnDarkWebsite)
        try {
          const anchornode = selection.anchorNode;
          if (anchornode)
            isDarkPage = checkSelectionToHaveDarkBackground(anchornode);
        } catch (e) { }

      /// Set css styles
      if (configs.useCustomStyle) {
        /// Custom style from settings
        const bgColor = isDarkPage ? configs.tooltipInvertedBackground : configs.tooltipBackground;
        document.documentElement.style.setProperty('--selecton-background-color', bgColor);
        // document.documentElement.style.setProperty('--selecton-background-color', 'rgba(0,0,0,0.5)');
        getTextColorForBackground(bgColor);

        document.documentElement.style.setProperty('--selection-button-foreground', isDarkTooltip ? 'rgb(255,255,255)' : 'rgb(0,0,0)');
        document.documentElement.style.setProperty('--selection-button-background-hover', isDarkTooltip ? 'rgba(255,255,255, 0.3)' : 'rgba(0,0,0, 0.5)');
        document.documentElement.style.setProperty('--selecton-outline-color', isDarkTooltip ? 'rgba(255,255,255, 0.2)' : 'rgba(0,0,0, 0.2)');
        document.documentElement.style.setProperty('--selecton-info-panel-color', isDarkTooltip ? 'rgba(255,255,255, 0.7)' : 'rgba(0,0,0, 0.7)');
        secondaryColor = isDarkTooltip ? 'lightBlue' : 'royalBlue';
      } else {
        /// Default style
        document.documentElement.style.setProperty('--selecton-background-color', isDarkPage ? '#bfbfbf' : '#333232');
        document.documentElement.style.setProperty('--selection-button-foreground', isDarkPage ? '#000000' : '#ffffff');
        document.documentElement.style.setProperty('--selection-button-background-hover', isDarkPage ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)');
        document.documentElement.style.setProperty('--selecton-outline-color', isDarkPage ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)');
        document.documentElement.style.setProperty('--selecton-info-panel-color', isDarkPage ? 'rgba(0,0,0, 0.7)' : 'rgba(255,255,255, 0.7)');
        secondaryColor = isDarkPage ? 'royalBlue' : 'lightBlue';
        isDarkTooltip = !isDarkPage;
      }

      /// Invert buttons icons when dark tooltip
      document.documentElement.style.setProperty('--selecton-button-icon-invert', `invert(${isDarkTooltip ? '100' : '0'}%)`);

      /// Accent color for convert result buttons
      document.documentElement.style.setProperty('--selecton-secondary-color', secondaryColor);
    }, 0);
  }

  function initTooltip(e) {
    if (configs.applyConfigsImmediately) {
      initConfigs(true, e); 
    } else {
      createTooltip(e);
    }

    /// Listener to hide tooltip when cursor moves away
    if (configs.hideTooltipWhenCursorMovesAway && configs.tooltipPosition == 'overCursor') {
      window.addEventListener('mousemove', mouseMoveToHideListener);
    }

  }

  try {
    window.addEventListener('popstate', function () {
      hideTooltip();
      hideDragHandles();
      if (configs.debugMode) console.log('Selecton tooltip was hidden on url change');
    });
  } catch (error) {
    if (configs.debugMode)
      console.log(error);
  }

  /// Hide tooltip on scroll
  document.addEventListener('wheel', hideOnScrollListener);
  document.addEventListener('scroll', hideOnScrollListener);

  function hideOnScrollListener(e) {
    if (isDraggingDragHandle)
      hideDragHandles(true, true);

    if (tooltipIsShown == false) return;

    if (configs.floatingOffscreenTooltip) /// dont hide tooltip if it's floating
      if (floatingTooltipTop != false) {
        if (window.scrollY >= floatingTooltipTop) return;
      } else if (floatingTooltipBottom != false) {
        if (window.scrollY <= floatingTooltipBottom) return;
      }

    hideTooltip(false);
    hideDragHandles(false);
    recreateTooltip();
  }

  /// Hide tooltip on window resize
  window.addEventListener('resize', function (e) {
    if (tooltipIsShown == false) return;

    if (configs.debugMode)
      console.log('hiding all Selecton overlays on window resize...');

    hideTooltip(false);
    hideDragHandles(false);
    recreateTooltip();
  });

  /// Hide tooltip when any key is pressed
  if (configs.hideOnKeypress)
    document.addEventListener("keydown", function (e) {
      if (tooltipIsShown == false) return;
      if (e.key == 'Control') return;
      if (e.shiftKey) return;

      hideTooltip();
      hideDragHandles();
    });

  if (configs.debugMode)
    console.log('Selection initiated mouse listeners');

  setDocumentStyles();
}

function recreateTooltip() {
  if (configs.recreateTooltipAfterScroll == false) return;

  if (timerToRecreateOverlays !== null) {
    clearTimeout(timerToRecreateOverlays);
    timerToRecreateOverlays = null;
  }

  timerToRecreateOverlays = setTimeout(function () {
    if (window.getSelection) {
      selection = window.getSelection();
    } else if (document.selection) {
      selection = document.selection.createRange();
    }

    if ((selection !== null && selection !== undefined && selection.toString().trim().length > 0)) {
      createTooltip(lastMouseUpEvent, true);
    }
  }, 650);
}

function selectionChangeInitListener() {
  if (!configs.enabled) return;
  if (document.getSelection().toString().length < 1) return;
  document.removeEventListener('selectionchange', selectionChangeInitListener);

  try {
    initMouseListeners();
  } catch (e) {
    if (configs.debugMode)
      console.log('Error while setting Selecton mouse listeners: ' + e);
  }
}


initConfigs(false);