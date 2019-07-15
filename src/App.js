import React from "react";
import List from "./List";

const list = [
  { id: "0", name: "learn local state" },
  { id: "1", name: "learn redux" }
];
const App = () => {
  return <List list={list} />;
};

export default App;
