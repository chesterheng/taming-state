import React, { useState } from "react";
import { byArchived } from "./Utils";

const ArchiveableList = props => {
  const { list } = props;
  const [archivedItems, setArchivedItems] = useState([]);
  const onArchive = id => {
    setArchivedItems([...archivedItems, id]);
  };

  const filteredList = list.filter(byArchived(archivedItems));
  return (
    <ul>
      {filteredList.map(item => (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>
            <button type="button" onClick={() => onArchive(item.id)}>
              Archive
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ArchiveableList;
