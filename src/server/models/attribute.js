/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    name : {type : String, require: true},
    description : {type : String, require: true},
    device : {type : String, default : ''},
    defaultValue : {type : String, default: ''},
    dataType : {type : mongoose.Schema.Types.ObjectId, ref : 'DataType'},
    category : {type : mongoose.Schema.Types.ObjectId, ref : 'Category'},
    format : {type : mongoose.Schema.Types.ObjectId, ref : 'Format'},
    extraFields : {type : Object}

});

module.exports = mongoose.model('Attribute', attributeSchema);

/*
*   {
*       name : "Nombre",
*       description : "Nombre del usuario",
*       defaultValue : "Andres"
*
*
* */