/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(PORT, err => console.log(`app running at http://localhost:${PORT}`));
