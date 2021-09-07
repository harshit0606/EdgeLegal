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
import profile from "./components/profile.js";

function App() {
  return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={home} /> */}
          <Route exact path="/" component={signup} />
          <Route exact path="/login" component={login} />
          <Route exact path="/profile" component={profile} />
        </Switch>
      </Router>

  );
}

export default App;
