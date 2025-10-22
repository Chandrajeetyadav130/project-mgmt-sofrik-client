import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authAction';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async e => { e.preventDefault(); await dispatch(register(name, email, password)); navigate('/'); };

  return (
    <div className="reg-logincontainer">
      <form className="login_reg_form" onSubmit={submit}>
        <h2>Register</h2>
        <input className='login_reg_input' value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input className='login_reg_input' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className='login_reg_input' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className='login-reg-btn' type="submit">Register</button>
      </form>
    </div>
  );
}
