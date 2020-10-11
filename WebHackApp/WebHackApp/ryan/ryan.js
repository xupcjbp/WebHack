'use strict';
const express = require('express');
const router = express.Router();
const url = require('url');
//const constants = require('./constants');
var querystring = require('querystring')
const axios = require("axios"); 

//constants
const clientid = process.env.SPOTIFY_CLIENT_ID;
const scopeList = ["user-read-playback-state" , "user-read-playback-state"];
const payload = {
    "client_id": clientid, "response_type": "code",
    "redirect_uri": "http://192.168.0.15:3000/ryan/callback", "scope": scopeList
};
const AuthBaseUrl = "https://accounts.spotify.com/authorize?";
const frontendServer = "http://192.168.0.15:3000/ryan/display";

let currentToken = {access_token: "", expires_in: 0};




/* GET Ryan home page. */
router.get('/home', function (req, res) {
    res.sendFile(__dirname + '/ryan.html');
});

router.get('/display', function (req,res) 
{
    let requrl = new URL(req.url, `http://${req.headers.host}`);
    let urlparams = requrl.searchParams;
    currentToken.access_token = urlparams.get("access_token");
    currentToken.expires_in = urlparams.get("access_token");


    
    //get auth code and exchange for access token then redirect

    //config for get request to get user data
    let config = {
        url: 'https://api.spotify.com/v1/me/player',
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + currentToken.access_token
        },
    };

    //sending request and getting response
    axios(config).
    then(function (response) {
        if (response.status == 200) {
            console.log(response.data.item.name);
            res.send(response.data.item.name);
        }
        else {
            res.send("status code = " + response.status);
        }
        
    })
    .catch(error => {
        console.error(error);
    })

    


});

router.get("/spotify", function (req, res) {
    if (currentToken.access_token == "") {
        res.redirect(getAuthUrl(payload, AuthBaseUrl).toString());
        
    }
    else {
        let newUrl = frontendServer +"?"+ querystring.stringify(currentToken);
        res.redirect(newUrl);
    }
    res.end();
});

router.get("/callback", function (req, res) {

    let requrl = new URL(req.url, `http://${req.headers.host}`);
    //get auth code and exchange for access token then redirect

    let urlparams = requrl.searchParams;
    let code = urlparams.get("code");
    //console.log(code);

    //config for post request to get access token
    let config = {
        url: 'https://accounts.spotify.com/api/token',
        method: "post",
        params: {
            code: code,
            redirect_uri: "http://192.168.0.15:3000/ryan/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
    };

    //post request
    axios(config).
    then(function (response) {
        //auto redirect to frontend server with access token
        
        let newUrl = frontendServer +"?"+ querystring.stringify(response.data);
        //console.log(response.data.access_token);
        
        res.redirect(newUrl);
    })
    .catch(error => {
        console.error(error);
    })

})

router.get(/\/.+/, function (req, res) {
    res.sendFile(__dirname + "/resources"+ req.path);
});

function getAuthUrl(dict, AuthBaseUrl) {
    var urlparam = querystring.stringify(dict);
    var authurl = AuthBaseUrl + urlparam;
    console.log(authurl);
    return authurl;
}


module.exports = router;