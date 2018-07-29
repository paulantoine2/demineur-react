import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Grid from "./Grid";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 16,
            height: 16
        }
    }
    render() {
        let grid = <Grid width={this.state.width} height={this.state.height}/>;
        return (
            <div>
                {grid}
            </div>
        );
    }
}

export default App;
