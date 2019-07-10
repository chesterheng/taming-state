import React from "react";
import SearchableList from "./SearchableList";

const list = [
  { id: "0", name: "learn local state" },
  { id: "1", name: "learn redux" }
];

const App = () => {
  return <SearchableList list={list} />;
};

export default App;
