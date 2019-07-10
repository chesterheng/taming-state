import React, { Fragment } from "react";
const CounterPresenter = props => {
  return (
    <Fragment>
      <p>{props.counter}</p>
      <button type="button" onClick={props.onIncrement}>
        Increment
      </button>
      <button type="button" onClick={props.onDecrement}>
        Decrement
      </button>
    </Fragment>
  );
};

export default CounterPresenter;
