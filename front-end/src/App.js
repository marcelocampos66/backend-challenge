import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Switch>
      <Route path="/register" component={ Home } />
      <Route path="/users" component={ Home } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
