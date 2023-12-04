import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import NavBar from '../components/navbar_top.component.jsx';


export default function ActionAreaCard() {
    const [theme, setTheme] = React.useState(
        createTheme({
            palette: {
                mode: 'light'
            }
        })
    );
    const [data,setData]= React.useState(null);

    const getProfile = async(req,res) =>{
        axios.get('http://localhost:2003/user/get-details',{withCredentials:true}).then((response) => {
            setData(response.data);
          })
    }

    const getTheme = async () => {
        await axios.get('http://localhost:2003/preference/', {withCredentials: true}).then((res) => {
            setTheme(
              createTheme({
                palette: {
                  mode: res.data.theme,
                  primary: res.data.color_palette.primary,
                  secondary: res.data.color_palette.secondary
                }
              })
            );
        });
      }

    React.useState(() => {
        getProfile();
        getTheme();
      }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar></NavBar>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:"10%" }}>
    <Card sx={{ maxWidth: 345 ,border: '2px solid #ccc', borderRadius: '8px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLejMWAMeU8ra4vu2INSgVPe0INxrrV6Emw&usqp=CAU"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email : {data?.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </ThemeProvider>
    
  );
}