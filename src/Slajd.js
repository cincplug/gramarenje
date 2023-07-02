import React, {Component} from 'react';
import { trans } from './trans.js';
import './App.css';

class Slajd extends Component {
    render() {
        return (this.props.jelOvaj) ? (
            <div className={ "Slajd slajd-" + this.props.koji }>
                <p className="tekst">{ trans(this.props.tekst, this.props.pismo) }</p>
                <span className="Dalje dugme" 
                    onClick={this.props.klikno}>
                    <span>{ trans(this.props.dugme, this.props.pismo) }</span>
                    <span className="strelica"></span>
                </span>
            </div>
        ) : null;
    }
}

export default Slajd;
