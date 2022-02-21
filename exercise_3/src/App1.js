import React, {useState} from "react";

const History = (props) => {
    // Conditional Rendering
    if (props.allClicks.length === 0) {
        return (
            // you need at least a parent element but not necessarily a <div>.
            <p>
                the app is used by pressing the buttons
            </p>
        );
    }

    return (
        <p>
            button press history: {props.allClicks.join(' ')}
        </p>
    );
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const App1 = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClick = () => {
        // As mentioned previously, the state of React components like allClicks must not be mutated directly.
        // So don't you dare to use push()!!!
        setAll(allClicks.concat('L'));
        setLeft(left + 1);
        // console.log("left...", allClicks);
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        setRight(right + 1);
        // console.log("right...", allClicks);
    }

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text="left"/>
            <Button handleClick={handleRightClick} text="right"/>
            {right}
            <History allClicks={allClicks} />
        </div>
    );
}


export default App1;