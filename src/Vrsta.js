import React, { Component } from 'react';
import Pitanje from './Pitanje';
import Crta from './Crta.js';
import { srediKlasu } from './utils.js';
import { trans } from './trans.js';
import './App.css';

class Vrsta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            klikno: false
        };
    }

    kliknoVrstu(tekst, jelTacno, kljuc) {
        if (this.props.fazon === 'izbor') {
            this.setState({
                klikno: true
            });
            this.props.kliknoVrstu(tekst, jelTacno);
        } else if (!this.props.jelOvaResena) {
            this.props.kliknoVrstu(tekst, jelTacno, kljuc);
        }
    }

    sledecaVrsta() {
        this.props.sledecaVrsta();
    }

    javiZaBravo() {
        this.props.javiZaBravo();
    }

    javiZaCifru(cifra) {
        this.props.javiZaCifru(cifra);
    }

    render() {
        var pitanje;
        if (
            this.props.fazon !== 'izbor' 
            && 
            (this.props.jelOvaAktivna || this.props.jelOvdeBio)
        ) {
            pitanje = (
                <Pitanje
                    key={'p' + this.props.mnozina + this.props.nivo}
                    vrstaMnozina={this.props.mnozina}
                    vrstaMnozinaAkuzativ={this.props.mnozinaAkuzativ}
                    vrstaDvojinaGenitiv={this.props.dvojinaGenitiv}
                    vrstaMnozinaGenitiv={this.props.mnozinaGenitiv}
                    vrstaJednina={this.props.jednina}
                    vrstaJedninaAkuzativ={this.props.jedninaAkuzativ}
                    jelOvaAktivna={this.props.jelOvaAktivna}
                    jelOvaResena={this.props.jelOvaResena}
                    jelOvdeBio={this.props.jelOvdeBio}
                    javiZaBravo={() => this.javiZaBravo()}
                    javiZaCifru={(cifra) => this.javiZaCifru(cifra)}
                    sledecaVrsta={() => this.sledecaVrsta()}
                    nivo={this.props.nivo}
                    fazon={this.props.fazon}
                    oblast={this.props.oblast}
                    pismo={ this.props.pismo }
                    nema={this.nema}
                />
            );
        } 

        var klasa =
            'Vrsta ' +
            srediKlasu(this.props.mnozina) +
            'a-dur-' +
            this.props.kljuc +
            ' ' +
            't-dur-' +
            this.props.kljuc +
            ' ';
        if (this.props.fazon === 'izbor') {
            klasa +=
                (this.state.klikno ? 'klikno ' : 'nijeKlikno ') +
                (this.props.jelTacno ? 'tacno ' : 'netacno ') +
                (this.props.tacnihVrsta < this.props.kolikoTrebaVrsta
                    ? 'dokTrajePrvi'
                    : 'gotovNivo');
        } else if (
            !this.props.mnozina ||
            this.props.fazon === 'akcenat' ||
            this.props.fazon === 'alter'
        ) {
            this.nemaNaslov = true;
            klasa += 'nemaNaslov';
        } else {
            klasa +=
                'dokTrajeDrugi ' +
                (this.props.jelOvaResena ? 'resena ' : 'josNijeResena ') +
                (this.props.jelOvaAktivna ? 'aktivna ' : 'neaktivna ') +
                (this.props.jelOvdeBio ? 'bio' : 'nijeBio');
        }
        var naslov = !this.nemaNaslov ? (
            <h2
                className="naslovVrste"
                onClick={ !this.state.klikno ? 
                    () => this.kliknoVrstu(
                        this.props.tekst,
                        this.props.jelTacno,
                        this.props.kljuc
                    ) : null
                }>

                <span className="tekst">
                    {trans(this.props.mnozina, this.props.pismo)}
                    <Crta/>
                </span>

            </h2>
        ) : null;
        var kvaka = this.props.jelOvaResena ?
        <div className="kvaka"></div> : null;

        return (
            <div className={klasa}>
                {naslov}
                {pitanje}
                {kvaka}
            </div>
        );
    }
}

export default Vrsta;
