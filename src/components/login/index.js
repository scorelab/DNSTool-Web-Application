import { Container, Box, Paper, Stack, Typography, Button, Divider, Snackbar, Alert } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Navbar from '../layout/navbar'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { useHistory, useLocation } from "react-router-dom";
import { signin, checkemail } from '../../store/actions';

function Login() {

    const dispatch = useDispatch()
    const firebase = useFirebase()
    const history = useHistory()

    const signInError = useSelector(state => state.authstatus.signIn.error)

    const [state, setstate] = useState({
        email: '',
        password: '',
    })

    const [errorstate, setErrorState] = useState({
        email: '',
        password: ''
    })

    const [showSnackBar, setShowSnackbar] = useState(false)

    useEffect(() => {
        if (signInError) setShowSnackbar(true)
        else setShowSnackbar(false)
    }, [signInError])

    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
        if (errorstate.email.length === 0 || errorstate.password.length === 0) signin(state.email, state.password, firebase, history)(dispatch)
    }

    const handleCloseSnackBar = () => {
        setShowSnackbar(false)
    }

    const checkFieldIsEmpty = (e) => {
        if (e.target.value.length === 0) {
            setErrorState({
                ...errorstate,
                [e.target.name]: `${e.target.id} is Empty`
            });
        } else {
            setErrorState({
                ...errorstate,
                [e.target.name]: ''
            });
        }
    }

    const theme = useTheme();
    const IsMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Navbar />

            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        width: IsMobile ? '310px' : '280px',
                        minHeight: '300px',
                    },
                    marginTop: '100px'
                }}
            >
                <Paper elevation={6} >
                    <Stack spacing={1} alignItems='center'>
                        <div style={{ width: '100%', backgroundColor: 'rgba(9, 109, 217, 0.33)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h5" >Login</Typography>
                        </div>

                        <Stack alignItems='center' spacing={1} >
                            <TextField
                                id="Email"
                                label="Email"
                                variant="standard"
                                name="email"
                                error={errorstate.email.length > 0 ? true : false}
                                helperText={errorstate.email}
                                sx={{ width: '260px' }}
                                onChange={handleChange}
                                onBlur={checkFieldIsEmpty}
                            />
                            <TextField
                                id="Password"
                                label="Password"
                                variant="standard"
                                name="password"
                                sx={{ width: '260px' }}
                                error={errorstate.password.length > 0 ? true : false}
                                helperText={errorstate.password}
                                onChange={handleChange}
                                onBlur={checkFieldIsEmpty}
                            />
                        </Stack>
                        <div>

                        </div>

                        <Button
                            variant="outlined"
                            style={{ margin: '30px 0px 10px 0px' }}
                            onClick={handleSubmit}
                        >Login</Button>
                        <div style={{ width: '90%' }}>
                            <Divider>OR</Divider>
                        </div>
                        <Stack direction="row" spacing={1} style={{ marginBottom: '6px' }}>
                            <Typography color="#5f5f5f" fontSize="12px">Don't have an account?</Typography>
                            <Typography color="#0b71df" fontSize="12px">Sign Up</Typography>
                        </Stack>

                    </Stack>
                </Paper>
            </Box>
            {
                showSnackBar && (
                    <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
                            {signInError}
                        </Alert>
                    </Snackbar>
                )
            }
        </div >
    )
}

export default Login
