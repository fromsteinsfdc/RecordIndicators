const REGEX = {
    API_NAME_PATTERN: /^(?![\d_])(?!\w*__)(?!\w*_$)(?=^[\w]+$)/,    // I think this is right... Must begin with a letter, can only contain letters/numbers/underscores, cannot end with an underscore, cannot contain 2 consecutive underscores
    API_MISMATCH_MESSAGE: `API Name can only consist of alphanumeric characters and underscores; must start with a letter; cannot contain 2 consecutive underscores; and cannot end with an underscore`
}

const VALIDATEABLE_COMPONENTS = ['input', 'lightning-input', 'lightning-combobox', 'lightning-checkbox', 'lightning-dual-listbox', 'lightning-radio-group', 'lightning-slider', 'c-object-selector', 'c-object-field-selector', 'c-combobox', 'c-lookup', 'c-expression-builder'];

const ICON_SOURCES = {
    SLDS_ICON: { label: 'Lightning Icon', value: 'sldsIcon' },
    STATIC_TEXT: { label: 'Static Text', value: 'staticText' },
    URL: { label: 'URL', value: 'url' },
    STATIC_RESOURCE: { label: 'Static Resource', value: 'staticResource' },
}

const getChangedValue = (event => {
    let target = event.target;
    if (target.tagName.toLowerCase() === 'lightning-input') {
        return target.type === 'checkbox' ? target.checked : target.value;
    } else {
        return event.detail && event.detail.value;
    }
});

const getApiNameFromLabel= (label => {        
    // Replace any non-alphanumeric characters with underscores, and remove any leading or trailing underscores
    let apiName = label.replace(/[^\da-zA-Z]+/g, '_').replace(/(^_+)|(_+$)/g, '');
    if (/^\d+/.test(apiName)) {
        apiName = 'X' + apiName;
    }
    return apiName;
});


export { REGEX, VALIDATEABLE_COMPONENTS, ICON_SOURCES, getChangedValue, getApiNameFromLabel }