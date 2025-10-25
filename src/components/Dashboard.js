import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjects } from '../actions/projectAction';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const projects = useSelector(s => s.projects.list);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false)
  const [actionType, setActionType] = useState('')
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState({})
  const [openingId, setOpeningId] = useState(null);
  useEffect(() => { dispatch(loadProjects()); }, [dispatch]);
  const validate = () => {
    const newError = {}
    if (!title) {
      newError.title = "Please field the title"
    }
    return newError
  }
  const create = async e => {
    e.preventDefault();
    const validateTitle = validate()
    setError(validateTitle)
    if (Object.keys(validateTitle).length === 0) {
      try {
        setLoading(true)
        setActionType("create")
        if (!title.trim()) return;
        await API.post('/projects', { title, description: '' });
        setTitle('');
        dispatch(loadProjects());
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
        setActionType("")
      }
    }


  };

  const remove = async id => {
    try {
      setLoading(true)
      setActionType("delete")
      setDeletingId(id)
      await API.delete(`/projects/${id}`);
      dispatch(loadProjects());
    } catch (error) {

    }
    finally {
      setLoading(false)
    }

  };
  const openProject = (id) => {
    setOpeningId(id);
    setTimeout(() => {
      navigate(`/projects/${id}`);
    }, 400); 
  };
  return (
    <div className="dashboard-container">
      <header className='header_project'>
        <h1>Your Projects</h1>
      </header>

      <form className='dashboard form' onSubmit={create}>
        <input className='dashboardinput' value={title} onChange={e => setTitle(e.target.value)} placeholder="New project title" />
        {error.title && <p style={{ color: "red" }}>Please filled the title</p>}
        <button type="submit">{loading && actionType === "create" ? "creating..." : "Create"}</button>
      </form>

      <div>
        {projects?.map(p => (
          <div key={p._id} className="card small">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Status: {p.status}</p>
            <div >
              <button onClick={() => openProject(p._id)} to={`/projects/${p._id}`}>{openingId === p._id ? "Opening..." : "Open"}</button>
              <button onClick={() => remove(p._id)}>{loading && actionType === "delete" && deletingId === p._id ? "deleting..." : "delete"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
