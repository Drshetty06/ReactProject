import {
  FETCH_USER_RESOURCES_REQUEST,
  FETCH_USER_RESOURCES_SUCCESS,
  FETCH_USER_RESOURCES_FAILURE,
} from '../Actions/Users';

const initialState = {
  userResources: [],
  loading: false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_RESOURCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_RESOURCES_SUCCESS:
      return {
        ...state,
        userResources: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_USER_RESOURCES_FAILURE:
      return {
        ...state,
        userResources: [], 
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
