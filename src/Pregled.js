import React, { Component } from 'react';
import primeriMorfo from './json/primeriMorfo.json';
import TekstPitanja from './TekstPitanja';
import Izvor from './Izvor';
import './App.css';

class Pregled extends Component {
    constructor(props) {
        super(props);
        this.jelValja = this.jelValja.bind(this);
        this.state = {
            vrstaJednina: null
        }
    }
    componentDidMount() {
        this.setState({loaded: true});
    }
    jelValja() {
        return true;
    }
    kliknoRec(rec) {
        this.setState({
            vrstaJednina: rec.vrsta
        });
    }
    render() {
        this.pregled = [];
        for(var p in primeriMorfo) {
            var primer = primeriMorfo[p].primer;
            var izvor = primeriMorfo[p].izvor;
            this.pregled.push(
                <div key={'pitanje' + p}>
                    <div className="br-pr">
                        {p*1+1}
                    </div>
                    <TekstPitanja
                        vrstaJednina={this.state.vrstaJednina}
                        kliknoRec={rec => this.kliknoRec(rec)}
                        kojiPrimer={p}
                        primer={primer}
                        oblast="morfo"
                        fazon="izbor"
                        kolikoResioReci={3}
                        kolikoTakvihReci={primer.length}
                        jelValja={this.jelValja}
                        kategorija="rod"
                        opcija="muški"
                        nivo={1}
                        jePregled={true}
                        vrstaPregled={this.state.vrstaJednina}
                    />
                    <Izvor izvor={izvor}/>
                </div>
            );
        }

        return <div className="Pregled App">
            {this.pregled}
        </div>;
    }
}

export default Pregled;
