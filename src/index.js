import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import createRootReducer from './reducers';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const history = createHashHistory();

export const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
