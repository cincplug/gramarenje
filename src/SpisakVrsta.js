import React, { Component } from 'react';
import razlozi from './json/razlozi.json';
import vrsteFono from './json/vrsteFono.json';
import nevrsteFono from './json/nevrsteFono.json';
import vrsteSamoglasnici from './json/vrsteSamoglasnici.json';
import nevrsteSamoglasnici from './json/nevrsteSamoglasnici.json';
import vrsteSuglasnici from './json/vrsteSuglasnici.json';
import nevrsteSuglasnici from './json/nevrsteSuglasnici.json';
import vrsteMorfo from './json/vrsteMorfo.json';
import nevrsteMorfo from './json/nevrsteMorfo.json';
import vrstePadezi from './json/vrstePadezi.json';
import nevrstePadezi from './json/nevrstePadezi.json';
import vrsteKonj from './json/vrsteKonj.json';
import nevrsteKonj from './json/nevrsteKonj.json';
import { kažiNekiBroj, maloPromešaj } from './utils.js';
import Vrsta from './Vrsta';
import './App.css';
class SpisakVrsta extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            aktivnaVrsta: 1,
            resenihVrsta: 0
        };
        this.tacnihVrsta = 0;
        this.netacnihVrsta = 0;
    }
    
    componentDidMount() {
        this.setState({loaded: true});
    }
    
    componentWillMount() {
        var štopuj = new Date();
        this.štopuj = štopuj.getUTCMilliseconds(); 
        switch( this.props.nivo ) {
        case 1:
            this.vrste = vrsteFono;
            this.nevrste = nevrsteFono.slice(0);
            this.fazon = 'izbor';
            break;
        case 2:
            this.vrste = vrsteFono;
            this.nevrste = null;
            this.fazon = 'vrste';
            break;
        case 3:
            this.vrste = vrsteSamoglasnici;
            this.nevrste = nevrsteSamoglasnici.slice(0);
            this.fazon = 'izbor';
            break;
        case 4:
            this.vrste = vrsteSuglasnici;
            this.nevrste = nevrsteSuglasnici.slice(0);
            this.fazon = 'izbor';
            break;
        case 5:
            this.vrste = vrsteFono;
            this.nevrste = null;
            this.fazon = 'kategorije';
            break;
        case 6:
            this.vrste = [{
                "mnozina": "akcenti",
                "jednina": "akcenat"
            }];
            this.nevrste = null;
            this.fazon = 'akcenat';
            break;
        case 7:
        this.vrste = [{
                "mnozina": "promene",
                "jednina": "alter"
            }];
            this.nevrste = null;
            this.fazon = 'alter';
            break;
        case 8:
            this.vrste = vrsteMorfo;
            this.nevrste = nevrsteMorfo.slice(0);
            this.fazon = 'izbor';
            break;
        case 9:
            this.vrste = vrsteMorfo;
            this.nevrste = null;
            this.fazon = 'vrste';
            break;
        case 10:
            this.vrste = vrsteMorfo;
            this.nevrste = null;
            this.fazon = 'kategorije';
            break;
        case 11:
        // rod broj
            this.vrste = vrsteMorfo.slice(0,5);
            this.nevrste = null;
            this.fazon = 'kategorije';
            break;
        case 12:
        // padež
            this.vrste = vrstePadezi;
            this.nevrste = nevrstePadezi.slice(0);
            this.fazon = 'izbor';
            break;
        case 13:
        // padež
            this.vrste = vrsteMorfo.slice(0,4);
            this.nevrste = null;
            this.fazon = 'kategorije';
            break;
        case 14:
        // konj
            this.vrste = vrsteKonj;
            this.nevrste = nevrsteKonj.slice(0);
            this.fazon = 'izbor';
            break;
        case 15:
        // konj
            this.vrste = vrsteMorfo.slice(4,5);
            this.nevrste = null;
            this.fazon = 'kategorije';
            break;
        case 16:
        // kraj
            this.vrste = [];
            this.nevrste = [];
            this.fazon = 'izbor';
            break;
        default:
            this.vrste = vrsteMorfo;
            this.nevrste = nevrsteMorfo;
            this.fazon = 'izbor';
            break;
        }

        this.props.utvrdiFazon( this.fazon );

        this.kolikoTrebaVrsta = this.vrste.length;
        if( this.nevrste ) {
            this.uvoz = maloPromešaj( this.nevrste );
            for( var k = 0; k < this.vrste.length; k++ ) {
                let gde = this.uvoz.length / this.vrste.length;
                if(!this.vrste[ k ]['tekst']) {
                    this.vrste[ k ].tekst = razlozi[this.vrste[k].mnozina];
                }
                this.uvoz.splice( kažiNekiBroj( gde * k, gde * ( k + 1 ) ), 0, this.vrste[ k ] );
            }
        }
        else {
            this.uvoz = this.vrste.slice(0);
        }
    }
    
    kliknoVrstu( tekst, jelTacno, kljuc ) {
        if( this.fazon === 'izbor' ) {
            if( jelTacno ) {
                this.tacnihVrsta += 1;
                this.props.srediCifru( 5 );
            }
            else {
                this.netacnihVrsta += 1;
                this.props.srediCifru( -5 );
            }
            var joskolikoVrsta = this.kolikoTrebaVrsta - this.tacnihVrsta;
            var jelGotovNivo = ( this.tacnihVrsta === this.kolikoTrebaVrsta );
            this.props.kliknoVrstu( tekst, jelTacno, joskolikoVrsta, jelGotovNivo );
        }
        else if(this.state.aktivnaVrsta) {
            this.uvoz[ this.state.aktivnaVrsta - 1 ].bio = true;
            this.setState( {
                aktivnaVrsta: kljuc
            } );
        }
    }
    sledecaVrsta() {
        if( this.state.resenihVrsta === this.kolikoTrebaVrsta - 1 ) {
            for(var i in this.vrste) {
                delete this.vrste[i].jelOvaResena;
            }
            this.props.kliknoVrstu( null, null, 0, true );
            this.setState( {
                aktivnaVrsta: 1,
                resenihVrsta: 0
            } );
        } else {
            var ova = this.state.aktivnaVrsta;
            this.uvoz[ova - 1].jelOvaResena = true;
            var sledeća = this.uvoz.findIndex(vrsta => !vrsta.jelOvaResena) + 1;
            this.setState( {
                aktivnaVrsta: sledeća,
                resenihVrsta: this.state.resenihVrsta + 1
            });
        }
    }
    javiZaBravo() {
        this.uvoz[ this.state.aktivnaVrsta - 1 ].bio = false;
        this.forceUpdate();
    }
    javiZaCifru( cifra ) {
        this.props.srediCifru( cifra );
    }
    render() {
        var izvoz = [];
        for( var k = 0; k < this.uvoz.length; k++ ) {
            let kljuc = k + 1;
            let data = this.uvoz[ k ];
            var jelOvaAktivna = ( this.state.aktivnaVrsta === kljuc );
            if(jelOvaAktivna || this.fazon === 'izbor') {
                izvoz.push(
                    <Vrsta key={'v' + kljuc + 'a'}
                        kljuc={kljuc}
                        kliknoVrstu={ (tekst, jelTacno, kljuc) => this.kliknoVrstu(tekst, jelTacno, kljuc) }
                        tacnihVrsta={this.tacnihVrsta}
                        nivo={this.props.nivo}
                        jednina={data['jednina']}
                        jedninaAkuzativ={data['jedninaAkuzativ'] || data['jednina']}
                        mnozina={data['mnozina']}
                        mnozinaAkuzativ={data['mnozinaAkuzativ'] || data['mnozina']}
                        dvojinaGenitiv={data['dvojinaGenitiv']}
                        mnozinaGenitiv={data['mnozinaGenitiv'] || data['mnozina']}
                        tekst={data['tekst']}
                        jelTacno={(data['tacno'])}
                        aktivnaVrsta={this.state.aktivnaVrsta}
                        jelOvaAktivna={jelOvaAktivna}
                        jelOvaResena={this.uvoz[k].jelOvaResena}
                        jelOvdeBio={(this.uvoz[k].bio || null)}
                        javiZaBravo={ () => this.javiZaBravo() }
                        javiZaCifru={ (cifra) => this.javiZaCifru(cifra) }
                        resenihVrsta={this.state.resenihVrsta}
                        sledecaVrsta={ () => this.sledecaVrsta() }
                        kolikoTrebaVrsta={this.kolikoTrebaVrsta}
                        fazon={this.fazon}
                        pismo={ this.props.pismo }
                        oblast={ this.props.oblast } />
                );
            }
        }
        return( 
                <div className="SpisakVrsta">
                    { izvoz }
                </div>
            );

    }
}
export default SpisakVrsta;
