import React, { useState } from 'react'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
  
}


const App = () => {
  const [counter, setCounter] = useState(0)

  // When the state modifying function setCounter is called, React re-renders the component which means that the function body of the component function gets re-executed:
  // Every time the setCounter modifies the state it causes the component to re-render. The value of the state will be incremented again after one second, and this will continue to repeat for as long as the application is running.
  
  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )
  

  // Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // So I'm thinking that setCounter()(I mean just a function call) is a special function, which could make the component function get re-executed and re-render the component automatically, setTimeout above is for the delay.
  // setCounter(counter + 1);

  // console.log("rendering...", counter)

  // Calling a function which changes the state causes the component to rerender.
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      {/* An event handler is supposed to be either a function or a function reference instead of a function call */}
      <Button
        onClick={increaseByOne}
        text="plus"  
      />
      <Button
        onClick={setToZero}
        text="zero"
      />
      <Button
        onClick={decreaseByOne}
        text="minus"
      />
    </div>
    
  )
}

export default App
