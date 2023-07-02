import React, { Component } from 'react';
import { trans } from './trans.js';
import './App.css';

class Smaranje extends Component {
    render() {
        var novoSmaranje = ( this.props.smaranje === 1 ) 
        ? "batali smaranje" 
        : "uključi smaranje";
        return (
                <button className="gornje-dugme Pismo"
                    onClick={this.props.promeniSmaranje}>
                    { trans(novoSmaranje, this.props.pismo) } 
                </button>
            );
    }
}

export default Smaranje;
