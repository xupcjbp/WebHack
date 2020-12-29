'use strict';

const e = React.createElement;
//import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom';
import querystring from "querystring";

class RegularButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pressed: false };
    }

    render() {
        if (this.state.pressed) {
            return 'You pressed this.';
        }
        // Display a "Like" <button>
        return (
            <button onClick={()=> window.location = "http://192.168.0.15/ryan/spotify"}>
             Like
            </button>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            hasData: false,
            userData: {}
        }
    }

    componentDidMount() {
        let parsedQuery = querystring.parse(window.location.search);
        console.log(parsedQuery.name);
        //let songName = parsedQuery.item.name;

    }

    render() {
        const hasData = this.state.hasData;
        return(
            <div>
                {hasData
                //display data
                ?<div><h1>Display Data Here</h1></div>
                //display button
                :<RegularButton>Test</RegularButton>
                }
            </div>
        )
        
    }

}



function sendRequest() {
    const requestUrl = "/spotify";
    fetch(requestUrl)
    .then((response)=>response.json())
    .then((data) => console.log('This is the data', data));
}

function DisplayData(props) {
    const isData = props.isData;
    if (isData) {
        return <h1>Display Data Here</h1>
    }
    return <RegularButton>Test</RegularButton>;
}

const dataElement = document.getElementById("spotify_data_container");
ReactDOM.render(
<App></App>,
    dataElement
    )


