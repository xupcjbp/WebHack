import React from 'react';
import './App.css';
import axios from "axios"

class RegularButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pressed: false };
    }

    render() {
        if (this.state.pressed) {
            return 'You pressed this.';
        }
        // Display a "Authorize" <button>
        return (
            <button onClick={()=> window.location = "http://192.168.0.15/ryan/spotify"}>
             Authorize
            </button>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            hasData: false,
            hasToken: false,
            userData: "",
            accessToken: "",
            tokenExpireIn: 0
        }
    }

    componentDidMount() {

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("access_token")) {
          //this.setState({accessToken: urlParams.get("access_token")});
          //this.setState({tokenExpireIn: urlParams.get("expires_in")});
          this.setState({hasToken: true});
          this.setState({accessToken: urlParams.get("access_token")})

          getLyrics(urlParams.get("access_token")).then((response)=>
          {
            
            this.setState({userData: processLyrics(response.data)});
            this.setState({hasData: true});
            }
          );
          
        }

    }

    render() {
        const hasToken = this.state.hasToken;
        const hasData = this.state.hasData;
        return(
            <div>
                {hasToken
                //display data and refresh button
                ?
                <div>
                    {hasData
                    ?<div>{this.state.userData}</div>
                    :<div>
                        <h1>Loading</h1>
                    </div>
                    }
                    <button onClick={()=> getLyrics(this.state.accessToken).
                        then((response)=>{
                            this.setState({userData: processLyrics(response.data)});
                    })}>refresh</button>
                </div>
                //display authorize button
                :<RegularButton></RegularButton>
                }
            </div>
        )        
    }
}
function processLyrics(lyrics){
    let newLyrics = lyrics.substr(lyrics.search("Done.")+5);
    newLyrics = newLyrics.replace(/\[/g, "+[");
    console.log(newLyrics.split("+")[2])
    return newLyrics;
}

function getLyrics(accessToken) {

  let config = {
    url: 'http://192.168.0.15/ryan/api',
    method: "get",
    params: {
      access_token: accessToken
    },
    headers: {
        Accept: "application/json"
    },

  };
  
  return axios(config)
  .catch(error => {
    console.error(error);
  })
}


export default App;