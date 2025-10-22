import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => { fetchProject(); }, [id]);

  const fetchProject = async () => {
    const res = await API.get(`/projects/${id}`);
    setProject(res.data.project);
    setTasks(res.data.tasks);
  };

  const addTask = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    await API.post(`/tasks/${id}`, { title, description: '' });
    setTitle('');
    fetchProject();
  };

  const changeStatus = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    fetchProject();
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    fetchProject();
  };

  const filtered = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;

  return (
    <div className="projectdetail-container">
      <h2>{project?.title}</h2>
      <p>{project?.description}</p>

      <h3>Tasks</h3>
      <div className='detail-filter'>
        <label>Filter: </label>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      </div>

      <form onSubmit={addTask} className="project_detail_form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {filtered.map(t => (
          <li key={t._id} className="task">
            <strong>{t.title}</strong>
            <div>status: {t.status}</div>
            <div>
              {['todo','in-progress','done'].map(s => (
                <button key={s} onClick={() => changeStatus(t._id, s)}>{s}</button>
              ))}
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
