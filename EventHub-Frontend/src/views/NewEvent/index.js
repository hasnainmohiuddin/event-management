import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from "formik";
import { Container, TextField, Typography, Grid, Button, Box } from '@material-ui/core';
import { TimePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { eventsSchema } from '../../schemas/event';
import { initialEventValues } from '../../constants/event';
import urls from '../../constants/urls';

function NewEvent() {
  const histroy = useHistory();

  const handleFormSubmit = (values) => {
    axios.post('/events', {
      title: values.title,
      type: values.type,
      startTime: values.startDateTime.toISOString(),
      endTime: values.endDateTime.toISOString()
    })
      .then(() => {
        toast.success('Meeting created successfully');
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
          New Event
        </Typography>
      </Box>
      <Container>
        <Formik
          initialValues={initialEventValues}
          onSubmit={handleFormSubmit}
          validationSchema={eventsSchema}
        >
          {(formikValues) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              setFieldValue
            } = formikValues;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="Title"
                      fullWidth
                      onChange={handleChange}
                      type="text"
                      helperText={touched.title ? errors.title : ""}
                      error={touched.title && Boolean(errors.title)}
                      value={values.title}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        id="startDateTime"
                        autoOk
                        label="Start Date"
                        clearable
                        value={values.startDateTime}
                        onChange={(value) => setFieldValue('startDateTime', value)}
                        minDate={new Date()}
                        disablePast
                        helperText={touched.startDateTime ? errors.startDateTime : ""}
                        error={touched.startDateTime && Boolean(errors.startDateTime)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        id='endDateTime'
                        autoOk
                        label="End Date"
                        clearable
                        value={values.endDateTime}
                        onChange={(value) => setFieldValue('endDateTime', value)}
                        disablePast
                        helperText={touched.endDateTime ? errors.endDateTime : ""}
                        error={touched.endDateTime && Boolean(errors.endDateTime)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TimePicker
                        id='startDateTime'
                        showTodayButton
                        todayLabel="now"
                        label="Start Time"
                        value={values.startDateTime}
                        minutesStep={5}
                        onChange={(value) => setFieldValue('startDateTime', value)}
                        helperText={touched.startDateTime ? errors.startDateTime : ""}
                        error={touched.startDateTime && Boolean(errors.startDateTime)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TimePicker
                        id='endDateTime'
                        showTodayButton
                        todayLabel="now"
                        label="End Time"
                        value={values.endDateTime}
                        minutesStep={5}
                        onChange={(value) => setFieldValue('endDateTime', value)}
                        helperText={touched.endDateTime ? errors.endDateTime : ""}
                        error={touched.endDateTime && Boolean(errors.endDateTime)}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Box m="auto">
                    <Box sx={{ mt: 10 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Add Meeting
                      </Button>
                      <Button
                        style={{ marginLeft: '10px' }}
                        type="button"
                        variant="contained"
                        onClick={() => histroy.push(urls.home)}
                      >
                        Cancel
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

export default NewEvent;
