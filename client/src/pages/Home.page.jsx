import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/navbar_top.component';
import BottomNavBar from '../components/navbar_bottom.component';
import axios from 'axios';
import TaskCard from '../components/TaskCard.component';

export default function Home(props) {
  const [name, setName] = React.useState('');
  const [theme, setTheme] = React.useState(
    createTheme({
      palette: {
        mode: 'light'
      }
    })
  );
  const [tasks, setTasks] = React.useState([]);

  //Getting User Preference
  const getTheme = async () => {
    await axios.get('http://localhost:2003/preference/', {withCredentials: true}).then((response) => {
        setTheme(
          createTheme({
            palette: {
              mode: response.data.theme,
              primary: response.data.color_palette.primary,
              secondary: response.data.color_palette.secondary
            }
          })
        );
    });
  }

  //Getting User details
  const getName = async () => {
    await axios.get('http://localhost:2003/user/get-details', {withCredentials: true}).then((response) => {
      setName(response.data.name);
    });
  }

  //Getting USer tasks
  const getTasks = async () => {
    axios.get('http://localhost:2003/task/', {withCredentials: true}).then((response) =>{
      // console.log(response.data);
      setTasks(response.data);
    });
  }

  React.useState(() => {
    getTheme();
    getName();
    getTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar></NavBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome ! <br></br>{name}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              "Embrace challenges as stepping stones to success, and let determination be the fuel that propels you to greatness."
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => { window.location = '/add-memory' }}>+ Add Task</Button>
              <Button variant="outlined">Recent Task</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {tasks.map((task) => (
              <Grid item key={task.title} xs={12} sm={12} md={12}>
                <TaskCard
                  title={task?.title}
                  description={task?.description}
                >
                </TaskCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <BottomNavBar></BottomNavBar>
    </ThemeProvider>
  );
}