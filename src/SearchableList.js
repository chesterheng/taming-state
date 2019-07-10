import React, { useState, Fragment } from "react";
import Search from "./Search";
import List from "./List";
import { byQuery } from "./Utils";

const SearchableList = ({ list }) => {
  const [query, setQuery] = useState("");
  const onChange = event => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <Fragment>
      <Search query={query} onChange={onChange}>
        Search List:
      </Search>
      <List list={(list || []).filter(byQuery(query))} />
    </Fragment>
  );
};
export default SearchableList;
