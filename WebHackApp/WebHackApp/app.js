'use strict';
// get all libraries
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// get all router middleware
var routes = require('./routes/index');
var users = require('./routes/users');
var jeffrouter = require( './routes/jeff-router' );


var app = express();

// view directory remapping setup
app.set( 'jeffroot', path.join( __dirname, 'jeffrey' ) );

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// hooking in router middleware first
app.use('/', routes);
app.use( '/jeffrey', jeffrouter );
app.use('/users', users);
app.use(express.static("public"));
app.use(express.static("views"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//serve jpeg file
app.get('/test', function (req, res) {
    console.log("hello");
    res.sendFile(path.join(__dirname + '/test.jpg'));
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


// command line 'q' to shut the server down
const readline = require("readline");
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
terminal.on( "line",
	function( action ) {
		if( String( action ) == "q" ) {
			process.exit( 0 )
		}
	}
);