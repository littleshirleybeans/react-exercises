import React, {useState} from "react";

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    // Note that it is forbidden in React to mutate state directly, so don't wish to use ++ operator!
    // Changing state has to always be done by setting the state to a new object.
    setClicks({
      ...clicks,
      left: clicks.left + 1
    });
  }

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
    });
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {clicks.right}
    </div>
  );
}

export default App;
