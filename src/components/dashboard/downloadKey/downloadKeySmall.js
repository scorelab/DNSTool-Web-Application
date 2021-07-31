import React from 'react'
import { Button, Stack, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import GetAppIcon from '@material-ui/icons/GetApp';

function DownloadKeySmall({handleClose}) {
    return (
        <>
            <Box  style={{display:'flex',alignItems:'center'}}>
                <Stack spacing={4}>
                    <Typography variant="h6" textAlign="center">Download key</Typography>
                    <Alert severity="error">Lorem ipsum dolor sit amet, consectetur adipiscing elit. !</Alert>
                    <Typography fontSize="14px">Store this file securely, because your new key can't be revovered if lost</Typography>
                    <Stack direction="row" justifyContent="center" spacing={2} xs={{ marginTop: '10px' }}>
                        <Button variant="text" onClick={() => handleClose()}>Cancel</Button>
                        <Button
                            startIcon={<GetAppIcon />}
                            variant="contained">Download Key</Button>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default DownloadKeySmall

