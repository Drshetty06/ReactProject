const initialState = {
    resources: [],
    selectedResources: [],
    loading: false,
    error: null
  };
  
  const roleReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_RESOURCES_SUCCESS':
        return {
          ...state,
          resources: action.payload,
          loading: false,
          error: null
        };
      case 'FETCH_RESOURCES_FAILURE':
        return {
          ...state,
          loading: false,
          error: 'Failed to fetch resources'
        };
      case 'UPDATE_SELECTED_RESOURCES':
        return {
          ...state,
          selectedResources: action.payload
        };
      default:
        return state;
    }
  };
  
  export default roleReducer;
  