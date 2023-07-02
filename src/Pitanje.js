import React, { Component } from 'react';
import primeriFono from './json/primeriFono.json';
import primeriMorfo from './json/primeriMorfo.json';
import kategorijeFono from './json/kategorijeFono.json';
import mapa from './json/mapa.json';
import zadaciFono from './json/zadaciFono.json';
import zadaciMorfo from './json/zadaciMorfo.json';
import zadaciMorfoRodBroj from './json/zadaciMorfoRodBroj.json';
import zadaciMorfoPadez from './json/zadaciMorfoPadez.json';
import zadaciMorfoKonj from './json/zadaciMorfoKonj.json';
import alter from './json/alter.json';
import { maloPromešaj, kažiNekiBroj, izvuciNešto } from './utils.js';
import NaslovPitanja from './NaslovPitanja';
import TekstPitanja from './TekstPitanja';
import Odgovor from './Odgovor';
import Potpitanje from './Potpitanje';
import Izvor from './Izvor';
import './App.css';

class Pitanje extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kojiPrimer: 1,
            kolikoResioReci: 0,
            tacno: null,
            kolikoZavrsioPitanja: 0,
            potpitanje: null,
            jelZnaPotpitanje: null,
            zamena: 0
        };

        this.kolikoFiksno = 2;
        this.jelValja = this.jelValja.bind(this);
        this.vidiŠtaOće = this.vidiŠtaOće.bind(this);
        this.izdvojFono = this.izdvojFono.bind(this);
        this.jelZnaPotpitanje = this.jelZnaPotpitanje.bind(this);
        this.sledecePitanje = this.sledecePitanje.bind(this);
        this.zamena = this.zamena.bind(this);
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    componentWillMount() {
        if (this.props.oblast === 'fono') {
            let izdvojFono = this.izdvojFono();
            this.primeri = izdvojFono.primeri;
            this.indeksi = izdvojFono.indeksi;
            this.zadaci = zadaciFono;
            if (this.props.fazon === 'akcenat') {
                let r = [
                    'akcenat: ´',
                    'akcenat: `',
                    'akcenat: ⁀',
                    'akcenat: ‶'
                ];
                this.zadaciPoKriterijumu = maloPromešaj(r.concat(r));
            } else if (this.props.fazon === 'alter') {
                let r = [
                    'alter: )',
                    'alter: ∑',
                    'alter: #',
                    'alter: 0',
                    'alter: 1',
                    'alter: 2',
                    'alter: @',
                    'alter: X'
                ];
                this.zadaciPoKriterijumu = maloPromešaj(r);
            }
        } else {
            this.primeri = maloPromešaj(primeriMorfo);
            console.log(this.primeri.length);
            if(this.props.nivo === 9 || this.props.nivo === 10) {
                this.zadaci = zadaciMorfo;
            } else if (this.props.nivo === 11) {
                this.zadaci = zadaciMorfoRodBroj;
            } else if (this.props.nivo === 13) {
                this.zadaci = zadaciMorfoPadez;
            } else if (this.props.nivo === 15) {
                this.zadaci = zadaciMorfoKonj;
            }
        }

        if (!this.zadaciPoKriterijumu) {
            this.zadaciPoKriterijumu = this.zadaci[this.props.vrstaJednina];
        }

        this.vidiŠtaOće();
    }

    vidiŠtaOće(kojaZamena) {
        let i = this.state.kojiPrimer - 1;
        this.kolikoZadataka = this.zadaciPoKriterijumu.length;
        let zadatak = this.zadaciPoKriterijumu[i].split(': ');
        let kriterijum = {
            kategorija: zadatak[0],
            opcija: zadatak[1]
        };
        let primeriPoKriterijumu =
        (this.props.oblast === 'morfo') ?
        this.primeri.filter(
            primer =>
                primer['primer'].filter(rec => this.jelValja(rec, kriterijum)).length > 0
        )
        :
        this.primeri.filter(
            primer =>
                primer.filter(rec => this.jelValja(rec, kriterijum)).length > 0
        );

        let kolikoPrimera = primeriPoKriterijumu.length;

        var primer;
        let zamena = kojaZamena || this.state.zamena;
        if (this.props.fazon !== 'izbor') {
            if(zamena >= kolikoPrimera){
                zamena = 0;
            }
            if(this.props.oblast === 'fono') {
                primer = maloPromešaj(primeriPoKriterijumu)[zamena];
            }
            if(this.props.oblast === 'morfo') {
                if (this.props.fazon === 'kategorije') {
                    primer = primeriPoKriterijumu[zamena];
                }
                if (this.props.fazon === 'vrste') {
                    primer = izvuciNešto(primeriPoKriterijumu);
                }
            }
        }
        if (this.props.fazon === 'akcenat') {
            if (!this.indeksPrvog) {
                this.indeksPrvog = kažiNekiBroj(
                    0,
                    kolikoPrimera - this.kolikoFiksno - 1
                );
            } else {
                this.indeksPrvog++;
            }
            var indeks = this.primeri.indexOf(primer);
            if (indeks > -1 && this.indeksi[indeks].jelNaPrvomSlogu) {
                this.setState({
                    prviSlog: true
                });
            }
        }
        if (this.props.fazon === 'alter') {
            var koliko = primer.filter(r => r.svojstvo).length;
            if (koliko > 1) {
                var prohtev = alter.filter(a => a.znak === kriterijum.opcija)[0]
                    .ime;
                this.setState({
                    prohtev: prohtev
                });
            }
        }

        this.setState({
            kriterijum: kriterijum,
            primer: primer,
            kolikoPrimera: kolikoPrimera,
            zamena: zamena
        });
    }

    zamena(){
        this.setState({
            zamenio: true
        }, function(){
            this.props.javiZaCifru(-5);
            this.vidiŠtaOće(this.state.zamena + 1);
        });
    }

    izdvojFono() {
        var indeksi = [];
        var reči = [];
        var samoglasnici = /[aeiou]/g;
        for (var i = 0; i < primeriFono.length; i++) {
            var reč = primeriFono[i];
            var slova = [];
            var r = reč.split('');
            var io = 0;
            var jelNaPrvomSlogu = false;
            for (var ii = 0; ii < r.length; ii++) {
                var ključ = r[ii].toLowerCase();
                if (ii < r.length - 1) {
                    var slovo = reč.substr(ii, 2).toLowerCase();
                    if (slovo === 'lj' || slovo === 'nj' || slovo === 'dž') {
                        ključ = slovo;
                        ii++;
                        io++;
                    }
                    var svojstvo = reč.substr(ii + 1, 1);
                    if (
                        (this.props.fazon === 'akcenat' &&
                            (svojstvo === '´' ||
                                svojstvo === '`' ||
                                svojstvo === '⁀' ||
                                svojstvo === '‶')) ||
                        (this.props.fazon === 'alter' &&
                            (svojstvo === ')' ||
                                svojstvo === '∑' ||
                                svojstvo === '#' ||
                                svojstvo === '0' ||
                                svojstvo === '1' ||
                                svojstvo === '2' ||
                                svojstvo === '@' ||
                                svojstvo === 'X'))
                    ) {
                        ii++;
                    } else {
                        svojstvo = '';
                    }
                }
                var kojeSlovo = kategorijeFono[ključ.toLowerCase()];
                if (kojeSlovo) {
                    var ovo = Object.assign({}, kojeSlovo);
                    ovo['reč'] = ključ;

                    if (svojstvo) {
                        ovo['svojstvo'] = svojstvo;
                    } else {
                        if (
                            this.props.fazon === 'akcenat' &&
                            reč.substr(ii, 1).match(samoglasnici) &&
                            (ii === reč.length - 1 ||
                                !reč.substr(ii + 1).match(samoglasnici))
                        ) {
                            ovo['poslednjiSlog'] = true;
                        }
                    }
                    if (
                        this.props.fazon === 'akcenat' &&
                        reč.substr(io, 1).match(samoglasnici) &&
                        (io === 0 || !reč.substr(0, io).match(samoglasnici))
                    ) {
                        ovo['prviSlog'] = true;
                        if (svojstvo) {
                            jelNaPrvomSlogu = true;
                        }
                    }
                    slova.push(ovo);
                    svojstvo = '';
                }
                io++;
            }
            indeksi.push({
                jelNaPrvomSlogu: jelNaPrvomSlogu
            });
            reči.push(slova);
            jelNaPrvomSlogu = false;
            slova = [];
        }
        var autput = {
            primeri: reči,
            indeksi: indeksi
        };
        return autput;
    }

    jelValja(rec, kriterijum) {
        if (!kriterijum) {
            kriterijum = this.state.kriterijum;
        }
        var jelPripadaVrsti = rec['vrsta'] === this.props.vrstaJednina;
        switch (this.props.fazon) {
            case 'vrste':
                return jelPripadaVrsti;
            case 'akcenat':
            case 'alter':
                if (rec.svojstvo === kriterijum.opcija) {
                    return true;
                } else {
                    return false;
                }
            case 'kategorije':
                return (
                    rec[kriterijum.kategorija] === kriterijum.opcija &&
                    jelPripadaVrsti
                );
            default:
                return null;
        }
    }

    kliknoRec(rec) {
        this.setState(
            {
                tacno: rec.tacno,
                izabranaVrsta: rec.vrsta,
                izabranaOpcija: rec.izabranaOpcija,
                indeks: rec.indeks,
                poslednjiSlog: rec.poslednjiSlog,
                osobine: rec.osobine,
                zamenio: false
            },
            function() {
                if (rec.tacno) {
                    this.setState(
                        {
                            kolikoResioReci: this.state.kolikoResioReci + 1,
                            pravaOpcija: rec.svojstvo || null
                        },
                        function() {
                            if (
                                this.kolikoTakvihReci ===
                                this.state.kolikoResioReci
                            ) {
                                if (
                                    this.props.fazon === 'akcenat' ||
                                    (this.props.fazon === 'alter' &&
                                        !this.state.prohtev)
                                ) {
                                    this.potpitanje();
                                } else {
                                    this.sledecePitanje();
                                }
                            }
                        }
                    );
                    this.props.javiZaCifru(10);
                    if (this.props.jelOvdeBio) {
                        this.props.javiZaBravo();
                    }
                } else if (this.props.fazon === 'kategorije' || this.props.fazon === 'vrste') {
                    let ali = rec.izabranaOpcija
                        ? mapa[rec.kategorija + ':' + rec.izabranaOpcija][
                              'ali'
                          ] ||
                          mapa[rec.kategorija + ':' + rec.izabranaOpcija][
                              'ps'
                          ]
                        : mapa[rec.kategorija + ':' + rec.opcija][
                            'ali'
                        ] || 'ovde nije ' +
                            (mapa[rec.kategorija + ':' + rec.opcija][
                                'ps'
                            ] || rec.opcija);
                    this.setState({
                        ali: ali
                    });
                    this.props.javiZaCifru(-5);
                } else if (
                    this.props.fazon === 'alter' &&
                    this.state.prohtev &&
                    rec.svojstvo
                ) {
                    var mislio = alter.filter(a => a.znak === rec.svojstvo)[0]
                        .ime;
                    this.setState({
                        mislio: mislio
                    });
                    this.props.javiZaCifru(5);
                }
            }
        );
    }

    potpitanje() {
        this.setState({
            potpitanje: true
        });
    }

    jelZnaPotpitanje(p) {
        if (p.jelTacno) {
            this.props.javiZaCifru(10);
            this.setState(
                {
                    odgovorNaPotpitanje: null
                },
                function() {
                    this.sledecePitanje();
                }
            );
        } else {
            this.props.javiZaCifru(-5);
            this.setState({
                jelZnaPotpitanje: false,
                potpitanje: p,
                odgovorNaPotpitanje: p.znak
            });
        }
    }

    sledecePitanje() {
        var kolikoTreba =
            this.props.fazon === 'vrste'
                ? this.kolikoFiksno
                : this.kolikoZadataka;
        kolikoTreba--;
        if (this.state.kolikoZavrsioPitanja < kolikoTreba) {
            this.setState(
                {
                    kojiPrimer:
                        this.state.kojiPrimer === this.kolikoZadataka
                            ? 1
                            : this.state.kojiPrimer + 1,
                    kolikoResioReci: 0,
                    kolikoZavrsioPitanja: this.state.kolikoZavrsioPitanja + 1,
                    zamena: 0,
                    zamenio: null,
                    izabranaOpcija: null,
                    izabranaVrsta: null,
                    potpitanje: null,
                    jelZnaPotpitanje: null,
                    prohtev: null,
                    mislio: null,
                    bravo: null
                },
                function() {
                    this.vidiŠtaOće();
                }
            );
        } else {
            this.setState({
                bravo: true
            }, function(){
                var sledecaVrsta = this.props.sledecaVrsta;
                setTimeout(function() {
                    sledecaVrsta();
                }, 700);
            })
        }
    }

    render() {
        let primer = this.state.primer.primer || this.state.primer;
        let kriterijum = this.state.kriterijum;
        let i = this.state.kojiPrimer;
        var potpitanje;
        var odgovorNaPotpitanje;
        if (this.state.potpitanje) {
            var pravaOpcija =
                this.state.pravaOpcija ||
                this.state.primer.filter(s => s.svojstvo)[0].svojstvo;
            potpitanje = (
                <Potpitanje
                    pravaOpcija={pravaOpcija}
                    sledecePitanje={this.sledecePitanje}
                    jelZnaPotpitanje={this.jelZnaPotpitanje}
                    fazon={this.props.fazon}
                    pismo={ this.props.pismo }
                />
            );
            if (this.state.jelZnaPotpitanje === false) {
                odgovorNaPotpitanje = (
                    <Odgovor
                        jelTacno={false}
                        tekstKey={Math.random()}
                        fazon={this.props.fazon}
                        potpitanje={this.state.potpitanje}
                        jelZnaPotpitanje={this.state.jelZnaPotpitanje}
                        prviSlog={this.state.prviSlog}
                        pravaOpcija={this.state.pravaOpcija}
                        odgovorNaPotpitanje={this.state.odgovorNaPotpitanje}
                        pismo={ this.props.pismo }
                    />
                );
            }
        }
        let zamena =
        <div className="zamena" onClick={ this.zamena }>
            ↻
        </div>;
        if (primer) {
            var kategorija = kriterijum.kategorija;
            var opcija = kriterijum.opcija;
            this.kolikoTakvihReci = primer.filter(rec =>
                this.jelValja(rec, kriterijum)
            ).length;

            this.pitanje = (
               
                    <div>


                        <div
                            className={'Pitanje p-' + this.state.kojiPrimer +
                                (this.state.zamenio ? ' zamenio' : ' nije-zamenio') }
                            key={i + 'primer' + kategorija + opcija + ' ' + this.state.zamena}>
                            <NaslovPitanja
                                key={
                                    i +
                                    'naslovpitanja' +
                                    this.state.kojiPrimer +
                                    Math.random()
                                }
                                vrstaMnozina={this.props.vrstaMnozina}
                                vrstaMnozinaAkuzativ={this.props.vrstaMnozinaAkuzativ}
                                vrstaDvojinaGenitiv={this.props.vrstaDvojinaGenitiv}
                                vrstaMnozinaGenitiv={this.props.vrstaMnozinaGenitiv}
                                vrstaJednina={this.props.vrstaJednina}
                                vrstaJedninaAkuzativ={this.props.vrstaJedninaAkuzativ}
                                kojiPrimer={this.state.kojiPrimer}
                                kolikoResioReci={this.state.kolikoResioReci}
                                kolikoTakvihReci={this.kolikoTakvihReci}
                                i={i}
                                kategorija={kategorija}
                                opcija={opcija}
                                nivo={this.props.nivo}
                                fazon={this.props.fazon}
                                prohtev={this.state.prohtev}
                                pismo={ this.props.pismo }
                            />

                            <TekstPitanja
                                key={i + 'pitanje' + this.state.kojiPrimer}
                                vrstaJednina={this.props.vrstaJednina}
                                kliknoRec={rec => this.kliknoRec(rec)}
                                kojiPrimer={this.state.kojiPrimer}
                                jelValja={this.jelValja}
                                kolikoResioReci={this.state.kolikoResioReci}
                                primer={primer}
                                kolikoTakvihReci={this.kolikoTakvihReci}
                                sledecaVrsta={() => this.sledecaVrsta()}
                                kategorija={kategorija}
                                opcija={opcija}
                                nivo={this.props.nivo}
                                oblast={this.props.oblast}
                                fazon={this.props.fazon}
                                potpitanje={this.state.potpitanje}
                                pismo={ this.props.pismo }
                            />

                            { !this.state.zamenio
                                ?
                                    <Odgovor
                                        key={
                                            i +
                                            '-odg-' +
                                            primer.length +
                                            '-k-' +
                                            this.kolikoTakvihReci
                                        }
                                        vrstaJednina={this.props.vrstaJednina}
                                        jelTacno={this.state.tacno}
                                        izabranaVrsta={this.state.izabranaVrsta}
                                        izabranaOpcija={this.state.izabranaOpcija}
                                        jelOvdeBio={this.props.jelOvdeBio}
                                        kojiPrimer={this.state.kojiPrimer}
                                        kolikoResioReci={this.state.kolikoResioReci}
                                        kolikoTakvihReci={this.kolikoTakvihReci}
                                        kategorija={kategorija}
                                        opcija={opcija}
                                        osobine={ this.state.osobine }
                                        ali={this.state.ali}
                                        indeks={this.state.indeks}
                                        fazon={this.props.fazon}
                                        poslednjiSlog={this.state.poslednjiSlog}
                                        mislio={this.state.mislio}
                                        prohtev={this.state.prohtev}
                                        pismo={ this.props.pismo }
                                        bravo={this.state.bravo}
                                        zamena={this.state.zamena}
                                    />
                                :
                                null
                            }
                            {potpitanje}
                            {odgovorNaPotpitanje}
                            {zamena}
                        </div>
                        <Izvor izvor={this.state.primer.izvor}/>
                    </div>
                
                    );
        } else {
            this.pitanje =
                'e, fali ti ' +
                kriterijum.kategorija +
                ' ' +
                kriterijum.opcija;
        }
        return this.pitanje;
    }
}

export default Pitanje;
