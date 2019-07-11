import React, { useState } from "react";
import CounterPresenter from "./CounterPresenter";

const CounterContainer = () => {
  const [counter, setCounter] = useState(0);
  const onIncrement = () => {
    setCounter(prev => prev + 1);
    setCounter(prev => prev + 1);
    setCounter(prev => prev + 1);
  };
  const onDecrement = () => setCounter(prev => prev - 1);

  return (
    <CounterPresenter
      counter={counter}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  );
};
export default CounterContainer;
