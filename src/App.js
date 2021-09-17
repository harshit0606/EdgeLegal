import react from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";

import home from "./components/home.js";
import signup from "./components/signup.js";
import login from "./components/login.js";
import profile from "./components/profile.js";
// import addPerson from "./components/contacts/addPerson.js";
// import addOrganization from "./components/contacts/addOrganization.js";


import {useCookies} from 'react-cookie';
import Home from "./components/home.js";


function PrivateRoute(props) {
  const { isLoggedIn, path, Component } = props;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: path } }} />
        );
      }}
    />
  );
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const loggedInToken = cookies.token;

  return (

      <Router>
        <Switch>
          {/* <Route exact path="/" component={home} /> */}
          <Route exact path="/" component={signup} />
          <Route exact path="/login" component={login} />
          <Route exact path="/home" component={Home} />
             {/* <Route exact path="/addPerson" component={addPerson} />
        <Route exact path="/addOrganization" component={addOrganization} /> */}
          <PrivateRoute
              path="/profile"
              Component={profile}
              isLoggedIn={loggedInToken}
            />
          {/* <Route exact path="/profile" component={profile} /> */}
        </Switch>
      </Router>


  );
}

export default App;
