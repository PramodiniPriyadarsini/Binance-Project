import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import Store from "./store/localContext";
import reducer from "./store/reducer";
import { usePersistedContext, usePersistedReducer } from "./store/usePersist";
import Release from "./pages/release";
import "./pages/release.css";

function App() {
  //create a global store to store the state
  const globalStore = usePersistedContext(useContext(Store), "state");

  //`` will be a state manager to manage state.
  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    "state" // The localStorage key
  );

  return (
    // State.Provider passes the state and dispatcher to the down
    <Store.Provider value={{ state, dispatch }}>
      <Release/>
    </Store.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
