import React from 'react';
import routes from './routes';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import LandingPage from './components/pages/LandingPage'
import Navbar from './components/layout/Navbar'
import Content from './components/pages/Content'
import PrivateRoute from './components/layout/PrivateRoute'
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path = {routes.landing} component = {LandingPage} />
        <Route path = {routes.signin} component = {SignIn} />
        <Route path = {routes.signup} component = {SignUp} />
        <PrivateRoute path = {routes.content} component = {Content} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
