import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const reducer = (state, action) => {
  switch (action.type) {
    case "TODO_ADD": {
      return applyAddTodo(state, action);
    }
    case "TODO_TOGGLE": {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
};

const applyAddTodo = (state, action) => {
  return state.concat(action.todo);
};

const applyToggleTodo = (state, action) => {
  return state.map(todo =>
    todo.id === action.todo.id
      ? Object.assign({}, todo, { completed: !todo.completed })
      : todo
  );
};

const store = createStore(reducer, []);
console.log("initial state:");
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("store update, current state:");
  console.log(store.getState());
});

store.dispatch({
  type: "TODO_ADD",
  todo: { id: "0", name: "learn redux", completed: false }
});

store.dispatch({
  type: "TODO_ADD",
  todo: { id: "1", name: "learn mobx", completed: false }
});

store.dispatch({
  type: "TODO_TOGGLE",
  todo: { id: "0" }
});

unsubscribe();
