import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/navbar_top.component.jsx';
import BottomNavBar from '../components/navbar_bottom.component.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';



const theme = createTheme({
  palette: {
      mode: 'dark',
      primary:{
          main: "rgba(255, 255, 255, 0.7)"
      },
      secondary: {
          main: "#E9C46A"
      }
  },
});


export default function AddTask() {

  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  
  function submit() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "title": title,
      "description": description,

    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include'
    };
  
    fetch("http://localhost:2003/task/add-task", requestOptions)
      .then(response => response.text())
      .then(result => window.location = '/home')
      .catch(error => console.log('error', error));
  }

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar></NavBar>
      <Box
          component="div"
          sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${""})` ,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -1000
          }}
      />
      <Box sx={{height: 30}}/>
      <Card 
        sx={{ 
          minWidth: 500, 
          maxWidth: 800,
          margin: 'auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          mt: 0,
        }}
      >
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
          <Typography sx={{ fontSize: 24, textAlign: 'center' }} color="text.primary" gutterBottom>
            ADD NEW TASK
          </Typography>
          <TextField 
            id="standard-basic" 
            label="Task Title" 
            variant="standard" 
            sx={{
              width: '90%',
              mt: 5,
              mb: 5
            }}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Decription"
            multiline
            rows={4}
            defaultValue="Describe your task here..."
            sx={{
              mb: 3,
              width: '90%'
            }}
            onChange={(event) => setDescription(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker orientation="landscape" sx={{width: '90%'}}/>
          </LocalizationProvider>
          

        </CardContent>
        <CardActions>
          <Button size="large" onClick={submit}>Assign Task</Button>
        </CardActions>
      </Card>
      <BottomNavBar></BottomNavBar>
    </ThemeProvider>
  );
}
