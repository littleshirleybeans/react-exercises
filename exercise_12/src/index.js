import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios'

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

// promise.then(response => {
//   console.log(response)
// })

// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     // console.log(notes)
//     ReactDOM.render(
//       <App notes={notes}/>,
//       document.getElementById('root')
//     )
//   })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
