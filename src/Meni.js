import React, { Component } from 'react';
// import n from './json/nivo.json';
import Pismo from './Pismo';
import Smaranje from './Smaranje';
import './App.css';

class Meni extends Component {
    constructor(props) {
        super(props);
        this.toglujMeni = this.toglujMeni.bind(this);
        this.promeniPismo = this.promeniPismo.bind(this);
        this.promeniSmaranje = this.promeniSmaranje.bind(this);
        this.state = {
            jelMeni: false
        }
    }
    toglujMeni(){
        this.setState({
            jelMeni: !this.state.jelMeni
        })
    }
    klikno(nivo) {
        this.props.noviNivo(nivo);
    }
    promeniPismo(){
        this.props.promeniPismo();
    }
    promeniSmaranje(){
        this.props.promeniSmaranje();
    }

    render() {
        var meni = [];
        if(this.state.jelMeni) {
            var nivoi = [];
            var dokle = this.props.stigo * 1;
            for (var r = 0; r <= dokle; r++) {
                let nivo = r;
                let jelOvaj = (nivo === this.props.nivo) ? ' ovaj' : '';
                nivoi.push(
                    <button
                        key={'nvv' + r}
                        indeks={r}
                        onClick={() => this.klikno(nivo)}
                        className={"Nivo gornje-dugme" + jelOvaj}
                    >
                        {nivo}
                    </button>
                );

            }
            meni.push(
                <div className="nivoi" key="nvnv1">
                    {nivoi}
                </div>
            );
            meni.push(
                <div className="nivoi" key="nvnv2">
                    <Pismo pismo={ this.props.pismo }
                        promeniPismo={this.promeniPismo}/>

                    <Smaranje pismo={ this.props.pismo }
                        smaranje={ this.props.smaranje }
                        promeniSmaranje={this.promeniSmaranje}/>

                </div>
            );
        }
        return (
            <div className={ "Meni meni-" + this.state.jelMeni }>
                <div className="vege-burger" onClick={ this.toglujMeni }></div>
                { meni ? <div className="dugmad">{ meni }</div> : null }
            </div>
                
        );
    }
}


export default Meni;
