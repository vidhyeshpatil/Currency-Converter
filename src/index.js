import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux';
import store from './redux/store';
import CurrencyConverter from '../src/components/CurrencyConverter';
import './css/page.css';
import registerServiceWorker from './registerServiceWorker';

const RenderRoot = () => {
    return (
        <Provider store = {store} >
            <CurrencyConverter />
        </Provider>
    );
};

ReactDOM.render(<RenderRoot />, document.getElementById('root'));
registerServiceWorker();
