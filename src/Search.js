import React, { Fragment } from "react";
const Search = ({ query, onChange, children }) => {
  return (
    <Fragment>
      {children}
      <input type="text" value={query} onChange={onChange} />
    </Fragment>
  );
};
export default Search;
