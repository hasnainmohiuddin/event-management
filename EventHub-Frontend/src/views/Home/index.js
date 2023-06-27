import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Button, Box } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import PlusIcon from '../../media/svgs/Plus.svg';
import urls from '../../constants/urls';

function Home() {
  const [events, setEvents] = useState([]);

  const histroy = useHistory();

  useEffect(() => {
    axios.get('/events')
      .then((res) => {
        const tmpEvents = res.data.map((event) => ({
          title: event.title,
          start: event.startTime,
          end: event.endTime
        }));
        setEvents(tmpEvents);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errorMessage || 'Something went wrong, please try again');
      })
  }, []);

  return (
    <Container>
      <Box sx={{ my: 3}}>
        <Button
          startIcon={<PlusIcon />}
          variant="contained"
          color="primary"
          onClick={() => histroy.push(urls.newEvent)}
        >
          Add Meeting
        </Button>
      </Box>
      <Container>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
        />
      </Container>
    </Container>
  );
}

export default Home;
