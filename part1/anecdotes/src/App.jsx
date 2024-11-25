import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [min, max] = [1, anecdotes.length];

  // Generate a random integer between min and max (inclusive)
  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setSelected(randomNum);
  };

  const [points, setPoint] = useState(new Array(anecdotes.length).fill(0));

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected]++
    setPoint(copy)
    console.log(copy)
  }

  // let maxIndex = 0;
  // let maxValue = 0;
  // points.forEach((item, index, array) => {
  //   if(maxValue < item){
  //     maxIndex = index;
  //     maxValue = item;
  //   }
  // })

  let maxValue = Math.max(...points);
  let maxIndex = points.findIndex(e => maxValue == e)
  
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]} has {points[selected]} votes</p>
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleVoteClick}>Vote</button>
      <h1>Anecdotes with the most votes</h1>
      <p>{anecdotes[maxIndex]} has {points[maxIndex]} votes</p>
    </div>
  );
};

export default App;
