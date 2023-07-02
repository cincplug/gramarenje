import React, { Component } from 'react';

import { srediKlasu } from '../utils.js';
import Opcija from './Opcija';
import '../App.css';


class Kategorija extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.biramOpciju = this.biramOpciju.bind(this);
    }

    biramOpciju(opcija) {
        this.setState({
            opcija: opcija
        });
        this.props.imamoOpciju(this.props.ključ, this.props.ime, opcija);
    }

    render() {

        let raspoloživeOpcije = [];
        for (let i = 0; i < this.props.opcije.length; i++) {
            let opcija = this.props.opcije[i].replace(/_/g, ' ');
            raspoloživeOpcije.push(
                    <Opcija key={ 'opc' + i + opcija }
                            biramOpciju={ this.biramOpciju }
                            opcija={ opcija } />
                    );
        }
        let izabranaOpcija = null;
        if (this.state.opcija) {
            izabranaOpcija = <span onClick={ () => this.biramOpciju(null) }>{ this.state.opcija }</span>;
        }

        return (
                <div className={ "Kategorija kat-" + srediKlasu(this.props.ime) }>
                    <span className="leva">{ this.props.ime } :</span>
                    <span className="desna"> { izabranaOpcija || raspoloživeOpcije } </span>
                </div>
                );
    }
}

export default Kategorija;
