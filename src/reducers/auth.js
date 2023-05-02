import { removeCoockie } from '../utils/jwt';

export const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
  isLoading: true,
  payload: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('isAuthenticated', true);
      return {
        ...state,
        payload: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      removeCoockie();
      return {
        ...state,
        payload: action.payload,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
