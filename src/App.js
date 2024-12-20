import React from "react";
import { BrowserRouter } from "react-router-dom";
import C0_NAVIGATION_INDEX from "./components/C0_NAVIGATION/C0_NAVIGATION_INDEX";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <C0_NAVIGATION_INDEX />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
