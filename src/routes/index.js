import Login from '../views/pages/Auth/Login';
import Signup from '../views/pages/Auth/Signup';
import Home from '../views/pages/Main/Home';
import Projects from '../views/pages/Main/Projects';
import Users from '../views/pages/Main/Users';

const routes = [
  {
    path: '/login',
    component: Login,
    layout: '/auth'
  },
  {
    path: '/signup',
    component: Signup,
    layout: '/auth'
  },
  {
    path: '/',
    component: Home,
    layout: '/',
    exact: true
  },
  {
    path: '/projects',
    component: Projects,
    layout: '/'
  },
  {
    path: '/users',
    component: Users,
    layout: '/',
    role: 0
  },
];
   
export default routes;