'use strict';
const path = require('path');
const express = require('express');

const _resourceRouter = express.Router();
_resourceRouter.get( '*',
	function (req, res) {
		let tmp = path.join( res.app.get( 'jeffroot' ), req.path );
		console.log( 'jeffrey: request resource at ' + tmp );
		res.sendFile( tmp );
	}
);

const _downloadRouter = express.Router();
_downloadRouter.get( '*',
	function (req, res) {
		let tmp = path.join( res.app.get( 'jeffroot' ), 'download', req.path );
		console.log( 'jeffrey: request resource at ' + tmp );
		res.sendFile( tmp );
	}
);

const router = express.Router();

// get resource requested by page
router.use( '*/resource', _resourceRouter );

// get download requested by page
router.use( '*/download', _downloadRouter );

// get index page
router.get( '/home',
	function (req, res) {
		console.log( 'jeffrey: request index page' );
    	res.sendFile( path.join( res.app.get( 'jeffroot' ), 'page', 'index.html' ) );
	}
);

// get css learning index page
router.get( '/css/home',
	function (req, res) {
		console.log( 'jeffrey: request css learning index page' );
    	res.sendFile( path.join( res.app.get( 'jeffroot' ), 'page', 'css', 'index.html' ) );
	}
);

// get any page
router.get( /\/.+/,
	function (req, res) {
		let tmp = path.join( res.app.get( 'jeffroot' ), 'page', req.path );
		console.log( 'jeffrey: request page at ' + tmp );
		res.sendFile( tmp );
	}
);

module.exports = router;