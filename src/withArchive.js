import React, { useState } from "react";
import { byArchived } from "./Utils";

const withArchive = Component => {
  const WithArchive = ({ list }) => {
    const [archivedItems, setArchivedItems] = useState([]);
    const onArchive = id => {
      setArchivedItems([...archivedItems, id]);
    };
    const filteredList = list.filter(byArchived(archivedItems));
    return <Component list={filteredList} onArchive={onArchive} />;
  };
  return WithArchive;
};
export default withArchive;
