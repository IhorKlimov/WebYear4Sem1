import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function UserInformation(props) {
    const [account, setAccount] = useState({});
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const editProfile = () => {
        console.log("edit");

        props.onResult({
            status: "editProfile",
            profile: account
        })
    };

    const changePassword = () => {
        console.log("change password");

        props.onResult({
            status: "changePassword",
            profile: account
        })
    };

    const onDelete = () => {
        console.log("delete");
        fetch("http://localhost:3000/account", {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: props.account }),
        })
            .then(result => result.json())
            .then(json => {
                console.log(json);
                if (json.status === "Deleted") {
                    alert("User deleted");
                    props.onResult({
                        status: "signIn"
                    });
                } else {
                    alert(json.status);
                }
            });
    }

    useEffect(() => {
        console.log("use Effect " + props.account)
        fetch("http://localhost:3000/account?email=" + props.account)
            .then(result => result.json())
            .then(result => {
                if (result.status === "Ok") {
                    console.log("fetch done " + result.user.name);
                    setAccount(result.user);
                } else {
                    alert(result.status);
                }
            });
    }, []);

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
                        User information:
                    </Typography>
                    <div>Name: {account.name}</div>
                    <div>Variant: {account.variant}</div>
                    <div>Group: {account.group}</div>
                    <div>Tel: {account.telephone}</div>
                    {/* <div>Photo: {account.photo}</div> */}
                    <div>Admin: {account.isAdmin ?? "false"}</div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={editProfile}
                    >
                        Edit Profile
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="body2" onClick={() => { props.onResult({ status: "logOut" }) }}>
                                {"Log out"}
                            </Link>
                            <Link variant="body2" style={{ marginLeft: '10px' }} onClick={changePassword}>
                                {"Change password"}
                            </Link>
                            <Link variant="body2" style={{ marginLeft: '10px' }} onClick={onDelete}>
                                {"Delete profile"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider >
    );
}