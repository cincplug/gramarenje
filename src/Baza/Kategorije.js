import React, { Component } from 'react';

import kategorijeJSON from '../json/kategorijeMorfo.json';
import { srediKlasu } from '../utils.js';
import Kategorija from './Kategorija';
import '../App.css';


class Kategorije extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.stanje = {};
        this.imamoOpciju = this.imamoOpciju.bind(this);
    }

    imamoOpciju(ključ, kategorija, opcija) {
        this.props.imamoOpciju(ključ, kategorija, opcija);
        this.stanje[kategorija] = opcija;
        this.klasa = '';
        let k = Object.keys(this.stanje);
        for (var i = 0; i < k.length; i++) {
            this.klasa += srediKlasu(k[i], false) + '-' + srediKlasu(this.stanje[k[i]]);
        }
        this.setState({
            klasa: this.klasa
        })
    }

    render() {
        let vrsta = kategorijeJSON[this.props.vrsta];
        let kategorije = [];
        for (let vi = 0; vi < vrsta.length; vi++) {
            let str = vrsta[vi].split(': ');
            let imeKategorije = str[0];
            let opcije = str[1].split(' ');

            kategorije.push(
                    <Kategorija key={ 'kt' + vi }
                                ključ={ this.props.ključ }
                                ime={ imeKategorije }
                                opcije={ opcije }
                                imamoOpciju={ this.imamoOpciju }/>
                    );
        }
        return(
            <div className={ "Kategorije " + this.state.klasa }>
                <div className="Kategorija Vrsta-reci">
                    <span className="leva">vrsta: </span>
                    <span className="desna">{ this.props.izabranaVrsta }</span>
                </div>
                { kategorije }
            </div>
        );
    }
}

export default Kategorije;
