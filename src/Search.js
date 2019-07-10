import React, { useState } from "react";
const Search = () => {
  const [query, setQuery] = useState("");
  const onChange = event => {
    const { value } = event.target;
    setQuery(value);
  };
  const onSubmit = event => {
    console.log(query);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} type="text" />
      <button type="submit">Search</button>
    </form>
  );
};
export default Search;
