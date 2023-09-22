import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sha256 } from './App';


const defaultTheme = createTheme();

export default function SignUp(props) {
    const handleSubmit = async  (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        let password = data.get("password");
        const name = data.get("name");
        const group = data.get("group");
        const isAdmin = data.get("isAdmin");
        const variant = data.get("variant");
        const telephone = data.get("telephone");
        // const photo = data.get("photo");

        password = await sha256(password);
        console.log("p check "+ password)

        let body = {
            email,
            password,
            name,
            group,
            isAdmin,
            variant,
            telephone,
            // photo
        };
        console.log(body);

        fetch("http://localhost:3000/account", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(result => result.json())
            .then(json => {
                console.log(json);
                if (json.status === "Saved") {
                    props.onResult({
                        status: "signedUp",
                        account: email
                    });
                } else {
                    alert(json.status);
                }
            });

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="group"
                                    required
                                    fullWidth
                                    id="group"
                                    label="Group"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="variant"
                                    required
                                    fullWidth
                                    id="variant"
                                    label="Variant"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="telephone"
                                    required
                                    fullWidth
                                    type="tel"
                                    id="telephone"
                                    label="Telephone"
                                    autoFocus
                                />
                            </Grid>

                            {/* <Grid item xs={12}>
                                <TextField
                                    name="photo"
                                    required
                                    fullWidth
                                    id="photo"
                                    label="Photo"
                                    autoFocus
                                />
                            </Grid> */}

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type='email'
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} >
                            <FormControlLabel control={<Checkbox
                                name="isAdmin"
                                fullWidth
                                id="isAdmin"
                                autoFocus
                            />} label="Admin" />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link variant="body2" onClick={() => {
                                    props.onResult({ status: "signIn" });
                                }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}