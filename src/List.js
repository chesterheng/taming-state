import React from "react";
const List = ({ list, onArchive }) => {
  return (
    <ul>
      {list.map(item => (
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
export default List;
