/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const Attribute = require('../models/attribute');

module.exports = {
    createAttribute(req, res){
        let attribute = new Attribute(req.body);
        attribute.save()
            .then(attribute=> res.json(attribute))
            .catch(err => res.status(500).json(err));
    },

    fetchAllAttributes(req, res){
        Attribute.find({})
            .then(attributes => res.json(attributes))
            .catch(err => res.status(500).json(err));
    }
};