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
const frontendServer = "http://192.168.0.15:3000/ryan/display"

/* GET Ryan page. */
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/ryan.html');
});

router.get('/display', function (req,res) 
{
    let requrl = new URL(req.url, `http://${req.headers.host}`);
    let urlparams = requrl.searchParams;
    let token = urlparams.get("access_token");


    
    //get auth code and exchange for access token then redirect

    //config for get request to get user data
    let config = {
        url: 'https://api.spotify.com/v1/me/player',
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        },
    };

    //sending request and getting response
    axios(config).
    then(function (response) {
        console.log(response.data.item.name);
        res.send(response.data.item.name);
    })
    .catch(error => {
        console.error(error);
    })

    


});

router.get("/spotify", function (req, res) {
    
    res.redirect(getAuthUrl(payload, AuthBaseUrl).toString());
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
                "50f9c65dd42847fba713f6506951ef00" + ':' + "0c1de1e3b11142bf8b077423c03755d8"
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

function getAuthUrl(dict, AuthBaseUrl) {
    var urlparam = querystring.stringify(dict);
    var authurl = AuthBaseUrl + urlparam;
    console.log(authurl);
    return authurl;
}


module.exports = router;