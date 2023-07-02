import React, { Component } from 'react';
import brojke from './json/brojke.json';
import mapa from './json/mapa.json';
import { završavaSeNa } from './utils.js';
import { trans } from './trans.js';
import './App.css';

class NaslovPitanja extends Component {

    componentWillMount() {
        if(this.props.fazon === 'akcenat') {
            this.podnaslov = "Gde je u ovoj reči akcenat?"
        } else if(this.props.fazon === 'alter') {
            if(this.props.prohtev) {
                this.podnaslov = "Gde je u ovoj reči " + this.props.prohtev + "?";
            } else {
                this.podnaslov = "Gde je došlo do glasovne promene?";
            }
        } else if (this.props.fazon !=='izbor' && this.props.kategorija !== 'vrsta') {
            var pre = '';
            var posle = '';
            var ap = '';
            this.kategorija = this.props.kategorija;
            var ženskiRod = završavaSeNa(this.props.vrstaJednina) === 'a';
            var mnozina;
            var kolikoSlovima = brojke[this.props.kolikoTakvihReci - 1];
            if (this.props.fazon === 'kategorije') {
                var stavka = mapa[this.props.kategorija + ":" + this.props.opcija];
                pre = stavka['pr'];
                posle = stavka['ps'];
                ap = stavka['ap'];
            } else {
                this.kategorija = null;
            }
            if (this.props.kolikoTakvihReci === 1) {
                if (pre) {
                    if (ženskiRod) {
                        pre = pre.replace(/e($| )/g, 'u$1');
                    } else {
                        pre = pre.replace(/e($| )/g, 'i$1');
                    }
                }
                if (ap) {
                    if (ženskiRod) {
                        ap = ap.replace(/e($| )/g, 'u$1');
                    } else {
                        ap = ap.replace(/e($| )/g, '$1');
                    }
                }
                this.podnaslov = <span>Nađi { pre } { this.props.vrstaJedninaAkuzativ } { ap || posle }</span>;
            }
            if (this.props.kolikoTakvihReci >= 2 && this.props.kolikoTakvihReci <= 4) {
                mnozina = this.props.vrstaDvojinaGenitiv || this.props.vrstaMnozinaGenitiv;
                if (ženskiRod) {
                    mnozina = this.props.vrstaMnozinaAkuzativ;
                    kolikoSlovima = kolikoSlovima.replace(/a($| )/g, 'e$1');
                } else if (pre) {
                    pre = pre.replace(/e($| )/g, 'a$1');
                } else if (ap) {
                    ap = ap.replace(/e($| )/g, 'a$1');
                }
                this.podnaslov = <span>Nađi { kolikoSlovima } { pre } { mnozina } { ap || posle }</span>;
            }
            if (this.props.kolikoTakvihReci >= 5) {
                mnozina = this.props.vrstaMnozinaGenitiv;
                if (pre) {
                    pre = pre.replace(/e($| )/g, 'ih$1');
                }
                if (ap) {
                    ap = ap.replace(/te($| )/g, 'ata$1');
                }
                this.podnaslov = <span>Nađi { kolikoSlovima } { pre } { mnozina } { ap || posle }</span>;
            }
        }
    }

    render() {
        var n = this.props.i + ". primer";
        if(this.props.fazon === 'kategorije') {
            if(mapa[this.props.kategorija] && mapa[this.props.kategorija].z) {
                n += " (" + mapa[this.props.kategorija].z + ")";
            } else if(this.props.kategorija) {
                n += " (" + this.props.kategorija + ")";
            }
        }
        var nadnaslov = trans(n, this.props.pismo);
        var podnaslov = trans(this.podnaslov, this.props.pismo);

        return (
                <h3 className="NaslovPitanja">
                    <div className="nadnaslov">
                        { nadnaslov }
                    </div>
                    <div className="podnaslov">
                        { podnaslov }
                    </div>
                </h3>
                );
    }
};


export default NaslovPitanja;
