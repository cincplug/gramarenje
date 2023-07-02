import React, { Component } from 'react';
import nasloviNivoa from './json/nivo.json';
import { trans } from './trans.js';
import './App.css';

class NaslovNivoa extends Component {
    render() {
        var naslovNivoa = nasloviNivoa[ this.props.nivo - 1 ];
        var naslov = <div>
            <p className="nadnaslov">{this.props.nivo}. {trans('čelindž', this.props.pismo)}</p>
            <h1>{trans(naslovNivoa.naslov, this.props.pismo)}</h1>
            <p className="podnaslov">{trans(naslovNivoa.podnaslov, this.props.pismo)}</p>
        </div>
        return( <div className="naslovNivoa" key={'nv' + this.props.nivo}>
            {naslov}
        </div> );
    }
}
export default NaslovNivoa;
