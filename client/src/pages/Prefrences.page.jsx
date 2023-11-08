import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import NavBar from '../components/navbar_top.component.jsx';
import BottomNavBar from '../components/navbar_bottom.component.jsx';
import Card from '../components/card.component.jsx';
import axios from 'axios';
import "../res/home.css";
import pref1 from "../assets/images/3f50b5.png";
function Preference() {

    const [theme, setTheme] = React.useState(
        createTheme({
            palette: {
                mode: 'light'
            }
        })
    );
    const [data,setData]= React.useState([]);
    const getTheme = () => {
        axios.get('http://localhost:2003/preference/', {withCredentials: true}).then((response) => {
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
    const getAllTheme = () => {
      axios.get('http://localhost:2003/preference/all').then((response) => {
        setData(response.data);
      })
    }

  function toggleTheme() {
    setTheme(createTheme({
      palette: {
        mode: (theme.palette.mode === 'light') ? 'dark' : 'light'
      }
    })
  )}
  
  React.useState(() => {
    getTheme();
    getAllTheme();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleTheme={toggleTheme} curTheme={theme.palette.mode}></NavBar>
      <div className="header"></div>
      <div className="row1-container">
        <Card 
          class="box box-down"
          title={data[0]?.name}
          body='Monitors activity to identify project roadblocks'
          img={pref1}
          >
            </Card> 
          
        <Card 
          class="box"
          title={data[1]?.name} 
          body='Scans our talent network to create the optimal team for your project' 
          img='https://assets.codepen.io/2301174/icon-team-builder.svg'
        />
        <Card 
          class="box box-down"
          title={data[2]?.name} 
          body='Uses data from past projects to provide better delivery estimates' 
          img='https://assets.codepen.io/2301174/icon-calculator.svg'
        />
      </div>
      <div className="row2-container" >
        <Card 
          class="box"
          title={data[3]?.name}
          body='Regularly evaluates our talent to ensure quality' 
          img='https://assets.codepen.io/2301174/icon-karma.svg'
        />
      </div>
      <BottomNavBar></BottomNavBar>
    </ThemeProvider>
  );
}
export default Preference;
