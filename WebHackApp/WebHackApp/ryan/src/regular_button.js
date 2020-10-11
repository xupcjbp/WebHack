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
        //display like
        return (
            <button onClick={() => this.setState({ liked: true })}>
              Like
            </button>
          );
    }
}


const domContainer = document.querySelector('#regular_button_container');
ReactDOM.render(e(RegularButton), domContainer);

const element = <button>Primary</button>
ReactDOM.render(element, document.getElementById('test_button_container'));



