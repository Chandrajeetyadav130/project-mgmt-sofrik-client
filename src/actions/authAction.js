import API from '../api';

export const login = (email, password) => async dispatch => {
  dispatch({ type: 'AUTH_START' });
  try {
    const res = await API.post('/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
  } catch (err) {
    dispatch({ type: 'AUTH_FAIL', payload: err?.response?.data?.message || err.message });
  }
};

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: 'AUTH_START' });
  try {
    const res = await API.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
  } catch (err) {
    dispatch({ type: 'AUTH_FAIL', payload: err?.response?.data?.message || err.message });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: 'AUTH_LOGOUT' });
};
