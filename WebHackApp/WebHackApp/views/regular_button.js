'use strict';

const e = React.createElement;

class RegularButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pressed: false };
    }

    render() {
        if (this.state.pressed) {
            return 'You pressed this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ pressed: true }) },
            'press'
        );
    }
}


const domContainer = document.querySelector('#regular_button_container');
ReactDOM.render(e(RegularButton), domContainer);

const newRequest = new XMLHttpRequest();
newRequest.onreadystatechange = function (){
    if (XPathResult.status != 200) {
        alert(`Error ${newRequest.status}: ${newRequest.statusText}`);
    }
    else{
        console.log(newRequest.responseText);
    }
};
newRequest = open("http://localhost:3000/users", true);
console.log("hello");
newRequest.send("hi")

