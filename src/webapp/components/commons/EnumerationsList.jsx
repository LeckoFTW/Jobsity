import React from 'react';
import {FontIcon} from 'material-ui';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const EnumerationsList = ({name, enumerations}) => (
    <div className={`attributeFieldContainer`}>
        <label>{name}:</label>
        <div>
            {enumerations.map((enumeration, index) => (
                <div className="enumValue" key={index}>
                    <span>{enumeration}</span>
                    <FontIcon className="material-icons" color={red500}>remove_circle</FontIcon>
                </div>
            ))}
        </div>
    </div>
);

export default EnumerationsList;