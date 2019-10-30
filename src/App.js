import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MasterPage } from "./pages";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import ErrorBoundary from "./ui/ErrorBoundary";

import "./App.scss";
function App() {
  return (
    <ErrorBoundary>
      <Provider store={configureStore()}>
        <Router>
          <Route path="/" component={MasterPage} />
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
