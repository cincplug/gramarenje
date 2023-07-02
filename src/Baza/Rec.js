import React, { Component } from 'react';

import { srediKlasu } from '../utils.js';
import Vrste from './Vrste';
import Kategorije from './Kategorije';
import '../App.css';


class Rec extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.biramVrstu = this.biramVrstu.bind(this);
        this.imamoOpciju = this.imamoOpciju.bind(this);
    }

    imamoOpciju(ključ, kategorija, opcija) {
        this.props.imamoOpciju(ključ, kategorija, opcija);
    }

    biramVrstu(vrsta) {
        this.setState({
            vrsta: vrsta
        });
        this.props.imamoVrstu(this.props.ključ, this.props.reč, vrsta);
    }

    render() {

        let izabranaVrsta = null;
        if (this.state.vrsta) {
            izabranaVrsta = <button className={ "Vrsta-baza " + srediKlasu(this.state.vrsta || '') }
            onClick={ () => this.biramVrstu(null) }>
                { this.state.vrsta }
            </button>;
        }

        return (
                <div className={ 'Rec-b ' + srediKlasu(this.state.vrsta || '') }>
                    <span className="leva">reč :</span>
                    <span className="desna">{ this.props.reč }</span>
                    { (!this.state.vrsta) ?
                            <Vrste vrste={ this.props.vrste }
                                biramVrstu={ this.biramVrstu } />
                        :
                            <Kategorije ključ={ this.props.ključ }
                                vrsta={ this.state.vrsta }
                                izabranaVrsta={ izabranaVrsta }
                                imamoOpciju={ this.imamoOpciju } />
                    }
                </div>
                );

    }
}

export default Rec;
