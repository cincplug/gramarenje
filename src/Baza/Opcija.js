import React, { Component } from 'react';

import '../App.css';


class Opcija extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    biramOpciju(v) {
        this.props.biramOpciju(v);
    }

    render() {

        return (
                <button className="Opcija" 
                        onClick={ () => this.biramOpciju(this.props.opcija) }>
                    { this.props.opcija }
                </button>
                );
    }
}

export default Opcija;
