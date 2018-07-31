import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./Store/index";
import './index.css';
import App from './Components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
