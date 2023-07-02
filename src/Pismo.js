import React, { Component } from 'react';
import './App.css';

class Pismo extends Component {
    render() {
        var novoPismo = ( this.props.pismo === "ћирилица") 
        ? "пређи на латиницу" 
        : "pređi na ćirilicu";
        return (
                <button className="gornje-dugme Pismo"
                    onClick={this.props.promeniPismo}>
                    { novoPismo } 
                </button>
            );
    }
}

export default Pismo;
