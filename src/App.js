import react from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import './App.css';

import home from "./components/home.js";
import signup from "./components/signup.js";
import login from "./components/login.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/login" component={login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
