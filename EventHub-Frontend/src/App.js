import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import AppNavBar from './components/AppNavBar';
import 'react-toastify/dist/ReactToastify.css';
import { appRoutes } from './routes/appRoutes';
import PrivateRoute from './routes/PrivateRoute';

import './App.css';

function App() {
  const switchRoutes = () => appRoutes.map((route) => {
    if (route.redirect) return <Redirect key={route.path} to={route.to} from={route.path} />;

    if (route.isAuth) return <PrivateRoute key={route.path} {...route} />;

    return <Route key={route.path} {...route} />;
  });

  return (
    <Container>
      <ToastContainer />
      <Router>
        <AppNavBar />
        <Switch>
          {switchRoutes()}
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
