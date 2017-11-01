/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies delclaration */
/* React */
import React from 'react';
/* Material design */
import { FontIcon } from 'material-ui';
import { red500 } from 'material-ui/styles/colors';

const EnumerationsList = ({ name, enumerations, onDeleteEnum }) => (
  <div className={`attributeFieldContainer`}>
    <label>{name}:</label>
    <div>
      {enumerations.map((enumeration, index) => (
        <div className="enumValue" key={index}>
          <span>{enumeration}</span>
          <FontIcon
            className="material-icons"
            color={red500}
            onClick={() => onDeleteEnum(enumeration)}
          >remove_circle</FontIcon>
        </div>
      ))}
    </div>
  </div>
);

export default EnumerationsList;
