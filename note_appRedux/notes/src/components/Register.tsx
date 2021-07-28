import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { useContext } from 'react';
import { NoteContext } from '../reducer/useContext';
import formik from 'formik';
import { useFormik } from 'formik';


// interface props {
//     success: string
//     handleUserInput: (newUser: any) => void
// }
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = (props: any) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();
    const { state, dispatch, service } = useContext(NoteContext);

    function inputName(e: any) {
        setName(e.target.value);
    }
    function inputEmail(e: any) {
        setEmail(e.target.value);
    }
    function inputPassword(e: any) {
        setPassword(e.target.value);
    }
    async function handleSubmit() {
        if (name === "" || email === "" || password === "") {
            dispatch({ type: "ERROR" });
        } else {
            const user = {
                name: name,
                email: email,
                password: password
            };
            await service.addUser(dispatch, user);
            // history.push('/')
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validate: (values: any) => {
            let errors: any = {}
            if (!values.name) {
                errors.name = "Name should not be empty"
            }
            if (!values.email) {
                errors.email = "email should not be empty"

            }
            if (!values.password) {
                errors.password = "Password should not be empty"

            }
            return errors;

        }
    })
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Name"
                                autoFocus
                                onChange={inputName}
                            />
                        </Grid>
                        {formik.errors.name ? <h4>
                            {formik.errors.name}
                        </h4> : null}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={inputEmail}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={inputPassword}

                            />
                        </Grid>

                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                        onClick={() => handleSubmit()}
                    >
                        Sign Up
                    </Button>
                    {state.onSave ? null : <div><h4>Please enter all fields</h4></div>}
                    <br /><br />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >
    );
}

export default Register