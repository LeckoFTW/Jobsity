/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const Category = require('../models/category');

module.exports = {
    createCategory(req, res){
        let category = new Category(req.body);
        category.save()
            .then(category => res.json(category))
            .catch(err => res.status(500).json(err));
    },

    fetchAllCategories(req, res){
        Category.find({})
            .then(categories => res.json(categories))
            .catch(err => res.status(500).json(err));
    }


};