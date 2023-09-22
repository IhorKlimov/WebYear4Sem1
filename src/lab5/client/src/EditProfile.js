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


const defaultTheme = createTheme();

export default function EditProfile(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name");
        const group = data.get("group");
        const variant = data.get("variant");
        const telephone = data.get("telephone");
        const isAdmin = data.get("isAdmin");
        // const photo = data.get("photo");

        let body = {
            email: props.email,
            name,
            group,
            variant,
            isAdmin,
            telephone,
            // photo
        };
        console.log(body);

        fetch("http://localhost:3000/account", {
            method: "PUT",
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
                        account: props.email
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
                        Edit profile
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    defaultValue={props.profile.name}
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
                                    defaultValue={props.profile.group}
                                    label="Group"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="variant"
                                    required
                                    defaultValue={props.profile.variant}
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
                                    defaultValue={props.profile.telephone}
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
                                    defaultValue={props.profile.photo}
                                    id="photo"
                                    label="Photo"
                                    autoFocus
                                />
                            </Grid> */}
                        </Grid>

                        <Grid item xs={12} >
                            <FormControlLabel control={<Checkbox
                                name="isAdmin"
                                fullWidth
                                id="isAdmin"
                                defaultChecked={props.profile.isAdmin}
                                autoFocus
                            />} label="Admin" />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}