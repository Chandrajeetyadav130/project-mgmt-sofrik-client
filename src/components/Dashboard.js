import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjects } from '../actions/projectAction';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const dispatch = useDispatch();
  const projects = useSelector(s => s.projects.list);
  const [title, setTitle] = useState('');

  useEffect(() => { dispatch(loadProjects()); }, [dispatch]);

  const create = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    await API.post('/projects', { title, description: '' });
    setTitle('');
    dispatch(loadProjects());
  };

  const remove = async id => {
    await API.delete(`/projects/${id}`);
    dispatch(loadProjects());
  };

  return (
    <div className="dashboard-container">
      <header className='header_project'>
        <h1>Your Projects</h1>
      </header>

      <form className='dashboard form' onSubmit={create}>
        <input className='dashboardinput' value={title} onChange={e => setTitle(e.target.value)} placeholder="New project title" />
        <button type="submit">Create</button>
      </form>

      <div>
        {projects?.map(p => (
          <div key={p._id} className="card small">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Status: {p.status}</p>
            <div >
              <Link to={`/projects/${p._id}`}>Open</Link>
              <button onClick={() => remove(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
