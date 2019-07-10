import React, { useRef } from "react";
const Search = () => {
  const inputElement = useRef(null);
  const onSubmit = event => {
    const { value } = inputElement.current;
    console.log(value);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputElement} type="text" />
      <button type="submit">Search</button>
    </form>
  );
};
export default Search;
