/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const mongoose = require('mongoose');

const formatSchema = new mongoose.Schema({
    name : {type : String, require: true}
});


module.exports = mongoose.model('Format', formatSchema);