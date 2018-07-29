import React, {Component} from 'react';

class Case extends Component {
    displayed = null;
    constructor(props) {
        super(props);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleRightClick(event) {
        event.preventDefault();
        this.props.onFlag();
    }

    render() {
        this.displayed = null;
        if (this.props.value === 'x') {
            this.displayed = <i className="fas fa-crosshairs"></i>;
        } else if (this.props.value > 0) {
            this.displayed = this.props.value;
        }
        return (
            <div className={"case " + this.props.status + (typeof this.displayed === 'number' ? " dis-" + this.displayed : "")} onClick={this.props.onReveal} onContextMenu={this.handleRightClick} >
                {this.props.status === 'revealed' && this.displayed}
            </div>
        );
    }
}

export default Case;