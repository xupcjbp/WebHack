'use strict';
var path = require('path');
var express = require('express');

var _resourceRouter = express.Router();

_resourceRouter.get( '*',
	function (req, res) {
		var tmp = path.join( res.app.get( 'jeffroot' ), req.path );
		console.log( 'jeffrey: request resource at ' + tmp );
		res.sendFile( tmp );
	}
);

var router = express.Router();

// get index page
router.get( '/',
	function (req, res) {
		console.log( 'jeffrey: request index page' );
    	res.sendFile( path.join( res.app.get( 'jeffroot' ), 'page', 'index.html' ) );
	}
);

// get any page
router.get( '.*/',
	function (req, res) {
		var tmp = path.join( res.app.get( 'jeffroot' ), 'page', req.path );
		console.log( 'jeffrey: request page at ' + tmp );
    	res.sendFile( tmp );
	}
);

// get resource requested by page
router.use( '*/resource/', _resourceRouter );


module.exports = router;