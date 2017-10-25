/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const mongoose = require('mongoose');

const dataTypeSchema = new mongoose.Schema({
   name : {type : String}
});

module.exports = mongoose.model('DataType', dataTypeSchema);