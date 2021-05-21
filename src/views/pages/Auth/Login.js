import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import { TextInput, PasswordInput } from './components/Inputs';
import { BlackButton } from './components/Buttons';
import { login } from '../../../apis/auth';
import { useAppContext } from '../../../context/AppContext';

function Login(props) {
  const { cookies } = props;
  const { setLoading, setMessage } = useAppContext();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (prop, value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleContinue = () => {
    setLoading(true);
    login(values).then(res => {
      cookies.set('userInfo', JSON.stringify({ token: res.token, role: res.user.role, id: res.user.id }));
      if (res.is_admin) props.history.push('/admin');
      else props.history.push('/');
      setLoading(false);
    }).catch(err => {
      const message = err?.response?.data?.message || 'Error';
      setMessage({ open: true, type: 'error', body: message });
      setLoading(false);
    });
  };

  return (
    <form className="flex flex-wrap xl:w-1/3 w-1/2">
      <div className="w-full">
        <p className="text-3xl font-bold text-gray-800">Log in</p>
      </div>
      <div className="mt-12 w-full">
        <TextInput label="Email" value={values.email} onChange={val => handleChange('email', val)} />
      </div>
      <div className="mt-6 w-full">
        <PasswordInput label="Password" value={values.password} onChange={val => handleChange('password', val)} onKeyUp={e => e.keyCode === 13 && handleContinue()} />
      </div>
      <div className="mt-12 w-full">
        <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>Continue</BlackButton>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <span className="opacity-60">Don't you have an account? <Link className="underline" to="/auth/signup">Sign up</Link></span>
      </div>
    </form>
  );
}

export default withCookies(Login);
