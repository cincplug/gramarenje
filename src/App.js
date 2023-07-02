import React, {Component} from 'react';
import Meni from './Meni';
import NaslovNivoa from './NaslovNivoa';
import Cifra from './Cifra';
import SpisakVrsta from './SpisakVrsta';
import Modal from './Modal';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        var nivo = localStorage.getItem('gramatiNivo') * 1 || 0;
        var stigo = Math.max(nivo, localStorage.getItem('gramatiStigo') * 1);
        var pismo = localStorage.getItem('gramatiPismo');
        var smaranje = localStorage.getItem('gramatiSmaranje' * 1);
        var cifra = localStorage.getItem('gramatiCifra' * 1);
        var oblast = (nivo > 0) ? this.utvrdiOblast(nivo) : null;
        this.minimalnaCifra = 20;

        this.state = {
            modalVidljiv: false,
            modalTekst: '',
            jelTacno: false,
            stigo: stigo || 0,
            nivo: nivo || 0,
            cifra: cifra || this.minimalnaCifra,
            oblast: oblast,
            smaranje: smaranje || 1,
            pismo: pismo || 'ћирилица'
        };

        this.kliknoVrstu = this.kliknoVrstu.bind(this);
        this.srediCifru = this.srediCifru.bind(this);
        this.otvoriModal = this.otvoriModal.bind(this);
        this.zatvoriModal = this.zatvoriModal.bind(this);
        this.utvrdiFazon = this.utvrdiFazon.bind(this);
        this.utvrdiOblast = this.utvrdiOblast.bind(this);
        this.noviNivo = this.noviNivo.bind(this);
        this.promeniPismo = this.promeniPismo.bind(this);
        this.promeniSmaranje = this.promeniSmaranje.bind(this);
    }

    utvrdiOblast(nivo){
        var oblast = (nivo <= 7) ? 'fono' : 'morfo';
        return oblast;
    }

    kliknoVrstu(tekst, jelTacno, joskolikoVrsta, jelGotovNivo) {
        this.setState({
            jelTacno: jelTacno,
            joskolikoVrsta: joskolikoVrsta,
            jelGotovNivo: jelGotovNivo
        }, function(){
            if(this.state.smaranje || jelGotovNivo || this.state.nivo === 0) {
                this.otvoriModal({
                    tekst: tekst
                });
            }
        });
    }

    otvoriModal(modal) {
        if(this.state.jelGotovNivo) {
            window.scrollTo(0, 0);
        }
        this.setState({
            modalVidljiv: true,
            modalTekst: modal.tekst || ''
        });
    }

    zatvoriModal() {
        this.setState({
            modalVidljiv: false
        });
        if (this.state.jelGotovNivo === true) {
            this.noviNivo(this.state.nivo + 1);
        }
    }

    srediCifru(cifra) {
        var novaCifra = this.state.cifra + cifra;
        this.setState({
            cifra: Math.max(novaCifra, this.minimalnaCifra),
            finansije: (cifra > 0) ? 'porast' : 'pad'
        });
        localStorage.setItem('gramatiCifra', novaCifra);
    }

    noviNivo(nivo) {
        var stigo = Math.max(this.state.stigo, nivo);
        this.setState({
            nivo: nivo,
            stigo: stigo,
            oblast: this.utvrdiOblast(nivo)
        });
        localStorage.setItem('gramatiNivo', nivo);
        localStorage.setItem('gramatiStigo', stigo);
        
        window.scrollTo(0, 0);
    }

    utvrdiFazon(fazon) {
        this.setState({
            fazon: fazon
        });
    }

    promeniPismo(){
        var novoPismo = ( this.state.pismo === "ћирилица")
        ? "latinica"
        : "ћирилица";
        this.setState({
            pismo: novoPismo
        });
        localStorage.setItem('gramatiPismo', novoPismo);
    }
    
    promeniSmaranje(){
        var novoSmaranje = ( this.state.smaranje === 1 )
        ? 0
        : 1;
        this.setState({
            smaranje: novoSmaranje
        });
        localStorage.setItem('gramatiSmaranje', novoSmaranje);
    }

    render() {
        if(this.state.nivo === 0) {
            return(
                <div className={ 'App nivo-' + this.state.nivo }>
                    <Modal vidljiv={ true }
                        zatvoriModal={ () => this.noviNivo(1) }
                        nivo={ this.state.nivo }/>
                </div>
            );
        }

        var naslovnaCifra;
        var cifra = <Cifra cifra={ this.state.cifra }
            finansije={ this.state.finansije } />;
        if(this.state.nivo > 1) {
            naslovnaCifra = cifra;
        }
        return (
            <div className={ 'App Front nivo-' + this.state.nivo
                + ' fazon-' + (this.state.fazon || 'nema')
                + ' oblast-' + (this.state.oblast || 'nema')
                + ' smaranje-' + (this.state.smaranje || 'nema')
            }
                key={"Gr" + this.state.pismo}>

                <Meni key={ this.state.stigo + "-Meni-" + this.state.nivo }
                    stigo={ this.state.stigo }
                    nivo={ this.state.nivo }
                    noviNivo={this.noviNivo}
                    pismo={ this.state.pismo }
                    smaranje={ this.state.smaranje }
                    promeniPismo={ this.promeniPismo }
                    promeniSmaranje={ this.promeniSmaranje }
                />

                <NaslovNivoa nivo={ this.state.nivo }
                    pismo={ this.state.pismo }
                />
                { naslovnaCifra }

                <SpisakVrsta key={ 'SpisakVrsta' + this.state.nivo }
                    kliknoVrstu={ this.kliknoVrstu }
                    srediCifru={ this.srediCifru }
                    nivo={ this.state.nivo }
                    noviNivo={ () => this.noviNivo(this.state.nivo + 1) }
                    utvrdiFazon={ this.utvrdiFazon }
                    pismo={ this.state.pismo }
                    oblast={ this.state.oblast }
                />


                <Modal vidljiv={ this.state.modalVidljiv }
                    tekst={ this.state.modalTekst }
                    jelTacno={ this.state.jelTacno }
                    zatvoriModal={ this.zatvoriModal }
                    nivo={ this.state.nivo }
                    jelGotovNivo={ this.state.jelGotovNivo }
                    joskolikoVrsta={ this.state.joskolikoVrsta }
                    fazon={ this.state.fazon }
                    oblast={ this.state.oblast }
                    pismo={ this.state.pismo }
                    cifra={ this.state.cifra } />
            </div>
        );

    }
}

export default App;
