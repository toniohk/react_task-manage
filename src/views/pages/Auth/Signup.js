import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '@material-ui/core';

import { TextInput, PasswordInput, SelectInput } from './components/Inputs';
import { BlackButton } from './components/Buttons';

import { signup } from '../../../apis/auth';
import { useAppContext } from '../../../context/AppContext';

function Signup(props) {
  const { setLoading, setMessage } = useAppContext();
  const [values, setValues] = useState({
    name: '',
    title: '',
    email: '',
    password: '',
    work_focus: 1,
  });

  const handleChange = (prop, value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleContinue = () => {
    setLoading(true);
    signup({ ...values, role: 0, status: 1 }).then(res => {
      setLoading(false);
      props.history.push('/');
    }).catch(err => {
      const message = err?.response?.data?.message || 'Error';
      setMessage({ open: true, type: 'error', body: message });
      setLoading(false);
    });
  }

  return (
    <form className="flex flex-wrap xl:w-1/3 w-1/2">
      <div className="w-full">
        <p className="text-3xl font-bold text-gray-800">Sign up</p>
      </div>
      <div className="mt-12 w-full">
        <TextInput label="Name" value={values.name} onChange={val => handleChange('name', val)} />
      </div>
      <div className="mt-6 w-full">
        <TextInput label="Title" value={values.title} onChange={val => handleChange('title', val)} />
      </div>
      <div className="mt-6 w-full">
        <TextInput label="Email" value={values.email} onChange={val => handleChange('email', val)} />
      </div>
      <div className="mt-6 w-full">
        <Select
          native
          value={values.work_focus}
          onChange={e => handleChange('country', e.target.value)}
          input={<SelectInput />}
        >
          <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={1}>development</option>
          <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={2}>design</option>
          <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={3}>business</option>
          <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={4}>research</option>
        </Select>
      </div>
      <div className="mt-6 w-full">
        <PasswordInput label="Password" value={values.password} onChange={val => handleChange('password', val)} />
      </div>
      <div className="mt-12 w-full">
        <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>Continue</BlackButton>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <span className="opacity-60">Have an account? <Link className="underline" to="/auth/login">Sign in</Link>
        </span>
      </div>
    </form>
  );
}

export default Signup;
