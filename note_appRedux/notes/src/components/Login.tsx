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
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import './style.css';
import { useContext } from 'react';
import { NoteContext } from '../reducer/useContext';

interface props {
    valid?: string,
    handleUserNamePasswordInput?: (loginDetails: any) => void
}

const useStyles = makeStyles((theme: any) => ({
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const Login: React.FC<props> = (props: any) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            //   alert(JSON.stringify(values, null, 2));
            console.log('values', values);
        },
        validate: (values: any) => {
            let errors: any = {};
            if (!values.email) {
                errors.email = 'writeeeee';
            }
            if (!values.password) {
                errors.password = 'wriiiiiidsnhdsjdsjds';
            }
            return errors;
        },
    });

    console.log('.......', formik.values);
    console.log('.........', formik.errors);


    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(true);

    const { dispatch } = useContext(NoteContext);

    const history = useHistory();

    function inputEmail(e: any) {
        setEmail(e.target.value);
    }
    function inputPassword(e: any) {
        setPassword(e.target.value);
    }

    const handleUserNamePasswordInput = async (loginDetails: any) => {

        let auth = await fetch(`http://localhost:7000/api/user/login`, {
            method: "POST",
            body: JSON.stringify({ email: loginDetails.email, password: loginDetails.password }),
            headers: { "Content-Type": "application/json" }
        });

        let valid = await auth.json();
        console.log("valid", valid.message);
        if (valid.success === false) {
            setValid(false);
        } else {
            localStorage.setItem("login", valid.token)
            dispatch({ type: "LOGIN_TOGGLE" });
            history.push('/notes');
        }
    }
    return (
        <div className="login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={inputEmail}
                        // onChange={formik.handleChange('inputEmail')}
                        // value={formik.values.email}
                        // onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p>{formik.errors.email}</p>
                        ) : null}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={inputPassword}
                        // onChange={formik.handleChange}
                        // value={formik.values.password}
                        // onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.email ? (
                            <p>{formik.errors.password}</p>
                        ) : null}
                        <br />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            onClick={() => { handleUserNamePasswordInput({ email: email, password: password }); }}
                        >
                            Sign In
                        </Button>
                        <br /><br />
                        <div>
                            {valid ? null : <h4 style={{ color: "red" }}>Enter Valid Credentials</h4>}
                        </div>
                        {/* {state.isLoggedIn ? (
                            <div style={{ color: 'red' }}>Invalid email or Password</div>
                        ) : null} */}
                        <br />
                        <Grid container>

                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        </div>
    );
}


export default Login