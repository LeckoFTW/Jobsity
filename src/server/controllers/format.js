/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const Format = require('../models/format');

module.exports = {
    createFormat(req, res){
        let format = new Format(req.body);
        format.save()
            .then(format => res.json(format))
            .catch(err => res.status(500).json(err));
    },

    fetchAllFormats(req, res){
        Format.find({})
            .then(formats => res.json(formats))
            .catch(err => res.status(500).json(err));
    }
};