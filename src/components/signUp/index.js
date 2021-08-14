import { Box, Paper, Stack, Typography, Button, Divider, CircularProgress, FormControlLabel, Checkbox, Snackbar, Alert } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { signup } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux'
import PasswordChecker from '../../utils/passwordChecker';
import { checkemail } from '../../store/actions';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
    GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import CaptchaComponent from './CaptchaComponent';

function SignUp() {

    let history = useHistory();
    const dispatch = useDispatch()
    const checkEmailState = useSelector(state => state.authstatus.email)
    const signUpError = useSelector(state => state.authstatus.signUp.error)
    const signUpSuccess = useSelector(state => state.authstatus.signUp.isSuccess)

    const [showSnackBar, setShowSnackbar] = useState(false)
    const [errMsgForSnackBar, setErrMsgForSnackBar] = useState({
        msg: '',
        color: 'error'
    })
    const [isStrongPassword, setIsStrongPassword] = useState(false)

    const theme = useTheme();
    const IsMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [state, setstate] = useState({
        full_name: '',
        email: '',
        organization: '',
        profession: '',
        reason: '',
        password: '',
        accept: false,
        g_recaptcha_response: '',
        reEnteredPassword: '',
    })

    const [errorState, setErrorState] = useState({
        full_name: '',
        email: '',
        organization: '',
        profession: '',
        reason: '',
        password: '',
        correctEmailFormat: false,
        reEnteredPassword: '',
    })

    useEffect(() => {
        if (signUpError) {
            setErrMsgForSnackBar({
                color: 'error',
                msg: `${signUpError}`
            })
            setShowSnackbar(true)
        }
        else {
            setShowSnackbar(false)
        }

        if (checkEmailState.error) {
            setErrorState({
                ...errorState,
                email: checkEmailState.error,
                correctEmailFormat: true
            })
        } else if (checkEmailState.correct) {
            setErrorState({
                ...errorState,
                email: '',
                correctEmailFormat: true
            })
        }
    }, [checkEmailState, signUpError])

    useEffect(() => {
        if (signUpSuccess) {
            setErrMsgForSnackBar({
                color: 'success',
                msg: 'Successfully Registered, Please verfiy your email'
            })
            setShowSnackbar(true)
            setTimeout(() => {
                history.push("/login");
            }, 1500);
        }
        else {
            setShowSnackbar(false)
        }
    }, [signUpSuccess])

    const checkEmail = (e) => {
        if (e.target.value) {
            checkemail({ email: e.target.value })(dispatch)
        } else {
            setErrorState({
                ...errorState,
                email: 'Email Is Empty'
            })
        }
    }

    const checkPasswordStrength = (val) => {
        setIsStrongPassword(val)
    }

    const checkFieldIsEmpty = (e) => {
        if (e.target.value.length === 0) {
            setErrorState({
                ...errorState,
                [e.target.name]: `${e.target.id} is Empty`
            });
        } else {
            setErrorState({
                ...errorState,
                [e.target.name]: ''
            });
        }
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setstate({
            ...state,
            [name]: value
        });
    }

    const handleSubmit = () => {
        if (state.accept === true) {
            let errorKeyList = Object.keys(errorState)
            let checkAllFields = Object.keys(state)

            let checkFieldFlag = false
            checkAllFields.map((i) => {
                if (state[i] === '') {
                    checkFieldFlag = true
                    return checkFieldFlag
                }
            })

            let ErrorFlag = false
            errorKeyList.map((i) => {
                if (i !== 'correctEmailFormat') {
                    if (errorState[i] !== "") {
                        ErrorFlag = true
                        return ErrorFlag
                    }
                }
            })
            if (checkFieldFlag === true || ErrorFlag === true) {
                setErrMsgForSnackBar({
                    color: 'error',
                    msg: 'Please Fill All of the Fields'
                })
                setShowSnackbar(true)
            }
            else {
                if (isStrongPassword === true) {
                    let userDetails = state
                    delete userDetails['accept']
                    delete userDetails.reEnteredPassword
                    signup(userDetails)(dispatch)
                } else {
                    setErrMsgForSnackBar({
                        color: 'error',
                        msg: 'Please use a strong password'
                    })
                    setShowSnackbar(true)
                }

            }
        } else {
            setErrMsgForSnackBar({
                color: 'error',
                msg: 'Please agree with the terms'
            })
            setShowSnackbar(true)
        }
    }

    const passwordSimilarityCheck = (e) => {

        setstate({
            ...state,
            reEnteredPassword: e.target.value
        })

        if (state.password !== e.target.value) {
            setErrorState({
                ...errorState,
                reEnteredPassword: 'Password Is Not Similar'
            })
        } else {
            setErrorState({
                ...errorState,
                reEnteredPassword: ''
            })
        }
    }

    const handleCloseSnackBar = () => {
        setShowSnackbar(false)
    }

    const loading = useSelector(state => state.authstatus.signUp.isloading)

    function ButtonComponent() {
        return (
            <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                {loading && (<>
                    <CircularProgress size={14} sx={{ marginRight: '5px' }} />
                    Signing Up...
                </>
                )}
                {!loading && 'Sign Up'}
            </Button>
        );
    }


    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        maxWidth: '550px',
                        minWidth: '100px',
                        minHeight: '350px',
                    },
                    marginTop: IsMobile ? '25px' : '80px'
                }}
            >
                <Paper elevation={2} >
                    <Stack spacing={1} alignItems='center'>
                        {/*  <div style={{ width: '100%', backgroundColor: 'rgba(9, 109, 217, 0.33)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
                        <Typography variant="h5" style={{ marginTop: '20px' }}>Sign Up</Typography>
                        <form>
                            <Box sx={{ padding: '15px', width: '90%' }} alignItems='center'>
                                <Stack spacing={1}>
                                    <TextField
                                        id="Full Name"
                                        label="Full Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        name="full_name"
                                        error={errorState.full_name.length > 0 ? true : false}
                                        onBlur={checkFieldIsEmpty}
                                        onChange={handleChange}
                                        helperText={errorState.full_name}
                                        required
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        name="email"
                                        color={errorState.correctEmailFormat ? 'success' : 'primary'}
                                        error={errorState.email.length > 0 ? true : false}
                                        helperText={errorState.email}
                                        onChange={handleChange}
                                        onBlur={checkEmail}
                                        fullWidth
                                    /* style={{ maxWidth: '420px' }} */
                                    />
                                    <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={1} rowGap={1}>
                                        <TextField
                                            id="Organisation/Institute"
                                            label="Organization/Institute"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            name="organization"
                                            onBlur={checkFieldIsEmpty}
                                            error={errorState.organization.length > 0 ? true : false}
                                            onChange={handleChange}
                                            helperText={errorState.organization}
                                        />
                                        <TextField
                                            id="Profession"
                                            label="Profession"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            name="profession"
                                            error={errorState.profession.length > 0 ? true : false}
                                            onBlur={checkFieldIsEmpty}
                                            onChange={handleChange}
                                            helperText={errorState.profession}
                                        />
                                    </Stack>
                                    <TextField
                                        id="Reason"
                                        label="Reason"
                                        multiline
                                        maxRows={4}
                                        variant="outlined"
                                        size="small"
                                        onBlur={checkFieldIsEmpty}
                                        error={errorState.reason.length > 0 ? true : false}
                                        name="reason"
                                        onChange={handleChange}
                                        helperText={errorState.reason}
                                    />
                                    <Stack alignItems='center' sx={{ margin: '0px 2px 10px 2px' }}>
                                        <PasswordChecker password={state.password} checkPasswordStrength={checkPasswordStrength} />
                                    </Stack>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={1} rowGap={1}>
                                        <TextField
                                            id="Password"
                                            label="Password"
                                            variant="outlined"
                                            size="small"
                                            type="Password"
                                            fullWidth
                                            name="password"
                                            error={errorState.password.length > 0 ? true : false}
                                            onChange={handleChange}
                                            onBlur={checkFieldIsEmpty}
                                            helperText={errorState.password}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="Re Enter Password"
                                            variant="outlined"
                                            size="small"
                                            type="Password"
                                            fullWidth
                                            helperText={errorState.reEnteredPassword}
                                            error={errorState.reEnteredPassword.length > 0 ? true : false}
                                            name="reenteredPassword"
                                            onChange={passwordSimilarityCheck}
                                            disabled={state.password.length > 0 ? false : true}
                                        />
                                    </Stack>

                                    <div style={{ marginTop: '10px', textAlign: 'left' }}>
                                        <FormControlLabel control={<Checkbox onChange={handleChange} name="accept" value={state.accept} />} label="I agree with Terms and Services" />
                                    </div>
                                </Stack>
                                {/*  <Button variant="contained" style={{ margin: '15px 0px 10px 0px' }} onClick={handleSubmit}>Sign Up</Button> */}
                                <ButtonComponent style={{ margin: '15px 0px 10px 0px' }} />
                                <div style={{ width: '95%', padding: '10px 10px 10px 10px' }}>
                                    <Divider>OR</Divider>
                                </div>
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <Typography color="#5f5f5f" fontSize="12px">Already Have An Account</Typography>
                                    <Link to='/login'>
                                        <Typography color="#0b71df" fontSize="12px">Login</Typography>
                                    </Link>
                                </Stack>
                            </Box>
                        </form>
                        {
                            showSnackBar && (
                                <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                    <Alert onClose={handleCloseSnackBar} severity={errMsgForSnackBar.color} sx={{ width: '100%' }}>
                                        {errMsgForSnackBar.msg}
                                    </Alert>
                                </Snackbar>
                            )
                        }
                    </Stack>
                    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}>
                        <CaptchaComponent
                            getToken={Token => {
                                setstate({
                                    ...state,
                                    g_recaptcha_response: Token
                                })
                            }} />
                    </GoogleReCaptchaProvider>
                </Paper>
            </Box>
        </div>
    )
}

export default SignUp
