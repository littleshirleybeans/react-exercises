import React, { useState } from "react";

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Content = ({anecdotes, points, index}) => {
  return (
    <div>
      <div>
        {anecdotes[index]}
      </div>
      <div>
        has {points[index]} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const copy = [...points];

  const maxIndex = points.findIndex((e) => e === Math.max(...points));

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const voteAnecdote = () => {
    copy[selected] += 1;
    setPoints(copy);
    console.log(copy);
  }

  return (
    <div>
      <Header header="Anecdote of the day"/>
      <Content anecdotes={anecdotes} points={points} index={selected}/>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={randomAnecdote} text="next anecdote" />
      <Header header="Anecdote with most votes"/>
      <Content anecdotes={anecdotes} points={points} index={maxIndex}/>
    </div>
  )
}

export default App;
