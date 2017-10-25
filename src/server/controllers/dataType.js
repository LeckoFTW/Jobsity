/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const DataType = require('../models/dataType');

module.exports = {
    createDataType(req, res){
        let dataType = new DataType({
            name : req.body.name
        });

        dataType.save()
            .then(dataType => res.json(dataType))
            .catch(error => res.status(500).json(error));
    },
    
    fetchAllDataTypes(req, res){
        DataType.find({})
            .then(dataTypes => res.json(dataTypes))
            .catch(error => res.status(500).json(error));
    }
};
