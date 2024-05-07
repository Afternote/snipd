function addContextualButtons(callbackOnFinish) {
    if (configs.debugMode)
        console.log('Checking to add contextual buttons...');

    if (selection == null) return;

    // let selectedText = selection.toString().trim();
    const loweredSelectedText = selectedText.toLowerCase();
    const wordsCount = selectedText.split(' ').length;
    const selectionContainsSpaces = selectedText.includes(' ');
    const selectionLength = selectedText.length;
    let isFileName = false;

    if (convertWhenOnlyFewWordsSelected == false || wordsCount <= wordsLimitToProccessText) {
        let numberToConvert;

        /// Convert currency button
        if (configs.convertCurrencies) {
            let currency, amount, currencyRate, currencySymbol;
            let match = false;

            for (const [key, value] of Object.entries(currenciesList)) {
                if (selectedText.includes(' ' + key) || (value["currencySymbol"] !== undefined && selectedText.includes(value["currencySymbol"]))) {
                    if (configs.debugMode) console.log('found currency match for: ' + (selectedText.includes(key) ? key : value['currencySymbol']));
                    match = true;
                } else {
                    const currencyKeywords = value["currencyKeywords"];
                    if (currencyKeywords !== null && currencyKeywords !== undefined)
                        for (i in currencyKeywords) {
                            if (loweredSelectedText.includes(currencyKeywords[i])) {
                                if (configs.debugMode) console.log('found currency match for: ' + currencyKeywords[i]);
                                match = true;
                            }
                        }
                }

                if (match) {
                    currency = key;
                    currencyRate = value["rate"];
                    currencySymbol = value["currencySymbol"];

                    /// Special handling for prices where coma separates fractional digits instead of thousandths
                    if (selectedText.includes(',')) {
                        let parts = selectedText.split(',');
                        if (parts.length == 2) {
                            let queriedSecondPart = parts[1].match(/[+-]?\d+(\.\d)?/g);
                            if (queriedSecondPart && queriedSecondPart.join('').length < 3) {
                                selectedText = selectedText.replaceAll(',', '.');
                            }
                        }
                    }

                    /// Find the amount
                    amount = extractAmountFromSelectedText(selectedText);
                    break;
                }
            }

            if (currency !== undefined && currency !== configs.convertToCurrency && amount !== null && amount !== undefined) {

                /// Rates are already locally stored (should be initially)
                if (currencyRate !== null && currencyRate !== undefined) {
                    if (configs.debugMode) {
                        console.log(`Found rate for currency ${currency}: ${currencyRate}`);
                        console.log('User currency is: ' + configs.convertToCurrency);
                    }

                    const value = currenciesList[configs.convertToCurrency];
                    if (value && value['rate'] !== null && value['rate'] !== undefined) {

                        let rateOfDesiredCurrency = value['rate'];

                        /// Check for literal multipliers (million, billion and so on)
                        for (i in billionMultipliers) { if (loweredSelectedText.includes(billionMultipliers[i])) { amount *= 1000000000; break; } }
                        for (i in millionMultipliers) { if (loweredSelectedText.includes(millionMultipliers[i].toLowerCase())) { amount *= 1000000; break; } }
                        for (i in thousandMultipliers) { if (loweredSelectedText.includes(thousandMultipliers[i].toLowerCase())) { amount *= 1000; break; } }

                        let resultingRate = rateOfDesiredCurrency / currencyRate;
                        if (configs.debugMode) console.log('conversion rate: ' + resultingRate);
                        let convertedAmount = amount * resultingRate;

                        if (convertedAmount !== null && convertedAmount !== undefined && !isNaN(convertedAmount) && convertedAmount.toString() !== '') {
                            /// Round result
                            try {
                                convertedAmount = parseFloat(convertedAmount);
                                convertedAmount = convertedAmount.toFixed(2);
                            } catch (e) { console.log(e); }

                            /// Separate resulting numbers in groups of 3 digits
                            let convertedAmountString = convertedAmount.toString();
                            convertedAmountString = splitNumberInGroups(convertedAmountString);

                            /// Create and add currency button with result of conversion
                            const currencyButton = addContextualTooltipButton(function (e) {
                                let url = returnSearchUrl(`${amount + ' ' + currency} to ${configs.convertToCurrency}`);
                                onTooltipButtonClick(e, url, convertedAmountString + ` ${configs.convertToCurrency}`);
                            })

                            /// Show value before convertion
                            if (configs.showUnconvertedValue) {
                                if (configs.preferCurrencySymbol && currencySymbol !== undefined)
                                    currencyButton.textContent = ` ${amount} ${currencySymbol} →`;
                                else
                                    currencyButton.textContent = ` ${amount} ${currency} →`;
                            }

                            /// Show value after converion
                            const converted = document.createElement('span');
                            const currencySymbolToUse = currenciesList[configs.convertToCurrency]['currencySymbol'];

                            if (configs.preferCurrencySymbol && currencySymbolToUse !== undefined)
                                converted.textContent = ` ${convertedAmountString}`;
                            else
                                converted.textContent = ` ${convertedAmountString}`;

                            converted.classList.add('color-highlight');
                            currencyButton.appendChild(converted);

                            /// Add currency symbol with different color
                            const currencyLabel = document.createElement('span');
                            currencyLabel.textContent = ` ${configs.preferCurrencySymbol ? currencySymbolToUse : configs.convertToCurrency}`;
                            currencyLabel.style.color = 'var(--selection-button-foreground)';
                            currencyButton.appendChild(currencyLabel);
                        }
                    }
                }
            }
        }

        /// Unit conversion button
        if (configs.convertMetrics) {
            let convertedNumber, fromUnit, convertedUnit;

            /// Feet ' and inches " handling
            if (!selectionContainsSpaces && configs.preferredMetricsSystem == 'metric' && /['||"]/.test(selectedText))
                /// don't proccess if text includes letters
                if (!/[a-zA-Z]/g.test(selectedText))
                    if (selectedText.includes("'")) {
                        let feet, inches;
                        const parts = selectedText.split("'");
                        const partsL = parts.length;

                        if (partsL == 2 || partsL == 4) {
                            feet = extractAmountFromSelectedText(parts[0]);
                            inches = extractAmountFromSelectedText(parts[1].split('"')[0])
                        } else if (partsL == 1) {
                            /// Only feet available
                            feet = extractAmountFromSelectedText(parts[0]);
                        }

                        if (feet !== null) {
                            if (inches == null) inches = 0.0;
                            convertedNumber = (feet * convertionUnits['feet']['ratio'] * 100) + (inches * convertionUnits['inch']['ratio']);
                            fromUnit = '';
                            convertedUnit = 'cm';
                            numberToConvert = selectedText;
                        }

                    } else if (selectedText.includes('"')) {
                        /// Only inches are present
                        const parts = selectedText.split('"')

                        if (parts.length == 2) {
                            inches = extractAmountFromSelectedText(selectedText);
                            convertedNumber = inches * convertionUnits['inch']['ratio'];
                            fromUnit = '';
                            convertedUnit = 'cm';
                            numberToConvert = selectedText;
                        }
                    }

            /// Check for keywords in text
            let includesKeyword = false;
            const unitsKeywords = configs.preferredMetricsSystem == 'metric' ? convertionUnits : imprerialConvertionUnits;
            const unitKeys = Object.keys(unitsKeywords);

            for (let i = 0, l = unitKeys.length; i < l; i++) {
                const key = unitKeys[i];

                let nonConvertedUnit = key;
                if (selectedText.includes(nonConvertedUnit)) {
                    /// don't duplicate when found 'pound' (as it's also a currency)
                    if (nonConvertedUnit == 'pound' && tooltip.children.length == 4) return;
                    if (configs.debugMode) console.log('found key: ' + nonConvertedUnit);
                    includesKeyword = i; break;
                } else if (unitsKeywords[key]['variations']) {
                    const keyVariations = unitsKeywords[key]['variations'];

                    for (let i2 = 0, l2 = keyVariations.length; i2 < l2; i2++) {
                        if (selectedText.includes(keyVariations[i2])) {
                            if (configs.debugMode) console.log('found key: ' + keyVariations[i2]);
                            includesKeyword = i; break;
                        }
                    }
                }
            }

            /// Calculate value
            if (includesKeyword !== false) {
                /// Special handling for values where coma separates fractional digits instead of thousandths
                if (selectedText.includes(',')) {
                    let parts = selectedText.split(',');
                    if (parts.length == 2)
                        selectedText = selectedText.replaceAll(',', '.');
                }

                numberToConvert = extractAmountFromSelectedText(selectedText);

                if (numberToConvert !== null && numberToConvert !== '' && numberToConvert !== NaN && numberToConvert !== undefined) {
                    let key = unitKeys[includesKeyword];
                    let value = unitsKeywords[key];

                    /// Check selected text for literal multipliers
                    for (i in billionMultipliers) { if (loweredSelectedText.includes(billionMultipliers[i])) { numberToConvert *= 1000000000; break; } }
                    for (i in millionMultipliers) { if (loweredSelectedText.includes(millionMultipliers[i].toLowerCase())) { numberToConvert *= 1000000; break; } }
                    for (i in thousandMultipliers) { if (loweredSelectedText.includes(thousandMultipliers[i].toLowerCase())) { numberToConvert *= 1000; break; } }

                    fromUnit = key;
                    convertedUnit = value['convertsTo'];

                    if (fromUnit.includes('°')) {
                        convertedNumber = value['convertFunction'](numberToConvert);
                    } else {
                        convertedNumber = configs.preferredMetricsSystem == 'metric' ? numberToConvert * value['ratio'] : numberToConvert / value['ratio'];
                    }
                }
            }

            /// Show result button
            if (convertedNumber !== null && convertedNumber !== undefined && convertedNumber !== 0 && !isNaN(convertedNumber)) {
                /// Round doubles to the first 2 symbols after dot
                convertedNumber = convertedNumber.toFixed(2);

                /// Separate resulting numbers in groups of 3 digits
                convertedNumber = splitNumberInGroups(convertedNumber.toString());

                const convertButton = addContextualTooltipButton(function (e) {
                    let url = returnSearchUrl(`${numberToConvert + ' ' + fromUnit.trim()} to ${convertedUnit}`);
                    onTooltipButtonClick(e, url, `${convertedNumber} ${convertedUnit}`);
                });

                if (configs.showUnconvertedValue)
                    convertButton.textContent = numberToConvert + ' ' + fromUnit + ' →';

                const converted = document.createElement('span');
                converted.textContent = ` ${convertedNumber}`;
                converted.classList.add('color-highlight');
                convertButton.appendChild(converted);

                const unitLabelEl = document.createElement('span');
                unitLabelEl.textContent = ` ${convertedUnit}`;
                unitLabelEl.style.color = 'var(--selection-button-foreground)';
                convertButton.appendChild(unitLabelEl);
            }
        }

        /// Phone number button
        if (configs.addPhoneButton && !selectionContainsSpaces && selectedText[0] == '+' && selectionLength == 13) {
            const phoneButton = addContextualTooltipButton(function (e) {
                hideTooltip();
                removeSelectionOnPage();

                /// Open system handler
                window.open(`tel:${selectedText}`, '_self');
            });

            let phoneText = selectedText;

            if (configs.buttonsStyle == 'onlylabel') {
                let phoneSymbolsToShow = 8;
                phoneButton.textContent = chrome.i18n.getMessage('callLabel') + ' ';

                let phoneLabel = document.createElement('div');
                phoneLabel.style.display = 'inline';
                phoneLabel.textContent = phoneText.length > phoneSymbolsToShow ? phoneText.substring(0, phoneSymbolsToShow) + '...' : phoneText;
                phoneLabel.classList.add('color-highlight');

                /// Add tooltip with full text on hover
                if (phoneLabel.length > phoneSymbolsToShow)
                    phoneButton.setAttribute('title', phoneText);
                phoneButton.appendChild(phoneLabel);
            }
            else {
                phoneButton.appendChild(createImageIconForButton(phoneIcon, phoneText, true));
                phoneButton.classList.add('color-highlight');
            }
        }

        /// Perform simple math calculations
        if (numberToConvert == null && configs.performSimpleMathOperations && selectedText[0] !== '+' && !selectedText.includes('{')) {
            if (selectedText.includes('+') || selectedText.includes('-') || selectedText.includes('*') || selectedText.includes('^'))
                try {
                    let numbersFromString = selectedText.match(/[+-]?\d+(\.\d)?/g);

                    if (numbersFromString != null && numbersFromString.length > 0) {
                        let calculatedExpression = calculateString(selectedText.replaceAll(' ', '').replaceAll('}', ''));
                        if (calculatedExpression !== null && calculatedExpression !== undefined && calculatedExpression !== '' && calculatedExpression !== NaN) {

                            let number;
                            let numbersArray = calculatedExpression.toString().match(/[+-]?\d+(\.\d)?/g);
                            number = numbersArray[0];

                            if (number !== null) {
                                const mathButton = addContextualTooltipButton(function (e) {
                                    let url = returnSearchUrl(selectedText.replaceAll('+', '%2B'));
                                    onTooltipButtonClick(e, url, calculatedExpression);
                                });

                                if (configs.showUnconvertedValue)
                                    mathButton.textContent = selectedText + ' →';

                                const converted = document.createElement('span');
                                if (!configs.showUnconvertedValue) converted.textContent = '=';
                                converted.textContent += ` ${calculatedExpression}`;
                                converted.classList.add('color-highlight');
                                mathButton.appendChild(converted);
                            }
                        }
                    }
                } catch (e) {
                    if (configs.debugMode)
                        console.log(e);
                }
        }

        /// Add "open on map" button
        if (configs.showOnMapButtonEnabled) {
            let containsAddress = false;

            for (let i = 0, l = addressKeywords.length; i < l; i++) {
                if (loweredSelectedText.includes(addressKeywords[i])) {
                    containsAddress = true; break;
                }
            }

            if (containsAddress) {
                let mapButton = addContextualTooltipButton(function (e) {
                    /// Open maps service set by user (defaults to Google Maps)
                    let url = returnShowOnMapUrl(selectedText);
                    onTooltipButtonClick(e, url);
                });

                if (configs.buttonsStyle == 'onlyicon' && configs.showButtonLabelOnHover)
                    mapButton.setAttribute('title', showOnMapLabel);

                if (addButtonIcons)
                    mapButton.appendChild(createImageIconForButton(mapButtonIcon, configs.buttonsStyle == 'onlyicon' ? '' : showOnMapLabel));
                else
                    mapButton.textContent = showOnMapLabel;
            }
        }

        /// Add email button
        if (configs.showEmailButton && !selectionContainsSpaces && selectedText.includes('@')) {
            const splitedByAt = selectedText.split('@');
            if (splitedByAt.length == 2 && splitedByAt[1].includes('.'))
                try {
                    const emailText = loweredSelectedText;

                    const emailButton = addContextualTooltipButton(function (e) {
                        let url = returnNewEmailUrl(emailText);
                        onTooltipButtonClick(e, url);
                    })

                    if (configs.buttonsStyle == 'onlylabel') {
                        emailButton.textContent = chrome.i18n.getMessage('email') + ' ';

                        let emailLabel = document.createElement('div');
                        emailLabel.style.display = 'inline';
                        emailLabel.textContent = emailText.length > linkSymbolsToShow ? emailText.substring(0, linkSymbolsToShow) + '...' : emailText;
                        emailLabel.classList.add('color-highlight');

                        /// Add tooltip with full text on hover
                        if (emailText.length > linkSymbolsToShow)
                            emailButton.setAttribute('title', emailText);
                        emailButton.appendChild(emailLabel);
                    }
                    else {
                        emailButton.appendChild(createImageIconForButton(emailButtonIcon, (emailText.length > linkSymbolsToShow ? emailText.substring(0, linkSymbolsToShow) + '...' : emailText), true));
                        emailButton.classList.add('color-highlight');
                    }

                } catch (error) {
                    console.log(error);
                }
        }

        /// Add HEX color preview button
        if (configs.addColorPreviewButton) {
            if ((!selectionContainsSpaces && selectionLength == 7 && selectedText.includes('#')) ||
                (selectedText.includes('rgb') && selectedText.includes('('))) {
                try {
                    let colorText;
                    if (selectedText.includes('rgb')) {
                        /// Try to convert rgb value to hex
                        try {
                            let string = selectedText.toUpperCase().split('(')[1].split(')')[0];
                            let colors = string.replaceAll(' ', '').split(',');
                            for (i in colors) {
                                colors[i] = parseInt(colors[i], 10);
                            }
                            colorText = rgbToHex(colors[0], colors[1], colors[2]).toUpperCase();
                        } catch (e) {
                            colorText = selectedText.toUpperCase();
                        }
                    } else
                        colorText = selectedText.toUpperCase().replaceAll(',', '').replaceAll('.', '').replaceAll("'", "").replaceAll('"', '');

                    colorText = colorText.toLowerCase();

                    const colorButton = addContextualTooltipButton(function (e) {
                        console.log(colorText.replaceAll('#', '%23'));

                        let url = returnSearchUrl(colorText.replaceAll('#', '%23'), false);
                        onTooltipButtonClick(e, url, colorText);
                    })

                    // const colorButton = document.createElement('button');
                    // colorButton.setAttribute('class', 'selection-popup-button button-with-border');

                    const colorCircle = document.createElement('div');
                    colorCircle.setAttribute('class', 'selection-popup-color-preview-circle');
                    colorCircle.style.background = colorText;
                    colorCircle.style.marginRight = '4.5px';

                    /// Add red/green/blue tooltip on hover
                    const rgbColor = hexToRgb(colorText);
                    colorButton.setAttribute('title', `red: ${rgbColor.red}, green: ${rgbColor.green}, blue: ${rgbColor.blue}`);

                    colorButton.appendChild(colorCircle);
                    colorButton.insertAdjacentHTML('beforeend', ' ' + (colorText.length > linkSymbolsToShow ? colorText.substring(0, linkSymbolsToShow) + '...' : colorText));
                    colorButton.classList.add('color-highlight');

                } catch (error) {
                    console.log(error);
                }
            }
        }

        
        /// Calendar button for dates
        if (configs.addCalendarButton)
            checkToAddCalendarButton(selectedText);

       
    }

    const containsSpecialSymbols = /[`#$^*_+\\[\]{};|<>\/~]/.test(selectedText) || isFileName || (selectionLength == 1 && /[,.()]/.test(selectedText));
    const contextButtonWasAdded = tooltip.children[3];

    /// Add hover buttons when enabled, and no other contextual buttons were added
    if (configs.showTranslateButton && !containsSpecialSymbols && !contextButtonWasAdded) {
        addTranslateButton(addFinalButtons, selectionLength);
    } else addFinalButtons();

    function addFinalButtons() {

        /// Add dictionary button
        if (configs.showDictionaryButton && !containsSpecialSymbols && !contextButtonWasAdded && wordsCount <= configs.dictionaryButtonWordsAmount) {
            addDictionaryButton(selectionLength);
        }

        
        /// Add button to copy link to selected text
        if (configs.addButtonToCopyLinkToText) {
            const copyTextLinkBtn = addBasicTooltipButton(chrome.i18n.getMessage('linkToTextLabel'), linkIcon, function () {
                let urlWithText = window.location.href + '#:~:text=' + encodeURIComponent(selectedText);
                copyManuallyToClipboard(urlWithText);
                removeSelectionOnPage();
            });
            copyTextLinkBtn.title = chrome.i18n.getMessage('linkToTextDescription');
        }

        
        /// Set info panel & title for the Copy button
        setCopyButtonTitle(copyButton, selectionLength, wordsCount);

        callbackOnFinish();
    }
}