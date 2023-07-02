import React, {Component} from 'react';
import { trans } from './trans.js';
import './App.css';

class Sertifikat extends Component {
    render() {
        return (
            <div className="iner">
                <div className="label">{trans("Imaš", this.props.pismo)}</div>
                <div className="label"><strong>{ this.props.cifra }</strong></div>
                <div className="label">{trans("dukata!", this.props.pismo)}</div>
            </div>
        );
    }
}

export default Sertifikat;
