import React, { Component } from 'react';
import './App.css';

class Znak extends Component {
    render() {
        var znak = this.props.val;
        if(znak === "#") {
            znak = <br/>;
        }
        return (
                <span className="Znak">
                    { znak }
                </span>
            );
    }
}

export default Znak;
