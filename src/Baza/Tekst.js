import React, { Component } from 'react';

import '../App.css';


class Tekst extends Component {

    vidiStaPise(event) {
        this.props.vidiStaPise(event.target.value);
    }

    render() {

        return (
                <div>
                    <textarea id="Tekst" className="tekst"
                              value={ this.props.staPise }
                              onChange={ event => this.vidiStaPise(event) }
                              />
                </div>
                );

    }
}

export default Tekst;
