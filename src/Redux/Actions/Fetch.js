export const FETCH_ROLES_REQUEST = 'FETCH_ROLES_REQUEST';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAILURE = 'FETCH_ROLES_FAILURE';

export const fetchRolesRequest = () => {
  return {
    type: FETCH_ROLES_REQUEST
  };
};

export const fetchRolesSuccess = (roles) => {
  return {
    type: FETCH_ROLES_SUCCESS,
    payload: roles
  };
};

export const fetchRolesFailure = (error) => {
  return {
    type: FETCH_ROLES_FAILURE,
    payload: error
  };
};

export const fetchRoles = () => {
  return async (dispatch) => {
    dispatch(fetchRolesRequest());
    try {
      const response = await fetch('http://localhost:8085/v1/rolemanagement/roles', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MzMzMDk5OCwiaWF0IjoxNjgzMzMwOTk4fQ.BFm7V_vxfvugKnyhC72DLUT3xednJ8AKe6JHefXh4L8',
        },
      });
      const data = await response.json();
      dispatch(fetchRolesSuccess(data.content));
    } catch (error) {
      dispatch(fetchRolesFailure(error.message));
    }
  };
};