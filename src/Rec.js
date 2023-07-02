import React, { Component } from 'react';
import { srediKlasu } from './utils.js';
import { trans } from './trans.js';
import Znak from './Znak';
import Crta from './Crta.js';
import './App.css';

class Rec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            klikno: false
        };
    }
    kliknoRec(rec) {
        if (!this.props.potpitanje && !this.state.klikno) {
                this.props.kliknoRec(rec);
            this.setState({
                klikno: true
            });
        }
    }
    render() {
        var farba;
        switch (this.props.fazon) {
            case 'akcenat':
                farba = 'akcenat';
                break;
            case 'alter':
                farba = 'alter';
                break;
            default:
                farba = srediKlasu(this.props.vrsta);
                break;
        }
        var klasa =
            'Rec ' +
            farba +
            ' ' +
            this.props.fazon +
            ' ' +
            ' a-dur-' +
            this.props.indeks +
            ' ' +
            (this.props.potpitanje ? 'disejblovano' : 'aktivno') +
            ' ' +
            (this.state.klikno ? 'klikno' : 'nijeKlikno') +
            ' ' +
            this.props.izabranaOpcija +
            ' ' +
            (this.props.tacno ? 'tacno' : 'netacno') +
            ' ' +
            (this.props.svojstvo ? 'imaSvojstvo' : 'nemaSvojstvo') +
            ' ' +
            (this.props.poslednjiSlog
                ? 'jePoslednjiSlog'
                : 'nijePoslednjiSlog') +
            ' ' +
            (this.props.prviSlog ? 'jePrviSlog' : 'nijePrviSlog') +
            ' ' +
            (this.props.jePregled && this.props.vrstaPregled === this.props.vrsta ? 'pregled' : 'nijePregled') +
            ' ' +
            (this.props.znak ? 'imaZnak' : 'nemaZnak');
        var svojstvo = this.props.svojstvo ? (
            <span className="svojstvo">{this.props.svojstvo}</span>
        ) : null;

        var znak = [];
        var z = this.props.znak;
        for (var i = 0; i < z.length; i++) {
            if (z[i].match(/[(„]/g)) {
                znak.push(
                    <span key={'rpr' + i + this.props.k} className="razmak">
                        {' '}
                    </span>
                );
            }
            znak.push(
                <Znak key={'rcz' + i + this.props.k} val={this.props.znak[i]} />
            );
            if (
                !z[i].match(/[(„]/g) &&
                (
                    (i < z.length - 1 &&
                        !z[i + 1].match(/[)”]/g)
                    ) ||
                    i === z.length - 1
                )

            ) {
                znak.push(
                    <span key={'rpr' + i + this.props.k} className="razmak">
                        {' '}
                    </span>
                );
            }
        }

        return (
            <span className="r-sp" data-rec={this.props.val}>
                <span
                    className={klasa}
                    onClick={() => this.kliknoRec(this.props)}>
                    <span className="tekst">
                        <span className="opacitet">
                            {trans(this.props.val, this.props.pismo)}
                        </span>
                        {svojstvo}
                        <Crta />
                    </span>
                </span>
                {znak}
            </span>
        );
    }
}

export default Rec;
