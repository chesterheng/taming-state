import React, { useState } from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider, connect } from "react-redux";
import { createLogger } from "redux-logger";
import { schema, normalize } from "normalizr";
import uuid from "uuid/v4";
import createSagaMiddleware from "redux-saga";
import { put, takeEvery, delay } from "redux-saga/effects";
import "./index.css";

// filters

const VISIBILITY_FILTERS = {
  SHOW_COMPLETED: item => item.completed,
  SHOW_INCOMPLETED: item => !item.completed,
  SHOW_ALL: item => true
};

// schemas

const todoSchema = new schema.Entity("todo");

// action types

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";
const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";
const TODO_ADD_WITH_NOTIFICATION = "TODO_ADD_WITH_NOTIFICATION";

// reducers

const todos = [
  { id: uuid(), name: "Redux Standalone with advanced Actions" },
  { id: uuid(), name: "Redux Standalone with advanced Reducers" },
  { id: uuid(), name: "Bootstrap App with Redux" },
  { id: uuid(), name: "Naive Todo with React and Redux" },
  { id: uuid(), name: "Sophisticated Todo with React and Redux" },
  { id: uuid(), name: "Connecting State Everywhere" },
  { id: uuid(), name: "Todo with advanced Redux" },
  { id: uuid(), name: "Todo but more Features" },
  { id: uuid(), name: "Todo with Notifications" },
  { id: uuid(), name: "Hacker News with Redux" }
];

const normalizedTodos = normalize(todos, [todoSchema]);
console.log(normalizedTodos);

const initialTodoState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result
};

const todoReducer = (state = initialTodoState, action) => {
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

const applyAddTodo = (state, action) => {
  const todo = { ...action.todo, completed: false };
  const entities = { ...state.entities, [todo.id]: todo };
  const ids = [...state.ids, action.todo.id];
  return { ...state, entities, ids };
};

const applyToggleTodo = (state, action) => {
  const id = action.todo.id;
  const todo = state.entities[id];
  const toggledTodo = { ...todo, completed: !todo.completed };
  const entities = { ...state.entities, [id]: toggledTodo };
  return { ...state, entities };
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

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_ADD: {
      return applySetNotifyAboutAddTodo(state, action);
    }
    case NOTIFICATION_HIDE: {
      return applyRemoveNotification(state, action);
    }
    default:
      return state;
  }
};
const applySetNotifyAboutAddTodo = (state, action) => {
  const { name, id } = action.todo;
  return { ...state, [id]: "Todo Created: " + name };
};

const applyRemoveNotification = (state, action) => {
  const { [action.id]: notificationToRemove, ...restNotifications } = state;
  return restNotifications;
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

const doHideNotification = id => {
  return {
    type: NOTIFICATION_HIDE,
    id
  };
};

const doAddTodoWithNotification = (id, name) => {
  return {
    type: TODO_ADD_WITH_NOTIFICATION,
    todo: { id, name }
  };
};

// selectors

const getTodosAsIds = state => {
  return state.todoState.ids
    .map(id => state.todoState.entities[id])
    .filter(VISIBILITY_FILTERS[state.filterState])
    .map(todo => todo.id);
};

const getTodo = (state, todoId) => {
  return state.todoState.entities[todoId];
};

const getNotifications = state => {
  return getArrayOfObject(state.notificationState);
};

const getArrayOfObject = object => {
  return Object.keys(object).map(key => object[key]);
};

// sagas

function* watchAddTodoWithNotification() {
  yield takeEvery(TODO_ADD_WITH_NOTIFICATION, handleAddTodoWithNotification);
}

function* handleAddTodoWithNotification(action) {
  const { todo } = action;
  const { id, name } = todo;
  yield put(doAddTodo(id, name));
  yield delay(5000);
  yield put(doHideNotification(id));
}
// store

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer
});

const logger = createLogger();
const saga = createSagaMiddleware();
const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga, logger)
);
saga.run(watchAddTodoWithNotification);

// components

const TodoApp = () => {
  return (
    <div>
      <ConnectedFilter />
      <ConnectedTodoCreate />
      <ConnectedTodoList />
      <ConnectedNotifications />
    </div>
  );
};

const Notifications = ({ notifications }) => {
  return (
    <div>
      {notifications.map(note => (
        <div key={note}>{note}</div>
      ))}
    </div>
  );
};

const Filter = ({ doSetFilter }) => {
  return (
    <div>
      {" "}
      Show
      <button type="button" onClick={() => doSetFilter("SHOW_ALL")}>
        All
      </button>
      <button type="button" onClick={() => doSetFilter("SHOW_COMPLETED")}>
        Completed
      </button>
      <button type="button" onClick={() => doSetFilter("SHOW_INCOMPLETED")}>
        Incompleted
      </button>
    </div>
  );
};

const TodoCreate = ({ doAddTodoWithNotification }) => {
  const [value, setValue] = useState("");

  const onChangeName = event => {
    setValue(event.target.value);
  };

  const onCreateTodo = event => {
    doAddTodoWithNotification(uuid(), value);
    setValue("");
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onCreateTodo}>
        <input
          type="text"
          placeholder="Add Todo..."
          value={value}
          onChange={onChangeName}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const TodoList = ({ todosAsIds }) => {
  return (
    <div>
      {todosAsIds.map(todoId => (
        <ConnectedTodoItem key={todoId} pTodoId={todoId} />
      ))}
    </div>
  );
};

const TodoItem = ({ todo, doToggleTodo }) => {
  const { name, id, completed } = todo;
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

const mapStateToPropsList = state => {
  return {
    todosAsIds: getTodosAsIds(state)
  };
};

const mapStateToPropsItem = (state, props) => {
  return {
    todo: getTodo(state, props.pTodoId)
  };
};

const mapStateToPropsNotifications = (state, props) => {
  return {
    notifications: getNotifications(state)
  };
};

const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);
const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  { doToggleTodo }
)(TodoItem);
const ConnectedTodoCreate = connect(
  null,
  { doAddTodoWithNotification }
)(TodoCreate);
const ConnectedFilter = connect(
  null,
  { doSetFilter }
)(Filter);
const ConnectedNotifications = connect(mapStateToPropsNotifications)(
  Notifications
);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
