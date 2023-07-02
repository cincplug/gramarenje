import React, { Component } from 'react';

import { srediKlasu } from '../utils.js';
import '../App.css';


class Vrste extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    biramVrstu(vrsta) {
        this.props.biramVrstu(vrsta);
    }

    render() {

        var dugmici = [];
        var vrste = this.props.vrste;
        for (var vi = 0; vi < vrste.length; vi++) {
            let vrsta = vrste[vi];
            dugmici.push(
                    <button className={ "Vrsta-baza " + srediKlasu(vrsta) }
                            key={ 'vr' + vrsta }
                            onClick={ () => this.biramVrstu(vrsta) }>
                        { vrsta }
                    </button>
                    );
        }

        return(
            <div className="Vrste">
                <span className="leva"></span>
                <span className="desna">
                    { dugmici }
                </span>
            </div>
        );

    }
}

export default Vrste;
