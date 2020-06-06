import React, { createContext } from "react";
import "./App.css";
import { pack, hierarchy, tree } from "d3-hierarchy";
import { PackTree, HomePage } from "./components/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ScatterRoot } from "./components/Scatter/index"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/pack-tree" component={PackTree} />
        <Route path="/scatter" component={ScatterRoot} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
