import React, { Component } from 'react';
import Rec from './Rec';
import Znak from './Znak';

import './App.css';

class TekstPitanja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kolikoResioReci: 0,
            tacno: null
        };
    }

    kliknoRec(rec) {
        var jelValja = this.props.jelValja(rec);
        this.props.kliknoRec(rec, jelValja);
    }

    render() {
        var pitanje = [];
        for (var r = 0; r < this.props.primer.length; r++) {
            var rec = this.props.primer[r];
            var jelTacno = this.props.jelValja(rec);
            if (typeof rec === 'object') {
                var val = rec['reč'];
                let z = 1;
                let znak = [];
                while(
                    typeof this.props.primer[r + z] === 'string'
                ) {
                    znak.push(
                        this.props.primer[r + z]
                    );
                    z++;
                }

                let k = 'r' + r + this.props.kojiPrimer;

                pitanje.push(
                    <Rec
                        key={'rc' + k}
                        k={ k }
                        indeks={r}
                        vrsta={rec['vrsta']}
                        val={val}
                        osobine={rec}
                        izabranaOpcija={rec[this.props.kategorija] || null}
                        kliknoRec={rec => this.kliknoRec(rec)}
                        kategorija={this.props.kategorija}
                        opcija={this.props.opcija}
                        znak={znak}
                        tacno={jelTacno}
                        svojstvo={rec['svojstvo']}
                        poslednjiSlog={rec['poslednjiSlog']}
                        prviSlog={rec['prviSlog']}
                        potpitanje={this.props.potpitanje}
                        pismo={ this.props.pismo }
                        fazon={this.props.fazon}
                        jePregled={this.props.jePregled}
                        vrstaPregled={this.props.vrstaPregled}
                    />
                );
                if (
                    this.props.oblast === 'morfo' &&
                    (r >= this.props.primer.length - 1 ||
                    typeof this.props.primer[r + 1] !== 'string')
                ) {
                    pitanje.push(
                        <span key={'rpr' + k}> </span>
                    );
                }
            } else if(r === 0) {
                pitanje.push(
                    <Znak key={'rcz_prviznak' + r} val={rec} />
                );
            }

        }

        return (
            <div className={'TekstPitanja p-oblast-' + this.props.oblast}>
                {pitanje}
            </div>
        );
    }
}

export default TekstPitanja;
