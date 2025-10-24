import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authAction';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // validation error logic
  const validate = () => {
    let newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      newErrors.name = "Name is required"
    }
    if (!email) {
      newErrors.email = "Email is required"
    }
    else if (!emailRegex.test(email)) {

    }
    if (!password) {
      newErrors.password = "Password is required"
    }
    return newErrors
  }
  const submit = async e => {
    e.preventDefault();
    const validationError = validate()
    setError(validationError)
    if (Object.keys(validationError).length === 0) {
      try {
        await dispatch(register(name, email, password));
        alert("registration successful")
        navigate('/')

      } catch (error) {
        console.log(error)
      }
    }


  }

  return (
    <div className="reg-logincontainer">
      <form className="login_reg_form" onSubmit={submit}>
        <h2>Register</h2>
        <input className='login_reg_input' value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
        <input className='login_reg_input' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        {error.email && <p style={{ color: 'red' }}>{error.email}</p>}

        <input className='login_reg_input' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        {error.password && <p style={{ color: 'red' }}>{error.password}</p>}

        <button className='login-reg-btn' type="submit">Register</button>
      </form>
    </div>
  );
}
