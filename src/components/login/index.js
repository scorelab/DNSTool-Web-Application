import { Container, Box, Paper, Stack, Typography, Button, Divider } from '@material-ui/core'
import React, { useState } from 'react'
import Navbar from '../layout/navbar'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { useHistory, useLocation } from "react-router-dom";
import { signin } from '../../store/actions';

function Login() {

    const dispatch = useDispatch()
    const firebase = useFirebase()
    const history = useHistory()

    const [state, setstate] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
        signin(state.email, state.password, firebase, history)(dispatch)
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
                        height: '300px',
                    },
                    marginTop: '100px'
                }}
            >
                <Paper elevation={6} >
                    <Stack spacing={1} alignItems='center'>
                        <div style={{ width: '100%', backgroundColor: 'rgba(9, 109, 217, 0.33)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h5" >Login</Typography>
                        </div>

                        <div >
                            <TextField label="Email" variant="standard" name="email" sx={{ width: '85%' }} onChange={handleChange}/>
                            <TextField label="Password" variant="standard" name="password" sx={{ width: '85%' }} onChange={handleChange}/>
                        </div>
                        <div>

                        </div>

                        <Button variant="outlined" style={{ margin: '30px 0px 10px 0px' }} onClick={handleSubmit}>Login</Button>
                        <div style={{ width: '90%' }}>
                            <Divider>OR</Divider>
                        </div>
                        <Stack direction="row" spacing={1}>
                            <Typography color="#5f5f5f" fontSize="12px">Don't have an account?</Typography>
                            <Typography color="#0b71df" fontSize="12px">Login</Typography>
                        </Stack>

                    </Stack>
                </Paper>
            </Box>



        </div>
    )
}

export default Login
