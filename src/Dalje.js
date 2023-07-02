import React, {Component} from 'react';
import { trans } from './trans.js';
import './App.css';

class Dalje extends Component {
    render() {
        return (
            <span className="Dalje"
                onClick={ this.props.klik }>
                <span>{trans(this.props.tekst || "Juriš!", this.props.pismo)}</span>
            </span>
        );
    }
}

export default Dalje;
