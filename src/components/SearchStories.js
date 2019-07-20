import React, { useState } from "react";
import { connect } from "react-redux";
import { doFetchStories } from "../actions/story";
import Button from "./Button";

const SearchStories = ({ doFetchStories }) => {
  const [query, setQuery] = useState("");

  const onSubmit = event => {
    if (query) {
      doFetchStories(query);
      setQuery("");
    }
    event.preventDefault();
  };

  const onChange = event => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={query} onChange={onChange} />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default connect(
  null,
  { doFetchStories }
)(SearchStories);
