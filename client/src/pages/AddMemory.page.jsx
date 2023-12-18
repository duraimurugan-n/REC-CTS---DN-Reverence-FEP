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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



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

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

export default function AddMemory() {

  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  
  function submit() {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
  
//     var raw = JSON.stringify({
//       "title": title,
//       "description": description,
//       "location": location,
//       "memory_image": file.data
//     });
  
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//       credentials: 'include'
//     };
  
//     fetch("http://localhost:2003/memory/add-memory", requestOptions)
//       .then(response => response.text())
//       .then(result => window.location = '/memories')
//       .catch(error => console.log('error', error));
  }

  async function fileHandler(event) {
    if (event.target.files[0].size > 200000) {
      return
    }
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setFile({
      name: file.name,
      data: base64
    });
    document.getElementById('filename').innerHTML = file.name;
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
      <Box sx={{height: 100}}/>
      <Card 
        sx={{ 
          minWidth: 500, 
          maxWidth: 800,
          margin: 'auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          mt: 13,
        }}
      >
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
          <Typography sx={{ fontSize: 24, textAlign: 'center' }} color="text.primary" gutterBottom>
            ADD NEW MEMORY
          </Typography>
          <TextField 
            id="standard-basic" 
            label="Memory Title" 
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
            rows={9}
            defaultValue="Describe your sweet memory here..."
            sx={{
              mb: 3,
              width: '90%'
            }}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField 
            id="outlined-basic" 
            label="Location" 
            variant="outlined" 
            sx={{
              mb: 3,
              width: '90%'
            }}
            onChange={(event) => setLocation(event.target.value)}
          />
          <div className='file-input' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button size="small" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={fileHandler}
              />
            </Button>
          <Typography sx={{ fontSize: 16, textAlign: 'center', m: 'auto', pl: 2 }} color="text.primary" gutterBottom id='filename'>
            Upload image here [max 1Mb]...
          </Typography>
          </div>

        </CardContent>
        <CardActions>
          <Button size="large" onClick={submit}>Memorize</Button>
        </CardActions>
      </Card>
      <BottomNavBar></BottomNavBar>
    </ThemeProvider>
  );
}
