import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router';

const defaultTheme = createTheme();

export default function Login() {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:2003/user/login', {
            email: email,
            password: password
        }, {withCredentials: true});
        
        if (response.status === 200) {
            navigate('/home',{state:{email:email}});
        } else {
            alert('Invalid email or password');
        }


    };

    const handleInput = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else if (event.target.id === 'password') {
            setPassword(event.target.value);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container 
                component="main" 
                maxWidth="xs" 
                sx={{ 
                    height: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                }}
            >
                <Box
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    onInput={handleInput}
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="password"
                    type="password"
                    id="password"
                    onInput={handleInput}
                    autoComplete="current-password"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}