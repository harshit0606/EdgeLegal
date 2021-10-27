import react from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

import home from './components/home.js';
import signup from './components/signup.js';
import login from './components/login.js';
import profile from './components/profile.js';

import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import Home from './components/home.js';

function PrivateRoute(props) {
  const { isLoggedIn, path, Component } = props;
  const decoded = jwt_decode(isLoggedIn);
  // console.log(decoded);

  const currentTime = Date.now() / 1000;
  // console.log(currentTime);
  if (isLoggedIn && decoded.exp > currentTime) {
    return (
      <Route
        path={path}
        render={(props) => {
          return <Component {...props} />;
        }}
      />
    );
  } else {
    return (
      <Route
        path={path}
        render={() => {
          return <Redirect to={{ pathname: '/', state: { from: path } }} />;
        }}
      />
    );
  }

  // return (
  //   <Route
  //     path={path}
  //     render={(props) => {
  //       return isLoggedIn ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: '/', state: { from: path } }} />
  //       );
  //     }}
  //   />
  // );
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={home} /> */}
        <Route exact path='/' component={login} />
        <Route exact path='/signup' component={signup} />
        <PrivateRoute
          path='/home'
          Component={Home}
          isLoggedIn={loggedInToken}
        />
        {/* <Route exact path="/addPerson" component={addPerson} />
        <Route exact path="/addOrganization" component={addOrganization} /> */}
        <PrivateRoute
          path='/edgeLegal'
          Component={profile}
          isLoggedIn={loggedInToken}
        />
        {/* <Route exact path="/profile" component={profile} /> */}
      </Switch>
    </Router>
  );
}

export default App;
