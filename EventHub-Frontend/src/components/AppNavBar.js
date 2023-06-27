import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import urls from '../constants/urls';
import { getUser, logoutUser } from '../helpers/authHelpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppNavBar() {
  const classes = useStyles();
  const currentUser = getUser();
  const location = useLocation();

  const handleShowNavLinks = () => {
    if (!currentUser && location.pathname !== urls.login) return <Button color="inherit" href={urls.login}>Login</Button>

    else if (location.pathname === urls.login) return <Button color="inherit" href={urls.signup}>Sign Up</Button>

    else return <Button color="inherit" onClick={() => logoutUser()}>Logout</Button>
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            EventHub
          </Typography>
          {handleShowNavLinks()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
