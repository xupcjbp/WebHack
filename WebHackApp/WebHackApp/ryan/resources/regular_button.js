'use strict';

const e = React.createElement; //import axios from "axios";

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from "querystring";

class RegularButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  render() {
    if (this.state.pressed) {
      return 'You pressed this.';
    } // Display a "Like" <button>


    return /*#__PURE__*/React.createElement("button", {
      onClick: () => window.location = "http://192.168.0.15/ryan/spotify"
    }, "Like");
  }

}

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      hasData: false,
      userData: {}
    };
  }

  componentDidMount() {
    let parsedQuery = querystring.parse(window.location.search);
    console.log(parsedQuery); //let songName = parsedQuery.item.name;
  }

  render() {
    const hasData = this.state.hasData;
    return /*#__PURE__*/React.createElement("div", null, hasData //display data
    ?
    /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Display Data Here")) //display button
    :
    /*#__PURE__*/
    React.createElement(RegularButton, null, "Test"));
  }

}

function sendRequest() {
  const requestUrl = "/spotify";
  fetch(requestUrl).then(response => response.json()).then(data => console.log('This is the data', data));
}

function DisplayData(props) {
  const isData = props.isData;

  if (isData) {
    return /*#__PURE__*/React.createElement("h1", null, "Display Data Here");
  }

  return /*#__PURE__*/React.createElement(RegularButton, null, "Test");
}

const dataElement = document.getElementById("spotify_data_container");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), dataElement);