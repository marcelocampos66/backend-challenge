import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import ListUsers from './pages/ListUsers';

function App() {
  return (
    <Switch>
      <Route path="/register" component={ Register } />
      <Route path="/users" component={ ListUsers } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
