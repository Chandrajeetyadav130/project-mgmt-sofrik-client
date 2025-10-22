import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authAction';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Test@123');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate('/');
  };

  return (
    <div className="reg-logincontainer">
      <form className="login_reg_form" onSubmit={submit}>
        <h2>Login</h2>
        <input className='login_reg_input' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className='login_reg_input' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className='login-reg-btn' type="submit">Login</button>
        <p>or <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
