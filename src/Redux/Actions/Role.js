import axios from 'axios';

export const FETCH_RESOURCES_REQUEST = 'FETCH_RESOURCES_REQUEST';
export const FETCH_RESOURCES_SUCCESS = 'FETCH_RESOURCES_SUCCESS';
export const FETCH_RESOURCES_FAILURE = 'FETCH_RESOURCES_FAILURE';
export const UPDATE_SELECTED_RESOURCES = 'UPDATE_SELECTED_RESOURCES';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';

export const fetchMasterResourcesRequest = () => ({
  type: FETCH_RESOURCES_REQUEST,
});

export const fetchMasterResourcesSuccess = (resources) => {
  try {
    if (!resources || resources.length === 0) {
      throw new Error('Resources are undefined or empty');
    }

    const buildResourceTree = (resources, parentId = null) => {
      const children = resources
        .filter((resource) => resource.parentId === parentId)
        .map((resource) => ({
          ...resource,
          children: buildResourceTree(resources, resource.id),
        }));

      return children;
    };

    const resourceTree = buildResourceTree(resources);

    console.log('Resources:', resources);
    console.log('Resource Tree:', resourceTree);

    return {
      type: FETCH_RESOURCES_SUCCESS,
      payload: resourceTree,
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      type: FETCH_RESOURCES_FAILURE,
      payload: 'Failed to fetch resources',
    };
  }
};

export const fetchMasterResourcesFailure = (error) => ({
  type: FETCH_RESOURCES_FAILURE,
  payload: error,
});

export const updateSelectedResources = (selectedResources) => ({
  type: UPDATE_SELECTED_RESOURCES,
  payload: selectedResources,
});

export const createRoleSuccess = (role) => ({
  type: CREATE_ROLE_SUCCESS,
  payload: role,
});

export const fetchMasterResources = (token) => {
  return async (dispatch) => {
    dispatch(fetchMasterResourcesRequest());

    try {
      const response = await axios.get(
        'http://localhost:8085/v1/rolemanagement/roles/getmasterresources',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response data:', response.data);

      dispatch(fetchMasterResourcesSuccess(response.data));
    } catch (error) {
      console.error('Error fetching resources:', error);
      dispatch(fetchMasterResourcesFailure('Failed to fetch resources'));
    }
  };
};

export const createRole = (roleData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    try {
      const response = await axios.post(
        'http://localhost:8085/v1/rolemanagement/roles',
        roleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(createRoleSuccess(response.data));

      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  };
};

