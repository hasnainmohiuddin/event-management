import urls from '../constants/urls';

import Login from '../views/Auth/Login';
import Home from '../views/Home';
import NewEvent from '../views/NewEvent';
import SignUp from '../views/Auth/SignUp';

export const appRoutes = [
  {
    path: urls.login,
    component: Login,
    exact: true,
  },
  {
    path: urls.signup,
    component: SignUp,
    exact: true,
  },
  {
    path: urls.home,
    component: Home,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.newEvent,
    component: NewEvent,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.index,
    to: urls.home,
    redirect: true,
    isAuth: true,
  },
];
