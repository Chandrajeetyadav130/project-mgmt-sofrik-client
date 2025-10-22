const initial = { list: [], current: null, tasks: [], loading: false, error: null };

export function projectReducer(state = initial, action) {
  switch (action.type) {
    case 'PROJECTS_LOAD': return { ...state, list: action.payload };
    case 'PROJECT_SET_CURRENT': return { ...state, current: action.payload.project, tasks: action.payload.tasks };
    default: return state;
  }
}
