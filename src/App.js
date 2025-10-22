import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetail';
import { useSelector,useDispatch } from 'react-redux';
import  { useEffect } from 'react';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const token = useSelector(s => s.auth.token);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
   const dispatch = useDispatch();
    useEffect(() => {
    async function verify() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error();
        } catch {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      }
    }
    verify();
  }, [dispatch]);
  return (
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/projects/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
