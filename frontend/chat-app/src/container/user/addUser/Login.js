import React from 'react';
import Index from '../../index.js';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataService } from '../../../config/DataService.js';
import { Api } from '../../../config/Api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../addUser/AddUser.css'
const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
      email: '',
    };
  
    const startSpace = /^(?!\s).*$/; 
    const space = /^(?!.* {2}).*$/; 
  
    const validationSchema = Yup.object({
    
  
      email: Yup.string()
        .matches(startSpace, 'No leading spaces allowed')
        .matches(space, 'No consecutive spaces allowed')
        .email('Invalid email address')
        .required('Email is required'),
    });
  
    const handleFormSubmit = async (values) => {
      try {
        const payload = {
          email: values.email,
        };
    
        console.log('Submitting Payload:', payload);
    
        const response = await DataService.post(Api.USER_LOGIN, payload);
        const userData = response.data.data;
    
        localStorage.setItem('userToken', JSON.stringify(userData));
        toast.success(response.data.message);
        navigate('/chat');
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'An unexpected error occurred';
        toast.error(errorMessage);
      }
    };
    
    return (
      <Index.Box className="left-container">
        <Index.Box className="form-container">
          <Index.Box>
            <h1>Welcome to Chat Application</h1>
          </Index.Box>
  
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <Form className="register-form">
            
  
                <Index.Box>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="standard"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    className="email"
                  />
                </Index.Box>
  
                <Index.Box className="register-actions">
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="login-btn"
                  >
                    Login
                  </Button>
                </Index.Box>
  
                <Index.Box className="register-actions">
                  <p>Don't have an account?</p>
                  <Button
                    variant="text"
                    onClick={() => navigate('/add/user')}
                    className="forgot-password"
                  >
                    Register here
                  </Button>
                </Index.Box>
              </Form>
            )}
          </Formik>
        </Index.Box>
      </Index.Box>
    );
}

export default Login
