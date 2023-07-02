import React, { Component } from 'react';
import './App.css';

class Cifra extends Component {
    render() {
        var vel = (this.props.cifra + "").length;
        return (
            <div className={ "Cifra " + this.props.finansije + " vel-" + vel } key={ 'cf' + this.props.cifra }>
                <span>
                    { this.props.cifra }
                </span>
            </div>
            );
    }
}

export default Cifra;
