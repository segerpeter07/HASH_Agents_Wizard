import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './store';
import AgentsOverviewContainer from './containers/agentsOverviewContainer';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

const store = configureStore();

function App() {
  return (
    <Provider store = { store }>
      <Router>
          <Switch>
            <Route path="/"><AgentsOverviewContainer /></Route>
            <Route path="/new-agent"><AgentsOverviewContainer /></Route>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
