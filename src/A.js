import React from "react";
import ThemeContext from "./ThemeContext";
import D from "./D";

const A = () => {
  return (
    <ThemeContext.Provider value={"green"}>
      <D />
    </ThemeContext.Provider>
  );
};
export default A;
