import React from "react";

import { Provider } from "react-redux";
import Store from "./store";

import SetCounter from "./components/setCounter";
import ViewCounter from "./components/viewCounter";

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <div className="App">
        <SetCounter />
        <ViewCounter />
      </div>
    </Provider>
  );
};

export default App;
