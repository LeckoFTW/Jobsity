const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://andres:andres@ds235065.mlab.com:35065/jobsity', {
   useMongoClient : true
}, err => {
    if(err) console.log(err);
    else console.log('database connection success!');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(webpackMiddleware(webpack(webpackConfig)));

const Router = express.Router();
require('./src/server/routes')(Router);
app.use('/api', Router);



app.listen(3001, err => console.log('done'));
