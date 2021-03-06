'use strict';
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('./logger-config');

function configure(app) {
    app.use(bodyParser.json({
        limit: '50mb',
        extended: true
    }));
    app.set('view engine', 'html');

    logger.debug('loading content routes using static path to dist directory');
    app.use(express.static(__base + 'build/'));

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    }));

    app.use(cookieParser());

    app.use(function(req, res, next) {
        res.locals.ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        next();
    });
}
module.exports = configure;