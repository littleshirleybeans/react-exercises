import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// A method of page re-rendering, but not a recommended way

// let counter = 1;

// const refresh = () => {
//   ReactDOM.render(
//     <App counter={counter}/>,
//     document.getElementById('root')
//   );
// }

// refresh();  //1
// counter += 1;
// refresh();  //2
// counter += 1;
// refresh();  //3


// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
