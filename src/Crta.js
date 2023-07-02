import React, { Component } from 'react';
import './App.css';

class Crta extends Component {
    render() {
        return (
            <svg
                className="crta"
                width="200px"
                height="50px"
                viewBox="0 0 200 50"
                preserveAspectRatio="none"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
                <line x1="0" y1="51%" x2="100%" y2="49%" />
            </svg>
        );
    }
}

export default Crta;
