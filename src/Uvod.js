import React, {Component} from 'react';
import uvod from './json/uvod.json';
// import Slajd from './Slajd';
import { trans } from './trans.js';
import './App.css';

class Uvod extends Component {
    constructor(props){
        super(props);
        this.state = {
            slajd: 0
        }
        this.klikno = this.klikno.bind(this);
        this.ajmo = this.ajmo.bind(this);
    }
    ajmo(){
        this.props.ajmo();
    }
    klikno() {
        if(this.state.slajd === uvod.length - 1) {
            this.ajmo();
        } else {
            this.setState({
                slajd: this.state.slajd + 1
            });
        }
    }
    render() {
        // var slajdovi = [];
        // for(var slajd in uvod) {
        //     slajdovi.push(
        //         <Slajd key={ 'slajd' + slajd }
        //             koji={slajd}
        //             jelOvaj={slajd * 1 === this.state.slajd}
        //             tekst={uvod[slajd].tekst}
        //             dugme={uvod[slajd].dugme}
        //             pismo={this.props.pismo}
        //             klikno={this.klikno}
        //         />
        //     );
        // }
        
        var slajdovi = [];
        for(var slajd in uvod) {
            slajdovi.push(
                <p key={ slajd+'uu' } className={ "Slajd slajd-" + slajd }>
                    {trans(uvod[slajd], this.props.pismo)}
                </p>
            );
        }
        

        return (

            <div className="Uvod">
                { slajdovi }
            </div>

        );
    }
}

export default Uvod;
