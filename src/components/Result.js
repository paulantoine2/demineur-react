import React, { Component } from 'react';

class Result extends Component {

    render() {
        return (
            <div className="result">
                <h2>You {this.props.result} !</h2>
                <button onClick={this.props.onValidate}>Retry</button>
            </div>
        );
    }

}

export default Result;