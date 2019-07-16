import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers } from "redux";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
};

const applyAddTodo = (state, { todo }) => {
  const newTodo = { ...todo, completed: false };
  return state.concat(newTodo);
};

const applyToggleTodo = (state, { todo }) => {
  const { id } = todo;
  return state.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

const filterReducer = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
};

const applySetFilter = (state, action) => {
  return action.filter;
};

const doAddTodo = (id, name) => {
  return {
    type: TODO_ADD,
    todo: { id, name }
  };
};

const doToggleTodo = id => {
  return {
    type: TODO_TOGGLE,
    todo: { id }
  };
};

const doSetFilter = filter => {
  return {
    type: FILTER_SET,
    filter
  };
};

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
});
const store = createStore(rootReducer);

console.log("initial state:");
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("store update, current state:");
  console.log(store.getState());
});

store.dispatch(doAddTodo("0", "learn redux"));
store.dispatch(doAddTodo("1", "learn mobx"));
store.dispatch(doToggleTodo("0"));
store.dispatch(doSetFilter("COMPLETED"));

unsubscribe();
