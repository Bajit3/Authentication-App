import axios from "axios";
import { CREATE_USER_FAILED, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, INCREMENT_FOLLOW_COUNT, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants";
import Swal from "sweetalert2";

export const addUser = (body) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST });
        const res2 = await axios.post('/api/auth/signup', body)
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: res2,
        });
        Swal.fire({
          text: "User Created Successfully",
          icon: "success"
        });

    } catch (error) {
        dispatch({
            type: CREATE_USER_FAILED,
            payload: error,
        });
        Swal.fire({
          text: error.response.data.message,
          icon: "error"
        });
    }
};


export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const response = await axios.post('/api/auth/signin', credentials);
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        Swal.fire({
          text: error.response.data.message,
          icon: "error"
        });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('accessToken');
    dispatch({ type: LOGOUT });
};

export const fetchAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: FETCH_USERS_REQUEST });
      const res = await axios.get('/api/getAll'); 
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: res.data, 
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error.message, 
      });
    }
  };


  export const incrementFollowCount = () => {
    return {
      type: INCREMENT_FOLLOW_COUNT,
    };
  };

