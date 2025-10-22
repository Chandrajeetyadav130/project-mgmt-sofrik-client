const initial = { user: null, token: localStorage.getItem('token') || null, loading: false, error: null };

export function authReducer(state = initial, action) {
  switch (action.type) {
    case 'AUTH_START': return { ...state, loading: true };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
    case 'AUTH_FAIL': return { ...state, loading: false, error: action.payload };
    case 'AUTH_LOGOUT':
      localStorage.removeItem('token');
      return { ...initial, token: null, user: null };
    default: return state;
  }
}
