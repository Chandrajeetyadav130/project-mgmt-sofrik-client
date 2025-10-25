import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authAction';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validate = () => {
    const newError = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newError.email = "email is required"
    }
    else if (!emailRegex.test(email)) {

    }
    if (!password) {
      newError.password = "Password is required"
    }
    return newError
  }
  const submit = async e => {
    e.preventDefault();
    const validateErrors = validate()
    setError(validateErrors)
    if (Object.keys(validateErrors).length === 0) {
      try {
        setLoading(true);
        await dispatch(login(email, password));
        alert("Login successful")
        navigate('/');
      } catch (error) {
        console.log(error)
      }
       finally {
        setLoading(false)
      }
    }

  };

  return (
    <div className="reg-logincontainer">
      <form className="login_reg_form" onSubmit={submit}>
        <h2>Login</h2>
        <input className='login_reg_input' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="off" />
        {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
        <input className='login_reg_input' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete="off" />
        {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
        <button className='login-reg-btn' type="submit">{loading ? 'Logging in ...' : 'Login'}</button>
        <p>or <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
