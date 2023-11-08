import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

const cards = [1, 2, 3, 4, 5];

export default function Home(props) {
  const [name, setName] = React.useState('');
  const [theme, setTheme] = React.useState(
    createTheme({
      palette: {
        mode: 'light'
      }
    })
  );

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

  const getName = async () => {
    await axios.get('http://localhost:2003/user/get-details', {withCredentials: true}).then((response) => {
      setName(response.data.name);
    });
  }

  React.useState(() => {
    getTheme();
    getName();
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
            I am a passionate photographer who captures the beauty of life through the lens, turning moments into timeless art. My work is a visual storytelling that speaks volumes without words.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">+ Add Memory</Button>
              <Button variant="outlined">Recent Memory</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Memory #{card}
                    </Typography>
                    <Typography>
                      A cherished memory that sparkles in the gallery of my heart.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <BottomNavBar></BottomNavBar>
    </ThemeProvider>
  );
}