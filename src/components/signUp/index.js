import {  Box, Paper, Stack, Typography, Button, Divider, FormControlLabel, Checkbox } from '@material-ui/core'
import React from 'react'
import Navbar from '../layout/navbar'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function SignUp() {

    const theme = useTheme();
    const IsMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                    marginTop: IsMobile?'25px':'80px'
                }}
            >
                <Paper elevation={6} >
                    <Stack spacing={1} alignItems='center'>
                        <div style={{ width: '100%', backgroundColor: 'rgba(9, 109, 217, 0.33)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h5" >Sign Up</Typography>
                        </div>
                        <Box sx={{ padding: '15px', width: '90%' }} alignItems='center'>
                            <Stack>
                                <TextField id="standard-basic" label="Full Name" variant="standard" fullWidth />
                                <TextField id="standard-basic" label="Email" variant="standard" fullWidth />
                                <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={3}>
                                    <TextField id="standard-basic" label="Organization/Institute" variant="standard" fullWidth />
                                    <TextField id="standard-basic" label="Profession" variant="standard" fullWidth />
                                </Stack>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Reason"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={3}>
                                    <TextField id="standard-basic" label="Password" variant="standard" fullWidth />
                                    <TextField id="standard-basic" label="Reenter Password" variant="standard" fullWidth />
                                </Stack>
                                <div style={{ marginTop: '10px', textAlign: 'left' }}>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="I agree with Terms and Services" />
                                </div>
                            </Stack>
                            <Button variant="outlined" style={{ margin: '15px 0px 10px 0px' }}>Login</Button>
                            <div style={{ width: '95%', padding: '10px 10px 10px 10px' }}>
                                <Divider>OR</Divider>
                            </div>
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <Typography color="#5f5f5f" fontSize="12px">Already Have An Account</Typography>
                                <Typography color="#0b71df" fontSize="12px">Login</Typography>
                            </Stack>
                        </Box>

                    </Stack>
                </Paper>
            </Box>
        </div>
    )
}

export default SignUp
