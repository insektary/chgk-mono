import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/page';

const appRender = () => {
    ReactDOM.render(<Page />, document.getElementById('root')); // eslint-disable-line
};

appRender();
