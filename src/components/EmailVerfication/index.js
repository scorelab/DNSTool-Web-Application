import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { sendEmailVerification } from '../../store/actions';
import { Snackbar, Alert } from '@material-ui/core';

function VerifyEmail() {

    const dispatch = useDispatch()
    const firebase = useFirebase()

    const sendEmailResult = useSelector((state) => state.authstatus.verificationEmail)

    const sendVerifyEmail = () => {
        sendEmailVerification(firebase)(dispatch)
    }

    const [open, setOpen] = useState(false);
    const [snackBarOptions, setSnackbarOptions] = useState({
        color: 'success',
        msg: ''
    })


    const handleCloseSnackBar = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (sendEmailResult.error) {
            setSnackbarOptions({
                color: 'error',
                msg: sendEmailResult.msg
            })
            setOpen(true)
        } else if (sendEmailResult.error === false) {
            setSnackbarOptions({
                color: 'success',
                msg: sendEmailResult.msg
            })
            setOpen(true)
        }
    }, [sendEmailResult.error, sendEmailResult.msg])

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} alignItems='center'>
                <Typography variant="h4">Please Verfiy Your Email</Typography>
                <Button variant="outlined" style={{ width: '40%' }} onClick={sendVerifyEmail}>Resend Email</Button>
            </Stack>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackBar} severity={snackBarOptions.color} sx={{ width: '100%' }}>
                    {snackBarOptions.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default VerifyEmail
