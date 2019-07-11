import React, { Fragment } from "react";
const CounterPresenter = ({ counter, onIncrement, onDecrement }) => {
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

export default CounterPresenter;
