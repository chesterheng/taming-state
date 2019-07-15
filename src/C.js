import React from "react";
import ThemeContext from "./ThemeContext";

const C = () => {
  return (
    <ThemeContext.Consumer>
      {value => <div style={{ color: value }}>Hello World</div>}
    </ThemeContext.Consumer>
  );
};
export default C;
