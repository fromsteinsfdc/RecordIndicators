import { LightningElement, api, track } from 'lwc';
import { REGEX, VALIDATEABLE_COMPONENTS, getChangedValue, getApiNameFromLabel } from 'c/indicatorUtils';

const FIELD_TYPE_CATEGORIES = {
    TEXT: ['Reference', 'Address', 'Email', 'Location', 'Phone', 'Picklist', 'ComboBox', 'MultiPicklist', 'String', 'TextArea', 'EncryptedString', 'URL'],
    NUMERIC: ['Currency', 'Number', 'Percent', 'Integer', 'Double', 'Int', 'Long'],
    DATE: ['Date', 'DateTime', 'Time'],
    BOOLEAN: ['Boolean'],
}

export default class IndicatorVariantBuilder extends LightningElement {
    @api indicator = {};    
    @api iconOptions = [];
    @api disabled = false;
    @track onRender = {};
    maxApiNameLength = 30;

    @api get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = { ...value };
    }
    _variant = {};

    get variantString() {
        return JSON.stringify(this.variant);
    }

    get iconSourceIs() {
        return { [this.variant.iconSource]: true }
    }

    get filterTypeIs() {
        let matchingOption = this.whenToDisplayOptions.find(option => option.value == this.variant.whenToDisplay);
        return matchingOption ? { [matchingOption.showMatch]: true } : {};
    }

    get showColourOption() {
        return this.iconSourceIs.sldsIcon;
    }
    get showColourSelectors() {
        return this.iconSourceIs.staticText || (this.showColourOption && this.variant.overrideColours);
    }

    iconSourceOptions = [
        { label: 'Lightning Icon', value: 'sldsIcon' },
        { label: 'Static Text', value: 'staticText' },
        { label: 'URL', value: 'url' },
        { label: 'Static Resource', value: 'staticResource' },
    ];

    connectedCallback() {
    }

    renderedCallback() {
        // if (this.onRender.validateApiName) {
        //     console.log(`validating api name`);
        //     this.template.querySelector('.apiName').reportValidity();
        //     this.onRender.validateApiName = false;
        // }
    }

    handleLabelChange(event) {
        // console.log(`in indicatorVariantBuilder handleLabelChange`);
        // console.log(`variant = ${JSON.stringify(this.variant)}; value = ${event.target.value}`);
        // this.variant.Label = event.target.value;
        this.handleVariantPropertyChange(event);        
        this.setApiNameFromLabel();
    }

    handleApiNameChange(event) {
        if (this.checkApiNamePattern(event.target.value, event.target) || !event.target.value) {
            // this.variant.DeveloperName = event.target.value;
            // this.updateVariant();
            this.handleVariantPropertyChange(event);
        }
    }

    handleVariantPropertyChange(event) {
        let property = event.currentTarget.dataset.property;
        if (property) {
            // let target = event.currentTarget;
            // let tagName = target.tagName.toLowerCase();
            // let value;
            // if (tagName === 'c-icon-selector') {
            //     value = event.detail;
            // } else if (target.type === 'checkbox') {
            //     value = target.checked;
            // } else if (tagName === 'lightning-combobox') {
            //     value = event.detail.value;
            // } else {
            //     value = target.value;
            // }
            // this.variant[target.dataset.property] = value;

            this.variant[property] = getChangedValue(event);
            if (property === 'iconSource') {
                this.variant.sourceValue = null;
            }

            this.updateVariant();
        }
    }

    checkApiNamePattern(apiName, target) {
        let meetsTest = REGEX.API_NAME_PATTERN.test(apiName);
        if (meetsTest) {
            target.setCustomValidity('');
        } else {
            target.setCustomValidity(REGEX.API_MISMATCH_MESSAGE);
        }
        return meetsTest;
    }

    getApiNameFromLabel(label) {        
        return getApiNameFromLabel(label);
        // // Replace any non-alphanumeric characters with underscores, and remove any leading or trailing underscores
        // let apiName = label.replace(/[^\da-zA-Z]+/g, '_').replace(/(^_+)|(_+$)/g, '');
        // if (/^\d+/.test(apiName)) {
        //     apiName = 'X' + apiName;
        // }
        // return apiName;
    }

    setApiNameFromLabel() {
        console.log(`in indicatorVariantBuilder setApiNameFromLabel`);
        if (!this.variant.DeveloperName) {
            this.variant.DeveloperName = this.getApiNameFromLabel(this.variant.Label);
            // this.template.querySelector('.apiName').reportValidity();
        }
        this.onRender.validateApiName = true;
        this.updateVariant();
    }

    updateVariant() {
        this.dispatchEvent(new CustomEvent('variantchange', { detail: this.variant }));        
    }

    @api validate() {
        
    }
}