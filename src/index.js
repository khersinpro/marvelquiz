import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import FireBase, {FireBaseContext} from './components/FireBase';
import reportWebVitals from './reportWebVitals';
import './App.css'

ReactDOM.render(
  <BrowserRouter>
    <FireBaseContext.Provider value={new FireBase()}>
      <App />
    </FireBaseContext.Provider>   
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
