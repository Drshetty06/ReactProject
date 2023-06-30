import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, LOGIN_SUCCESS } from '../../Redux/Actions/Login';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  const handleUsernameChange = () => {
    form.validateFields(['username']);
    validateForm();
  };

  const handlePasswordChange = () => {
    form.validateFields(['password']);
    validateForm();
  };

  const validateForm = () => {
    form
      .validateFields()
      .then(() => {
        setIsFormValid(true);
      })
      .catch(() => {
        setIsFormValid(false);
      });
  };

  useEffect(() => {
    console.log('entry', isAuthenticated);
    if (isAuthenticated) {
      console.log('entry here');
      navigate("/HomePage")
    }
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      if (isFormValid) {
        console.log('Username:', values.username);
        console.log('Password:', values.password);
        const response = await dispatch(loginRequest(values.username, values.password));
        
        if (response && response.type === LOGIN_SUCCESS) {
          setErrorMessage(''); 
        
        }
        navigate("/HomePage")
      }
    } catch (error) {
      console.error('API Error:', error);
      if (loginError) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
     

      <div className="registration-form">
        <h2 className="center">Account Sign In</h2>
        {loginError && (
          <Alert
            className="error-message"
            message={loginError}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage('Wrong Credentials Entered')}
          />
        )}
        <Form form={form} onFinish={handleFormSubmit}>
          <div className="form-item">
            <p className="label">User Name*</p>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please enter a valid email address' },
                { type: 'email', message: 'Username must be in email format' },
              ]}
            >
              <Input onChange={handleUsernameChange} />
            </Form.Item>
          </div>
          <div className="form-item">
            <p className="label">Password*</p>
            <Form.Item name="password" rules={[{ required: true, message: 'Please enter a password' }]}>
              <Input.Password onChange={handlePasswordChange} />
            </Form.Item>
          </div>
          <div className="button-container">
            <Form.Item>
              <Button type="primary" disabled={!isFormValid} htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
