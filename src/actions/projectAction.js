import API from '../api';

export const loadProjects = (q) => async dispatch => {
  try {
    const res = await API.get('/projects' + (q ? `?q=${encodeURIComponent(q)}` : ''));
    dispatch({ type: 'PROJECTS_LOAD', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getProject = (id) => async dispatch => {
  try {
    const res = await API.get(`/projects/${id}`);
    dispatch({ type: 'PROJECT_SET_CURRENT', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
