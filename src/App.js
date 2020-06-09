import React from 'react';
import routes from './routes';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import LandingPage from './components/pages/LandingPage'
import Navbar from './components/layout/Navbar'
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path = {routes.landing} component = {LandingPage} />
        <Route path = {routes.signin} component = {SignIn} />
        <Route path = {routes.signup} component = {SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
