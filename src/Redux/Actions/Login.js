export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const API_URL = 'http://localhost:8085/authenticate';

export const loginRequest = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      console.log('API Response:', data);
      localStorage.setItem('authData', JSON.stringify(data));

      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid email or password' });
    }
  };
};

export const logout = () => {
  localStorage.removeItem('authData');
  return { type: LOGOUT };
};
