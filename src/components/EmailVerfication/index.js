import React from 'react'
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';

function VerifyEmail() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} alignItems='center'>
                <Typography variant="h4">Your Account Has Not Yet Verified</Typography>
            </Stack>
        </div>
    )
}

export default VerifyEmail
