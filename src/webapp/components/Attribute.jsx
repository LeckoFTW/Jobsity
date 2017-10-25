import React, {Component} from 'react';
import Input from './commons/AttributeInput';
import NumberInput from './commons/NumberInput';
import Select from './commons/SelectField';
import InputFieldWithButton from './commons/InputFieldWithButton';
import EnumerationsList from './commons/EnumerationsList';
import {connect} from 'react-redux';
import {changeAttrFieldValue} from '../actions/attributeActions';
import {setTabsValid} from '../actions/tabsValidationActions';

@connect(({misc, attributes}) => ({misc, attributes}), {changeAttrFieldValue, setTabsValid})
export default class Attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracted: true,
            dtObject: false,
            attribute: props.attributes.find(a => a._id === props.attribute),
            nameValidationError : '',
            rangeValidationError : '',
            precisionValidationError : '',
            accuracyValidationError : ''
        };
    }

    expandAttribute() {
        this.setState({contracted: !this.state.contracted});
    }

    toggleExpandAttButton() {
        const {contracted} = this.state;
        if (contracted) return (
            <div className="expandButton">
                <div className="material-icons" onClick={this.expandAttribute.bind(this)}>expand_more</div>
            </div>
        );
        else return (
            <div className="expandButton">
                <div className="material-icons" onClick={this.expandAttribute.bind(this)}>expand_less</div>
            </div>
        );
    }

    renderExtraFields(attribute) {
        const {dataType, format, extraFields, _id} = attribute;
        const {misc, changeAttrFieldValue} = this.props;
        if (misc.dataTypes.length && misc.dataTypes.find(d => d._id === dataType).name === 'STRING') {
            if (misc.formats.length) {
                let formatObject = misc.formats.find(f => f._id === format);

                if (formatObject.name === 'NONE') {
                    return (
                        <div className="row">
                            <div className="col-md-6">
                                <InputFieldWithButton
                                    name="Enumerations"
                                    placeholder="Enter value"
                                    onChange={(enumeration) => changeAttrFieldValue(_id, 'extraFields', {
                                        enumerations: [...extraFields.enumerations, enumeration]
                                    })}
                                    className="attDescription"
                                />
                            </div>
                            <div className="col-md-6">
                                <EnumerationsList
                                    name="Values"
                                    enumerations={extraFields.enumerations}
                                />
                            </div>
                        </div>
                    );
                }
                else if (formatObject.name === 'NUMBER') return (
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <NumberInput
                                    name="Range"
                                    placeholder="Range Min"
                                    onChange={(e, min) => changeAttrFieldValue(_id, 'extraFields', {
                                        ...extraFields,
                                        min
                                    })}
                                    value={extraFields.min}
                                    required
                                    errMessage={this.state.rangeValidationError}
                                />
                            </div>
                            <div className="col-md-6">
                                <NumberInput
                                    placeholder="Range Max"
                                    onChange={(e, max) => changeAttrFieldValue(_id, 'extraFields', {
                                        ...extraFields,
                                        max
                                    })}
                                    value={extraFields.max}
                                    required
                                    errMessage={this.state.rangeValidationError}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Input
                                    name="Unit of Measurement"
                                    placeholder="UoM (eg. mm)"
                                    onChange={(e, unitOfMeasurement) => changeAttrFieldValue(_id, 'extraFields', {
                                        ...extraFields,
                                        unitOfMeasurement
                                    })}
                                    value={extraFields.unitOfMeasurement}
                                />
                            </div>
                            <div className="col-md-4">
                                <NumberInput
                                    name="Precision"
                                    placeholder="Precision (eg. 0.5)"
                                    onChange={(e, precision) => changeAttrFieldValue(_id, 'extraFields', {
                                        ...extraFields,
                                        precision
                                    })}
                                    value={extraFields.precision}
                                    required
                                    errMessage={this.state.precisionValidationError}
                                />
                            </div>
                            <div className="col-md-4">
                                <NumberInput
                                    name="Accuracy"
                                    placeholder="Accuracy (eg. 0.5)"
                                    onChange={(e, accuracy) => changeAttrFieldValue(_id, 'extraFields', {
                                        ...extraFields,
                                        accuracy
                                    })}
                                    value={extraFields.accuracy}
                                    required
                                    errMessage={this.state.accuracyValidationError}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        }

    }

    componentWillReceiveProps(nextProps){
        const {attributes, setTabsValid} = nextProps;
        const {attribute} = this.state;
        let tabsValid = true;
        if(attributes.find(a => a.name === '')){
            tabsValid = false;
        }else

        if(attributes.filter(a => a.name === attribute.name).length === 2){
            tabsValid = false;
            this.setState({nameValidationError: 'Name must be unique'});
        }else {
            this.setState({nameValidationError: ''});
        }

        if(attribute.format === '59ee85f36f8a2224b4676dfa' && attribute.dataType === '59ee5a5c883b111e02c789e1'){
            const {min , max, precision, accuracy} = attribute.extraFields;

            if(typeof min === 'number' && typeof max === 'number'){
                if(min>max){
                    tabsValid = false;
                    this.setState({rangeValidationError: 'Min must be lower than max'});
                }else {
                    this.setState({rangeValidationError: ''});
                    if(typeof precision !== 'number') tabsValid = false;
                    else if(precision > (max - min)){
                        tabsValid = false;
                        this.setState({precisionValidationError: `Precision must be lower than ${max - min}`});
                    }else {
                        this.setState({precisionValidationError: ''});
                    }
                    if(typeof accuracy !== 'number') tabsValid = false;
                    else if(accuracy > (max - min)){
                        tabsValid = false;
                        this.setState({accuracyValidationError: `Accuracy must be lower than ${max - min}`});
                    }else {
                        this.setState({accuracyValidationError: ''});
                    }
                }
            }else{
                tabsValid = false;
                this.setState({
                    accuracyValidationError: '',
                    precisionValidationError : ''
                });
            }


        }
        setTabsValid(tabsValid);
    }

    handleNameChange(e, name) {
        const {changeAttrFieldValue} = this.props;
        const {attribute: {_id}} = this.state;
        changeAttrFieldValue(_id, 'name', name);
    }

    handleDataTypeChange(e, index, dataType) {
        const {changeAttrFieldValue} = this.props;
        const {attribute: {_id, format}} = this.state;
        if (dataType === '59ee5a62883b111e02c789e2') {
            this.setState({dtObject: true});
            changeAttrFieldValue(_id, 'defaultValue', '');
            changeAttrFieldValue(_id, 'format', '59ee85e86f8a2224b4676df9');
            changeAttrFieldValue(_id, 'extraFields', {});
        } else {
            this.setState({dtObject: false});
            this.handleFormatChange(null, null, format);
        }
        changeAttrFieldValue(_id, 'dataType', dataType);
    }

    handleFormatChange(e, index, format) {
        const {changeAttrFieldValue} = this.props;
        const {attribute: {_id}} = this.state;

        if (format === '59ee85e86f8a2224b4676df9')
            changeAttrFieldValue(_id, 'extraFields', {enumerations: []});
        if (format === '59ee85f36f8a2224b4676dfa')
            changeAttrFieldValue(_id, 'extraFields', {
                min: "",
                max: "",
                unitOfMeasurement: "",
                precision: '',
                accuracy: ''

            });
        changeAttrFieldValue(_id, 'format', format);
    }

    render() {
        const {misc, attributes, changeAttrFieldValue,} = this.props;
        const attribute = attributes.find(attr => attr._id === this.props.attribute);
        const {contracted, dtObject} = this.state;

        return (
            <section className={`attributeContainer ${contracted ? 'contractedAttribute' : ''}`}>
                {this.toggleExpandAttButton()}
                <div className="removeAttrButton">
                    <i className="material-icons">delete_forever</i>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Input
                            name="Name"
                            placeholder="Enter a name"
                            onChange={this.handleNameChange.bind(this)}
                            value={attribute.name}
                            required
                            errMessage={this.state.nameValidationError}
                        />
                    </div>
                    <div className="col-md-9">
                        <Input
                            name="Description"
                            placeholder="Enter description for your new attribute"
                            onChange={(e, description) => changeAttrFieldValue(attribute._id, 'description', description)}
                            value={attribute.description}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Select
                            name="Device Resource Type"
                            onChange={() => console.log()}
                            items={[{value: 1, text: 'Default Value'}]}
                            placeholder="Default Value"
                            disabled
                        />
                    </div>
                    <div className="col-md-8">
                        <Input
                            name="Default Value"
                            placeholder="Enter a default value"
                            onChange={(e, defaultValue) => changeAttrFieldValue(attribute._id, 'defaultValue', defaultValue)}
                            value={attribute.defaultValue}
                            disabled={dtObject}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Select
                            name="Data Type"
                            onChange={this.handleDataTypeChange.bind(this)}
                            items={misc.dataTypes.map(d => ({value: d._id, text: d.name}))}
                            placeholder="Default Value"
                            value={attribute.dataType}
                        />
                    </div>
                    <div className="col-md-4">
                        <Select
                            name="Format"
                            onChange={this.handleFormatChange.bind(this)}
                            items={misc.formats.map(f => ({value: f._id, text: f.name}))}
                            placeholder="Default Value"
                            value={attribute.format}
                            disabled={dtObject}
                        />
                    </div>
                </div>
                {this.renderExtraFields(attribute)}

            </section>
        );
    }
}
