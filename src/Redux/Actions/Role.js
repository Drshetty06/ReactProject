import axios from 'axios';

export const fetchMasterResources = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8085/v1/rolemanagement/roles/getmasterresources', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      dispatch({ type: 'FETCH_RESOURCES_SUCCESS', payload: response.data.resources });
    } catch (error) {
      console.error('Error fetching resources:', error);
      dispatch({ type: 'FETCH_RESOURCES_FAILURE' });
    }
  };
};

export const updateSelectedResources = (selectedResources) => {
  return { type: 'UPDATE_SELECTED_RESOURCES', payload: selectedResources };
};
