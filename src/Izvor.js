import React, { Component } from 'react';
import { trans } from './trans.js';
import './App.css';

class Izvor extends Component {
    render() {
        return (
            <div className="Izvor">
                {trans(this.props.izvor, this.props.pismo)}
            </div>
        );
    }
}
export default Izvor;
