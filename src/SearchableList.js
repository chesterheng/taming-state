import React, { useState, Fragment } from "react";
import Search from "./Search";
import List from "./List";
import { byQuery, byArchived } from "./Utils";

const SearchableList = ({ list }) => {
  const [query, setQuery] = useState("");
  const [archivedItems, setArchivedItems] = useState([]);
  const onChange = event => {
    const { value } = event.target;
    setQuery(value);
  };
  const onArchive = id => setArchivedItems([...archivedItems, id]);
  const filteredList = list
    .filter(byQuery(query))
    .filter(byArchived(archivedItems));
  return (
    <Fragment>
      <Search query={query} onChange={onChange}>
        Search List:
      </Search>
      <List list={filteredList} onArchive={onArchive} />
    </Fragment>
  );
};
export default SearchableList;
