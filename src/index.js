import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider, connect } from "react-redux";
import "./index.css";

// action types

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

// reducers

const todos = [
  { id: "0", name: "learn redux" },
  { id: "1", name: "learn mobx" }
];

const todoReducer = (state = todos, action) => {
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

// action creators

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

// store

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
});

const store = createStore(rootReducer);

// components

const TodoApp = () => {
  return <ConnectedTodoList />;
};

const TodoList = ({ todos }) => {
  return (
    <div>
      {(todos || []).map(todo => (
        <ConnectedTodoItem key={todo.id} pTodo={todo} />
      ))}
    </div>
  );
};

const TodoItem = ({ pTodo, doToggleTodo }) => {
  const { name, id, completed } = pTodo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => doToggleTodo(id)}>
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
};

// Connecting React and Redux

const mapStateToProps = state => {
  return {
    todos: state.todoState
  };
};

const ConnectedTodoList = connect(mapStateToProps)(TodoList);
const ConnectedTodoItem = connect(
  null,
  { doToggleTodo }
)(TodoItem);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
