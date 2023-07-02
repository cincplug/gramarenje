import React, { Component } from 'react';
import { srediKlasu } from './utils.js';
import { trans } from './trans.js';
import Crta from './Crta.js';
import './App.css';

class Dugme extends Component {
    componentWillMount() {
        this.setState({
            klikno: false
        });
    }

    klikno() {
        this.props.klikno(this.props);
        this.setState({
            klikno: true
        });
    }
    render() {
        var klasa =
            'Rec Dugme pridev ' +
            srediKlasu(this.props.ime) +
            ' ' +
            (this.state.klikno ? 'klikno' : 'nijeKlikno') +
            ' ' +
            (this.props.jelTacno ? 'tacno' : 'netacno') +
            ' ';
        var vrstaAkcenta = (this.props.fazon === 'akcenat') ?
            <span className="vrsta-akcenta">
                <span className="opacitet">{this.props.znak}</span>
            </span>
            :
            null;
            var ime = trans(this.props.ime, this.props.pismo);

        return (
            <div
                className={klasa}
                onClick={() => this.klikno()}>

                <span className="tekst">
                    <span className="opacitet">{ime}</span>
                    <Crta/>
                </span>
                { vrstaAkcenta }

            </div>
        );
    }
}
export default Dugme;
