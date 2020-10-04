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
    if (newRequest.readyState == 4 && newRequest.status == 200) {
        console.log(newRequest.responseText);
    }
};
newRequest.open("GET", "http://localhost:3000/users", true);
newRequest.send("hi")

