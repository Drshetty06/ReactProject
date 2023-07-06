import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  UPDATE_SELECTED_RESOURCES,
  CREATE_ROLE_SUCCESS,
} from '../Actions/Role';

const initialState = {
  resources: [],
  selectedResources: [],
  loading: false,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RESOURCES_SUCCESS:
      return {
        ...state,
        resources: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_RESOURCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_SELECTED_RESOURCES:
      return {
        ...state,
        selectedResources: action.payload,
      };
      case CREATE_ROLE_SUCCESS:
        return {
          ...state,
          selectedResources: action.payload.selectedResources, 
        };
      
    default:
      return state;
  }
};

export default roleReducer;
