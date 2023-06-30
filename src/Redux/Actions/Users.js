import axios from 'axios';
export const FETCH_USER_RESOURCES_REQUEST = 'FETCH_USER_RESOURCES_REQUEST';
export const FETCH_USER_RESOURCES_SUCCESS = 'FETCH_USER_RESOURCES_SUCCESS';
export const FETCH_USER_RESOURCES_FAILURE = 'FETCH_USER_RESOURCES_FAILURE';

export const fetchUserResources = (userId, token) => {
  return (dispatch) => {
    dispatch(fetchUserResourcesRequest());

    axios
      .get(`http://localhost:8085/getuserresources/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response,'RESPONSE');
        const treeData = transformData(response.data); 
        console.log(treeData,'treeData');
        dispatch(fetchUserResourcesSuccess(treeData));
        
      })
      .catch((error) => {
        dispatch(fetchUserResourcesFailure(error.message));
      });
  };
};

export const fetchUserResourcesRequest = () => {
  return {
    type: FETCH_USER_RESOURCES_REQUEST,
  };
};

export const fetchUserResourcesSuccess = (data) => {
  return {
    type: FETCH_USER_RESOURCES_SUCCESS,
    payload: data,
  };
};

export const fetchUserResourcesFailure = (error) => {
  return {
    type: FETCH_USER_RESOURCES_FAILURE,
    payload: error,
  };
};

const transformData = (data) => {
  const treeMap = {};
  const tree = []; 


  data.forEach((item) => {
    treeMap[item.id] = { ...item, children: [] };
  });


  data.forEach((item) => {
    if (item.parentId) {
      const parentNode = treeMap[item.parentId];
      parentNode.children.push(treeMap[item.id]);
    } else {
      tree.push(treeMap[item.id]);
    }
  });

  return tree;
};
