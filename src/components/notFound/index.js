import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';

function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} alignItems='center'>
                <Typography variant="h4">We can't seem to find the page you are looking for</Typography>
                <Link to="/">
                    <Button variant="outlined">Back To Home</Button>
                </Link>
            </Stack>
        </div>
    )
}

export default NotFound
