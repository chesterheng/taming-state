import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./store";
import { getReadableStories } from "./selectors/story";
import { doArchiveStory } from "./actions/archive";
import "./index.css";

const render = () => {
  ReactDOM.render(
    <App
      stories={getReadableStories(store.getState())}
      onArchive={id => store.dispatch(doArchiveStory(id))}
    />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
