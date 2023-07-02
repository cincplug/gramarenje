import React, { Component } from 'react';

import '../App.css';


class Izvoz extends Component {

    render() {
        return (
                <div id="izvoz">
                    { JSON.stringify(this.props.izvoz) }
                </div>
                );
    }
}

export default Izvoz;
