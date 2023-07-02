import React, { Component } from 'react';

import primeri from '../json/primeriMorfo.json';
import Tekst from './Tekst';
import Rec from './Rec';
import Izvoz from './Izvoz';
import FileSaver from 'file-saver';
import '../App.css';

class Baza extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staPise: 'Da li se poslednje četiri godine zapravo nisu ni dogodile?',
            izvoz: [],
            vrsta: {
                reč: null,
                vrsta: null
            },
            opcija: {
                kategorija: null,
                opcija: null
            },
            izvor: '',
            uzrast: ''
        };
        this.konvertuj = this.konvertuj.bind(this);
        this.vidiStaPise = this.vidiStaPise.bind(this);
        this.vidiIzvor = this.vidiIzvor.bind(this);
        this.vidiUzrast = this.vidiUzrast.bind(this);
        this.imamoVrstu = this.imamoVrstu.bind(this);
        this.imamoOpciju = this.imamoOpciju.bind(this);
    }

    vidiStaPise(staPise) {
        this.setState({
            staPise: staPise
        });
    }

    vidiIzvor(event) {
        this.setState({
            izvor: event.target.value
        });
    }

    vidiUzrast(event) {
        this.setState({
            uzrast: event.target.value
        });
    }

    imamoVrstu(ključ, reč, vrsta) {
        this.setState({
            vrsta: {
                ključ: ključ,
                reč: reč,
                vrsta: vrsta
            },
            novo: false
        }, this.izvoz);
    }

    imamoOpciju(ključ, kategorija, opcija) {
        this.setState({
            opcija: {
                ključ: ključ,
                kategorija: kategorija,
                opcija: opcija
            },
            novo: false
        }, this.izvoz);
    }

    izvoz() {
        let reči = (this.state.reči || []).slice();
        let uvoz = (this.state.novo) ? [] : this.state.izvoz;
        if (!this.state.vrsta.vrsta && this.state.novo) {
            for (var i = 0; i < reči.length; i++) {
                let reč = reči[i].props;
                uvoz.push((reč.reč) ? {
                    'reč': reč.reč,
                    'vrsta': reč.vrsta
                } : reč.children);
            }
        }
        let vrsta = this.state.vrsta;
        if (vrsta.reč) {
            uvoz[vrsta.ključ] = {
                'reč': vrsta.reč,
                'vrsta': vrsta.vrsta
            };
        }

        let opcija = this.state.opcija;
        if (opcija.kategorija) {
            if (opcija.opcija) {
                uvoz[opcija.ključ][opcija.kategorija] = opcija.opcija;
            } else {
                delete(uvoz[opcija.ključ][opcija.kategorija]);
            }
        }

        this.setState({
            vrsta: {
                reč: null,
                vrsta: null
            },
            opcija: {
                kategorija: null,
                opcija: null
            },
            izvoz: uvoz
        });
    }

    konvertuj(v) {
        var vrsteStr = "imenica zamenica pridev glagol prilog broj predlog rečca veznik uzvik";
        var vrste = vrsteStr.split(' ');
        var znak = "::znak::";
        var r = v.replace(/\s*\n/g, '# ').replace(/\s+/g, ' ').replace(/([.,:;"—'!?…/()„”#]+)/g, " $1" + znak).split(' ');
        var reči = [];
        for (var i = 0; i < r.length; i++) {
            if (r[i].indexOf(znak) === -1) {
                reči.push(
                        <Rec key={ i + 'rec' }
                             ključ={ i }
                             reč={ r[i] }
                             vrste={ vrste }
                             vrsta={ this.state.vrsta.vrsta }
                             imamoVrstu={ this.imamoVrstu }
                             imamoOpciju={ this.imamoOpciju } />
                        );
            } else {
                reči.push(
                        <div className="rec znak" key={ i + 'znak' }>
                            { r[i].replace(znak, '') }
                        </div>
                        );
            }
        }
        this.setState({
            reči: reči,
            novo: true
        }, this.izvoz);
    }

    snimi(izvoz, izvor, uzrast) {
      var tekst = JSON.stringify(primeri.concat(
          {"primer": izvoz,
          "izvor": izvor,
          "uzrast": uzrast
      }), null, 4);
      console.log(tekst);
      var file = new File([tekst], "primeriMorfo.json", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file);
    }

    render() {
        var rezultat = (this.state.reči) ?
            <div id="rezultat">
                { this.state.reči }

                <Izvoz izvoz={ this.state.izvoz } />
                <button onClick={ () => this.snimi(
                    this.state.izvoz,
                    this.state.izvor,
                    this.state.uzrast * 1,
                ) }
                    className="vece-dugme">
                    jeste
                </button>
            </div>
            :
            null;
        return (
                <div className="Baza App">

                    <Tekst staPise={ this.state.staPise }
                        vidiStaPise={ this.vidiStaPise } />

                    <div>
                        <input className="tekst izvor"
                            type="text"
                            placeholder="Izvor"
                            onChange={ event => this.vidiIzvor(event) }
                        />
                        <input className="tekst uzrast"
                            type="text"
                            placeholder="Uzrast"
                            onChange={ event => this.vidiUzrast(event) }
                        />
                    </div>

                    <button id="reciMuDaKonvertuje"
                        onClick={ () => this.konvertuj(this.state.staPise) }
                    className="vece-dugme">
                        ajde
                    </button>


                    { rezultat }

                </div>
                );

    }
}

export default Baza;
