import React, { useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Alert from '../components/Alert';
import Loader from '../components/Loader';

import Auth from '../views/layouts/Auth';
import Main from '../views/layouts/Main';
import { useAppContext } from '../context/AppContext';
import { useUserContext } from '../context/UserContext';

function Views(props) {
  const { cookies } = props;
  const { loading, message, setMessage } = useAppContext();
  const { setUserInfo } = useUserContext();

  useEffect(() => {
    cookies.get('userInfo') && setUserInfo(cookies.get('userInfo'));
  }, [setUserInfo, cookies]);

  return (
    <>
      <Router>
        <Switch>
          <Route path='/auth' render={props => (<Auth {...props} />)} />
          <Route path='/' render={props => cookies.get('userInfo') ? (<Main {...props} />) : (<Redirect to={{ pathname: '/auth' }} />)} />
        </Switch>
      </Router>
      <Alert open={message.open} type={message.type} message={message.body} onClose={() => setMessage({ ...message, open: false })} />
      <Loader open={loading} />
    </>
  );
}

export default withCookies(Views);
