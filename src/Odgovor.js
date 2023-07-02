import React, { Component } from 'react';
import brojke from './json/brojke.json';
import razlozi from './json/razlozi.json';
import { završavaSeNa, srediKlasu } from './utils.js';
import { trans } from './trans.js';
import './App.css';

class Odgovor extends Component {
    constructor(props) {
        super(props);
        this.nađiRazlog = this.nađiRazlog.bind(this);
    }

    nađiRazlog(štaMisli, štaTreba) {
        if (razlozi[štaMisli] &&
            razlozi[štaMisli][štaTreba]) {
            return razlozi[štaMisli][štaTreba];
        } else if (razlozi[štaTreba] &&
            razlozi[štaTreba][štaMisli]) {
            return razlozi[štaTreba][štaMisli];
        } else if (
            typeof razlozi[štaMisli] === 'string' &&
            typeof razlozi[štaTreba] === 'string'
        ) {
            return razlozi[štaMisli] + '#~#' + razlozi[štaTreba];
        } else if (typeof razlozi[štaTreba] === 'string') {
            return razlozi[štaTreba];
        } else if (typeof razlozi[štaMisli] === 'string') {
            return razlozi[štaMisli];
        } else {
            return null;
        }
    }

    složiRazlog(razlog, autput = []) {
        var r = razlog.split('#');
        if (autput.length > 1) {
            r.unshift('~');
        }
        for (var pasus in r) {
            var p = r[pasus];
            if (p === '~') {
                p = <span className="letvica" />;
            }
            autput.push(<p key={'rpasus' + pasus + Math.random()}>{p}</p>);
        }
        return autput;
    }

    render() {
        var tekst = '',
            još = '',
            bravo = '',
            razlog = '',
            kolikoJoš = this.props.kolikoTakvihReci - this.props.kolikoResioReci;

        var klasa;
        switch (this.props.fazon) {
            case 'akcenat':
                klasa = 'akcenat';
                break;
            case 'alter':
                klasa = 'alter';
                break;
            default:
                klasa = srediKlasu(this.props.izabranaVrsta || '');
                break;
        }

        if (this.props.jelTacno === true) {
            if (this.props.kolikoResioReci > 0 && !this.props.bravo) {
                tekst = (
                    <div className="status da">
                        <span className={klasa}>Tačno!</span>
                    </div>
                );
            } else if (this.props.kojiPrimer > 0 && !this.props.jelOvdeBio) {
                bravo = (
                    <div className={'bravo ' + klasa}>
                        <div className="inner">Bravo! Idemo dalje!</div>
                    </div>
                );
            }
        }

        if (this.props.jelTacno === false) {
            var status;
            if (
                this.props.izabranaOpcija !== this.props.opcija &&
                this.props.izabranaVrsta === this.props.vrstaJednina
            ) {
                if (this.props.fazon === 'kategorije') {
                    var ali = this.props.ali || this.props.izabranaOpcija;
                    status = (
                        <div>
                            <span>
                                Ne, to jeste {this.props.izabranaVrsta}, ali{' '}
                                {ali}.
                            </span>
                        </div>
                    );

                    if (this.props.izabranaOpcija) {
                        razlog = this.nađiRazlog(
                            this.props.izabranaOpcija,
                            this.props.opcija
                        );
                    } else if (this.props.kategorija) {
                        razlog = this.nađiRazlog(
                            this.props.kategorija,
                            this.props.opcija
                        );
                    } else {
                        razlog = this.nađiRazlog(
                            this.props.izabranaVrsta,
                            this.props.vrstaJednina
                        );
                    }
                }
                if (this.props.fazon === 'akcenat') {
                    status = (
                        <span>
                            {this.props.poslednjiSlog
                                ? 'Ne može da bude na poslednjem slogu'
                                : 'Nije tamo'}
                        </span>
                    );
                }
            } else {
                if (this.props.fazon === 'akcenat') {
                    if (this.props.potpitanje) {
                        if (
                            !this.props.prviSlog &&
                            (this.props.odgovorNaPotpitanje === '‶' ||
                                this.props.odgovorNaPotpitanje === '⁀')
                        ) {
                            status = (
                                <span>
                                    Nije {this.props.potpitanje.ime}
                                    <span className="osim">
                                        Silazni akcenti mogu da stoje samo na
                                        prvom slogu
                                    </span>
                                </span>
                            );
                        } else {
                            status = (
                                <span>Nije {this.props.potpitanje.ime}</span>
                            );
                        }
                    } else {
                        status = (
                            <span>
                                Ne može da bude na suglasniku
                                <span className="osim">
                                    (osim ponekad na slogotvornom "r")
                                </span>
                            </span>
                        );
                    }
                } else if (
                    this.props.fazon === 'alter' &&
                    this.props.potpitanje
                ) {
                    status = <span>Nije {this.props.potpitanje.ime}</span>;
                } else {
                    status = (
                        <div>
                            <span>
                                Ne, to je{' '}
                                <span className={'vrsta ' + klasa}>
                                    {trans(
                                        this.props.izabranaVrsta,
                                        this.props.pismo
                                    )}
                                </span>
                            </span>
                        </div>
                    );
                    razlog = this.nađiRazlog(
                        this.props.izabranaVrsta,
                        this.props.vrstaJednina
                    );
                }
            }
            if (
                this.props.fazon === 'alter' &&
                this.props.mislio &&
                this.props.prohtev
            ) {
                status = (
                    <span>
                        To nije {this.props.prohtev}
                        <span className="osim">
                            Ali jeste {this.props.mislio}, zato dobijaš 5 utešnih
                            dukata :)
                        </span>
                    </span>
                );
            }
            if (
                this.props.fazon === 'alter' &&
                !this.props.potpitanje &&
                !this.props.mislio
            ) {
                status = <span>Na tom glasu nema glasovne promene</span>;
            }
            tekst = (
                <div className="status ne">
                    {trans(status, this.props.pismo)}
                </div>
            );
        }

        if (kolikoJoš > 0 && this.props.kolikoResioReci > 0) {
            let kolikoSlovima = brojke[kolikoJoš - 1];
            if (završavaSeNa(this.props.vrstaJednina) === 'a') {
                if (kolikoJoš === 1) {
                    kolikoSlovima = 'jedna';
                } else if (kolikoJoš === 2) {
                    kolikoSlovima = 'dve';
                }
            }

            još = (
                <div className="jos" key={'jos' + this.props.kolikoResioReci}>
                    <span>{'Još ' + kolikoSlovima}</span>
                </div>
            );
        }

        if (razlog) {
            var autput = [];
            autput = this.složiRazlog(razlog);
            if (this.props.osobine) {
                if (this.props.osobine.osnova) {
                    autput = this.složiRazlog(razlozi['proširena'], autput);
                }
            }
            razlog = <div className="Razlog">{autput}</div>;
        }

        return (
            <div
                className="Odgovor"
                key={
                    this.props.tekstKey ||
                    'ot' +
                        this.props.indeks +
                        this.props.kojiPrimer +
                        this.props.odgovorNaPotpitanje +
                        this.props.izabranaOpcija ||
                    '' + this.props.opcija
                }>
                {tekst ?
                    <div className="tekst">
                        <div>{trans(tekst, this.props.pismo)}</div>
                    </div>
                : null}
                {trans(još, this.props.pismo)}
                {trans(razlog, this.props.pismo)}
                {trans(bravo, this.props.pismo)}
            </div>
        );
    }
}
export default Odgovor;
