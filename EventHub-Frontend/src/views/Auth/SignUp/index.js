import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from "formik";
import { Container, TextField, Typography, Grid, Button, Box } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signUpSchema } from '../../../schemas/auth';
import { initialSignUpValues } from '../../../constants/auth';
import { setUser } from '../../../helpers/authHelpers';
import urls from '../../../constants/urls';

function SignUp() {
  const histroy = useHistory();

  const handleFormSubmit = (values) => {
    axios.post('/auth/signup', {
      email: values.email,
      fullName: values.name,
      password: values.password,
    })
      .then((res) => {
        setUser(res.data);
        toast.success('Signed up successfully');
        histroy.push(urls.home);
      })
      .catch((res) => {
        toast.error(res?.response?.data?.errorMessage || 'Something went wrong, please try again');
      })
  }

  return (
    <Container>
      <Box sx={{ my: 3}}>
        <Typography variant="h6">
          SignUp
        </Typography>
      </Box>
      <Container>
        <Formik
          initialValues={initialSignUpValues}
          onSubmit={handleFormSubmit}
          validationSchema={signUpSchema}
        >
          {(formikValues) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
            } = formikValues;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      onChange={handleChange}
                      type="email"
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                      value={values.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      fullWidth
                      onChange={handleChange}
                      type="text"
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                      value={values.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Password"
                      fullWidth
                      onChange={handleChange}
                      type="password"
                      helperText={touched.password ? errors.password : ""}
                      error={touched.password && Boolean(errors.password)}
                      value={values.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="confirmPassword"
                      name="confirmPassword"
                      label="confirmPassword"
                      fullWidth
                      onChange={handleChange}
                      type="password"
                      helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      value={values.confirmPassword}
                    />
                  </Grid>
                  <Box m="auto">
                    <Box sx={{ mt: 10 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Sign Up
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Container>
    </Container>
  );
}

export default SignUp;
