import React, {Component} from 'react';
import brojke from './json/brojke.json';
import nasloviNivoa from './json/nivo.json';
import Uvod from './Uvod';
import Sertifikat from './Sertifikat';
import Dalje from './Dalje';
import { trans } from './trans.js';
import './App.css';

class Modal extends Component {
    render() {
        var poruka = null;
        var koliki = 'normalan';
        var jelVidljiv = (this.props.vidljiv)
                ? "vidljiv"
                : "nevidljiv";
        var naslov, skipuj;
        var zatvori = <div className="zatvoriModal klikabl"
            onClick={ this.props.zatvoriModal }></div>;
        var uvod;
        if (this.props.nivo === 0) {
            koliki = 'veliki';
            uvod = <Uvod pismo={this.props.pismo}
                ajmo={this.props.zatvoriModal}/>;
            naslov = null;
            skipuj = <button className="Dalje"
                onClick={this.props.zatvoriModal}>
                {trans("Ajmo!", this.props.pismo)}
            </button>;
            zatvori = null;
        }

        if (this.props.fazon === 'izbor' && this.props.nivo) {
            if (this.props.jelTacno) {
                if (!this.props.jelGotovNivo) {
                    var koliko = this.props.joskolikoVrsta;
                    var kolikoSlovima = brojke[koliko - 1];
                    var štaDaNađe;
                    if (koliko === 1) {
                        štaDaNađe = 'jednu vrstu';
                    }
                    if (koliko >= 2 && koliko <= 4) {
                        štaDaNađe = kolikoSlovima.replace(/a$/g, 'e') + ' vrste';
                    }
                    if (koliko >= 5) {
                        štaDaNađe = kolikoSlovima + ' vrsta';
                    }
                    poruka = <p>Nađi još {štaDaNađe}</p>;
                }
                naslov = <span className="rezultat tacno">Tačno!</span>;
            } else {
                naslov = <span className="rezultat netacno">Netačno!</span>;
            }
        }

        if (this.props.jelGotovNivo) {
            koliki = 'normalan raste';
            poruka = nasloviNivoa[this.props.nivo];
            poruka =
            <div>

                <div className="Sertifikat">
                    <Sertifikat cifra={ this.props.cifra } 
                        pismo={ this.props.pismo } />

                </div>
                <div className="sledeciCelindz">
                    <p className="uskakanje a-dur-20">{trans('Sledeći čelindž')}</p>
                    <h2 className="uskakanje a-dur-30">{ poruka.naslov }</h2>
                    <p className="uskakanje a-dur-40">{ poruka.podnaslov }</p>
                    <Dalje klik={ this.props.zatvoriModal }/>
                </div>
            </div>;
            zatvori = null;
        }

        var tekst = [];
        var gornji = [];
        if(naslov) {
            naslov = <h1 className="modalniNaslov" key="naslovNivo">{naslov}</h1>;
            gornji.push(trans(naslov, this.props.pismo));
        }
        if(this.props.tekst) {
            var p = this.props.tekst.split('#');
            if(p) {
                for(var pasus in p) {
                    tekst.push(<p key={ 'pasus' + pasus }>{ p[pasus] }</p>);
                }
            }
            gornji.push(
                <div key="modalTekst" className="modalniTekst">
                    {trans(tekst, this.props.pismo)}
                </div>
            );
        }
        if(gornji){
            gornji = <div className="gornji" key="gornji">{ gornji }</div>;
        }

        return (

                <div className={'Modal ' + jelVidljiv + ' ' + koliki }>
                    <div className="iner">
                        {gornji}
                        {uvod}
                        {trans(poruka, this.props.pismo)}
                        {zatvori}
                        { skipuj }
                    </div>

                </div>

        );

    }

}

export default Modal;
