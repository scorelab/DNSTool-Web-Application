import { Box, Paper, Stack, Typography, Button, Divider, FormControlLabel, Checkbox, Snackbar, Alert } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Navbar from '../layout/navbar'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { signup } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux'
import PasswordChecker from '../../utils/passwordChecker';
import { checkemail } from '../../store/actions';

function SignUp() {

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
        accept: false
    })

    const [errorState, setErrorState] = useState({
        full_name: '',
        email: '',
        organization: '',
        profession: '',
        reason: '',
        password: '',
        correctEmailFormat: false,
        reEnteredPassword: ''
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
            let ErrorFlag = false
            errorKeyList.map((i) => {
                if (i !== 'correctEmailFormat') {
                    if (errorState[i] !== "") {
                        ErrorFlag = true
                    }
                }
            })
            if (ErrorFlag == true) {
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
                    console.log("sign up started")
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

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Navbar />
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
                <Paper elevation={6} >
                    <Stack spacing={1} alignItems='center'>
                        <div style={{ width: '100%', backgroundColor: 'rgba(9, 109, 217, 0.33)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h5" >Sign Up</Typography>
                        </div>
                        <Box sx={{ padding: '15px', width: '90%' }} alignItems='center'>
                            <Stack spacing={1}>
                                <TextField
                                    id="Full Name"
                                    label="Full Name"
                                    variant="standard"
                                    fullWidth
                                    name="full_name"
                                    error={errorState.full_name.length > 0 ? true : false}
                                    onBlur={checkFieldIsEmpty}
                                    onChange={handleChange}
                                    helperText={errorState.full_name}
                                />
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    name="email"
                                    color={errorState.correctEmailFormat ? 'success' : 'primary'}
                                    error={errorState.email.length > 0 ? true : false}
                                    helperText={errorState.email}
                                    onChange={handleChange}
                                    onBlur={checkEmail}
                                    style={{ maxWidth: '420px' }}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={3}>
                                    <TextField
                                        id="Organisation/Institute"
                                        label="Organization/Institute"
                                        variant="standard"
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
                                        variant="standard"
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
                                    variant="standard"
                                    onBlur={checkFieldIsEmpty}
                                    error={errorState.reason.length > 0 ? true : false}
                                    name="reason"
                                    onChange={handleChange}
                                    helperText={errorState.reason}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={3}>
                                    <TextField
                                        id="Password"
                                        label="Password"
                                        variant="standard"
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
                                        variant="standard"
                                        fullWidth
                                        helperText={errorState.reEnteredPassword}
                                        error={errorState.reEnteredPassword.length > 0 ? true : false}
                                        name="reenteredPassword"
                                        onChange={passwordSimilarityCheck}
                                        disabled={state.password.length > 0 ? false : true}
                                    />
                                </Stack>
                                <Stack>
                                    <PasswordChecker password={state.password} checkPasswordStrength={checkPasswordStrength} />
                                </Stack>
                                <div style={{ marginTop: '10px', textAlign: 'left' }}>
                                    <FormControlLabel control={<Checkbox onChange={handleChange} name="accept" value={state.accept} />} label="I agree with Terms and Services" />
                                </div>
                            </Stack>
                            <Button variant="outlined" style={{ margin: '15px 0px 10px 0px' }} onClick={handleSubmit}>Sign Up</Button>
                            <div style={{ width: '95%', padding: '10px 10px 10px 10px' }}>
                                <Divider>OR</Divider>
                            </div>
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <Typography color="#5f5f5f" fontSize="12px">Already Have An Account</Typography>
                                <Typography color="#0b71df" fontSize="12px">Login</Typography>
                            </Stack>
                        </Box>
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
                </Paper>
            </Box>
        </div>
    )
}

export default SignUp
