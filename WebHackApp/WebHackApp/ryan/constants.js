module.exports = {
    clientid : process.env.SPOTIFY_CLIENT_ID,
    scopeList : ["user-read-currently-playing", "user-read-playback-state"],
    frontendServer : process.env.FRONTEND_SERVER_ADDRESS,
    payload : {
    "client_id": clientid, "response_type": "code",
    "redirect_uri": "http://192.168.0.9:1337/callback", "state": scopeList
    },
    AuthBaseUrl : "https://accounts.spotify.com/authorize?"
}