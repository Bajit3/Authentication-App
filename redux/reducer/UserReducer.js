
import { CREATE_USER_FAILED, CREATE_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, INCREMENT_FOLLOW_COUNT } from "../constants";

const initState = {
  createdUserStatus: false,
  isLoading: false,
  isAuthenticated: typeof window !== 'undefined' && localStorage.getItem('accessToken') ? true : false,
  error: null,
  users: [], // Initialize users array
  followCount: 0, 
};

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createdUserStatus: true,
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        createdUserStatus: false,
      };
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, error: null, isAuthenticated: true };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload, 
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
      case INCREMENT_FOLLOW_COUNT:
      return {
        ...state,
        followCount: state.followCount + 1,
      };
    default:
      return state;
  }
};
