import React, { useState, Fragment } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const onIncrement = () => {
    setCounter(counter + 1);
  };

  const onDecrement = () => {
    setCounter(counter - 1);
  };

  return (
    <Fragment>
      <p>{counter}</p>
      <button type="button" onClick={onIncrement}>
        Increment
      </button>
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
    </Fragment>
  );
};

export default Counter;
