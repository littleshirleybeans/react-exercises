import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App1 from './App1'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
ReactDOM.render(
  <App1 />,
  document.getElementById('root1')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
