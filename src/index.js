import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Baza from './Baza/Baza';
import Pregled from './Pregled';
import './utils.js';
import './index.css';


if(window.location.search.indexOf('baza') > -1) {
    ReactDOM.render(
      <Baza/>,
      document.getElementById('root')
    );
} else if(window.location.search.indexOf('pregled') > -1) {
    ReactDOM.render(
      <Pregled/>,
      document.getElementById('root')
    );
} else {
    // document.getElementById('disklejmer').removeAttribute("style");
    // document.getElementById('okej').addEventListener('click', function(){
        ReactDOM.render(
          <App/>,
          document.getElementById('root')
        );
    // });
}
