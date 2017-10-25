/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const dataTypeController = require('./controllers/dataType');
const categoryController = require('./controllers/category');
const formatController = require('./controllers/format');
const attributeController = require('./controllers/attribute');

module.exports = Router => {
    Router.route('/datatypes')
        .post(dataTypeController.createDataType)
        .get(dataTypeController.fetchAllDataTypes);

    Router.route('/categories')
        .post(categoryController.createCategory)
        .get(categoryController.fetchAllCategories);

    Router.route('/formats')
        .post(formatController.createFormat)
        .get(formatController.fetchAllFormats);

    Router.route('/attributes')
        .post(attributeController.createAttribute)
        .get(attributeController.fetchAllAttributes);

    Router.route('/attributes/bulk')
        .post(attributeController.saveAttributesList);
};