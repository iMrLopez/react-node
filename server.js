// ==================================================
// Initialize globals
// ==================================================
'use strict';
global.__base = __dirname + '/';

// ==================================================
// Load modules
// ==================================================
var express = require('express');
var app = express();
var server;
const cors = require('cors');
var enableDestroy = require('server-destroy');
var configuration = require(__base + 'server/configuration');
var routes = require(__base + '/server/routes');
var logger = configuration.logger;
var port = process.env.port || 8080;
app.use(cors({
    origin: [
        "*"
    ], credentials: true
}));

configuration.express(app);

app.use('/', routes);
logger.info("port");
logger.info(port);

// graceful shutdowns on ctrl-c
process.on('SIGINT', destroyServer);

function destroyServer() {
    logger.info('Received shutdown command on SIGINT');
    enableDestroy(server); // enabling http process destroyer
    server.destroy();
    server.close(function () {
        logger.info('exiting process... so long and thanks for all the fish');
        process.exit(0);
    });
}

function startServer() {
    logger.info('Starting the application on port ' + port + '...');
    server = app.listen(port, function () {
        logger.info('---- application started on port ' + port + '----');
    });
}


// ==================================================
// Start the app
// ==================================================
startServer();

module.exports = app;
