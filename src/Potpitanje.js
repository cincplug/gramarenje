import React, { Component } from 'react';

import akcenti from './json/akcenti.json';
import alter from './json/alter.json';
import Dugme from './Dugme';
import { trans } from './trans.js';
import './App.css';

class Potpitanje extends Component {
    constructor(props) {
        super(props);
        this.klikno = this.klikno.bind(this);
    }

    klikno(p) {
        this.props.jelZnaPotpitanje(p);
    }
    render() {
        var kakav = [];
        var svojstva;
        var potpitanje;
        if(this.props.fazon === 'akcenat') {
            svojstva = akcenti;
            potpitanje = <div>I kakav je taj akcenat?</div>;
        }
        if(this.props.fazon === 'alter') {
            svojstva = alter;
            potpitanje = <div>A koja je to glasovna promena?</div>
        }
        for (var i = 0; i < svojstva.length; i++) {
            var svojstvo = svojstva[i];
            var ime = svojstvo.ime;
            var znak = svojstvo.znak;
            var jelTacno = (znak === this.props.pravaOpcija);
            kakav.push(
                <Dugme
                    key={'dg' + i}
                    ime={ime}
                    znak={znak}
                    i={i}
                    jelTacno={jelTacno}
                    klikno={this.klikno}
                    fazon={this.props.fazon}
                />
            );
        }

        return (
            <div className="Potpitanje">
                <div key={'pp'} className="NaslovPitanja">
                    { trans(potpitanje, this.props.pismo) }
                </div>
                <div>{trans(kakav, this.props.pismo)}</div>
            </div>
        );
    }
}
export default Potpitanje;
