import React from 'react';
import Index from '../../index.js';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../addUser/AddUser.css'
const Login = ({ socket }) => { 
  console.log(socket,"hh");
  
  const navigate = useNavigate();

  const initialValues = {
    username: '',
  };

  const startSpace = /^(?!\s).*$/;
  const space = /^(?!.* {2}).*$/;

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed')
      .min(2, 'Name must be at least 2 characters')
      .max(20, 'Name must be at most 20 characters')
      .required('Name is required'),
  });

  const handleFormSubmit = async (values) => {
    try {
      localStorage.setItem('userName', JSON.stringify(values.username));
      toast.success('User Added');
      console.log( JSON.stringify(socket.id), "socketis");
      console.log(socket.id,"socket.id");
      
      localStorage.setItem('userId',(socket.id));
      
      socket.emit('set username', { username: values.username });

      navigate('/chat');
    } catch (error) {
      toast.error('User not added');
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
                  name="username"
                  label="Name"
                  variant="standard"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
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
                    Add User
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
