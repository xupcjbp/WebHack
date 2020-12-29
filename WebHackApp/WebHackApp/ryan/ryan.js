'use strict';
const express = require('express');
const router = express.Router();
const url = require('url');
//const constants = require('./constants');
var querystring = require('querystring');
const axios = require("axios"); 
const {spawn} = require("child_process");

//constants
const clientid = process.env.SPOTIFY_CLIENT_ID;
const scopeList = ["user-read-playback-state" , "user-read-playback-state"];
const payload = {
    "client_id": clientid, "response_type": "code",
    "redirect_uri": "http://192.168.0.15/ryan/callback", "scope": scopeList
};
const AuthBaseUrl = "https://accounts.spotify.com/authorize?";
const frontendServer = "http://192.168.0.15:3000";

let currentToken = {access_token: "", expires_in: 0};
let songInfo = {title: "", artist: ""};


/* GET Ryan home page. */
router.get('/home', function (req, res) {
    res.render(__dirname + '/ryan.js');
});

/* handle api calls given access token*/
router.get('/api', function (req,res) 
{
    currentToken.access_token = req.query.access_token;
    function getLyrics(song, artist){
        let process = spawn("python",
        ["./ryan/lyricsearch.py", song.toLowerCase(), artist.toLowerCase()]
            );
        process.stdout.on("data", function(data) {
            console.log("Output from python script")
            console.log(data.toString());
            res.send(data.toString());
        });
        process.on("error", function(){
            console.log("script error");
        })
        process.on("close", (code) => {
            console.log("python script closed");
        })
    }
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
            songInfo.title = response.data.item.name;
            songInfo.artist = response.data.item.artists[0].name
            getLyrics(songInfo.title, songInfo.artist);
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
            redirect_uri: "http://192.168.0.15/ryan/callback",
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