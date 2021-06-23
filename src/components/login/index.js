import { Container, Box, Paper, Stack, Typography, Button, Divider } from '@material-ui/core'
import React from 'react'
import Navbar from '../layout/navbar'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function Login() {

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
                        width: IsMobile?'310px':'280px',
                        height: '300px',
                    },
                    marginTop: '100px'
                }}
            >
                <Paper elevation={6} >
                    <Stack spacing={1} alignItems='center'>
                        <div style={{width:'100%',backgroundColor:'rgba(9, 109, 217, 0.33)',height:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Typography variant="h5" >Login</Typography>
                        </div>

                        <div >
                            <TextField id="standard-basic" label="Email" variant="standard" sx={{ width: '85%' }} />
                            <TextField id="standard-basic" label="Password" variant="standard" sx={{ width: '85%' }} />
                        </div>
                        <div>

                        </div>

                        <Button variant="outlined" style={{ margin: '30px 0px 10px 0px' }}>Login</Button>
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
