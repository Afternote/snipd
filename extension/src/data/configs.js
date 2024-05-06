const configs = {
    'hideOnScroll': true,
    'useCustomStyle': false,
    'tooltipBackground': '#333232',
    'tooltipInvertedBackground': '#bfbfbf',
    'tooltipOpacity': 1.0,
    'addTooltipShadow': false,
    'shadowOpacity': 0.5,
    'borderRadius': 3,
    'shiftTooltipWhenWebsiteHasOwn': false,
    'addActionButtonsForTextFields': false,
    'removeSelectionOnActionButtonClick': true,
    'draggableTooltip': true,
    'enabled': true,
    'hideOnKeypress': true,
    'middleClickHidesTooltip': false,
    'secondaryTooltipEnabled': true,
    'secondaryTooltipIconSize': 16,
    'showSecondaryTooltipTitleOnHover': false,
    'buttonsStyle': 'onlylabel', 
    'addDragHandles': true,
    'snapSelectionToWord': true,
    'showButtonLabelOnHover': true,
    'animationDuration': 200,
    'wordSnappingBlacklist': '',
    'disableWordSnapForCode': true,
    'dontSnapTextfieldSelection': true,
    'tooltipRevealEffect': 'moveUpTooltipEffect', 
    'textSelectionBackgroundOpacity': 1.0,
    'updateRatesEveryDays': 18,
    'fontSize': 12.5,
    'maxIconsInRow': 5,
    'secondaryTooltipLayout': 'verticalLayout', /// Possible values: 'horizontalLayout', 'verticalLayout'
    'liveTranslation': true,
    'reverseTooltipButtonsOrder': false,
    'recreateTooltipAfterScroll': true,
    'applyConfigsImmediately': false,
    'invertColorOnDarkWebsite': true,
    'addPasteOnlyEmptyField': true,
    'hideTranslateButtonForUserLanguage': true,
    'showTranslateIfLanguageUnknown': true,
    'fullOpacityOnHover': true,
    'preferredTranslateService': 'google',
    'tooltipPosition': 'selectionCenter', /// Possible values: 'selectionCenter', 'overCursor'
    'floatingOffscreenTooltip': false,
    'showUpdateNotification': true,
    'convertResultClickAction': 'search', /// Possible values: 'copy', 'search'
    'delayToRevealSearchTooltip': 350,
    'delayToRevealTranslateTooltip': 550,
    'delayToRevealHoverPanels': 500,
    'showDictionaryButton': true,
    'showDotForHoverButtons': true,
    'collapseButtons': true,
    'addMarkerButton': true,
    'showStatsOnCopyButtonHover': true,
    'addFontFormatButtons': true,
    'showButtonBorders': true,
    'addClearButton': true,
    'leftClickBackgroundTab': false,
    'showTooltipArrow': true,
    'verticalLayoutTooltip': false,
    'addButtonToCopyLinkToText': true,
    'addCalendarButton': true,
    'hideTooltipWhenCursorMovesAway': true,
    'showInfoPanel': true,
    'maxTooltipButtonsToShow': 3,
    'maxMarkerPagesToStore': 10,
    'dictionaryButtonWordsAmount': 1,
    'dictionaryButtonResponseCharsAmount': 300,
    'correctTooltipPositionByMoreButtonWidth': true,
    'dragHandleStyle': 'circle', /// possible values: circle, triangle,
    'customSearchOptionsDisplay': 'hoverCustomSearchStyle', /// Possible values: 'hoverCustomSearchStyle', 'panelCustomSearchStyle'
    'customSearchButtons': [
        {
            'url': 'https://www.youtube.com/results?search_query=%s',
            'title': 'YouTube',
            // 'icon': 'https://icons-for-free.com/iconfiles/png/512/video+youtube+icon-1320192294490006733.png',
            'enabled': true
        },
        {
            'url': 'https://open.spotify.com/search/%s',
            'title': 'Spotify',
            // 'icon': 'https://image.flaticon.com/icons/png/512/2111/2111624.png',
            'enabled': true
        },
        {
            'url': 'https://aliexpress.ru/wholesale?catId=&SearchText=%s',
            'title': 'Ali (ru)',
            'icon': 'https://img.icons8.com/color/452/aliexpress.png',
            'enabled': true
        },
        {
            'url': 'https://www.aliexpress.com/wholesale?SearchText=%s',
            'title': 'Ali (en)',
            // 'icon': 'https://img.icons8.com/color/452/aliexpress.png',
            'enabled': false
        },
        {
            'url': 'https://www.amazon.com/s?k=%s',
            'title': 'Amazon',
            'icon': 'https://mapleleafdeals.com/wp-content/uploads/2020/08/amazon.png',
            'enabled': true
        },
        {
            'url': 'https://wikipedia.org/w/index.php?search=%s',
            'title': 'Wikipedia',
            // 'icon': 'https://pngimg.com/uploads/wikipedia/wikipedia_PNG16.png',
            'enabled': false
        },
        {
            'url': 'https://www.imdb.com/find?s=alt&q=%s',
            'title': 'IMDB',
            // 'icon': 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png',
            'enabled': false
        },
        {
            'url': 'https://google.com/search?q=site:%w %s',
            'title': 'Search on website',
            'enabled': false
        },
    ]
};