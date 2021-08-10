import React, { useEffect } from 'react'
import { Button, Stack, Typography, CircularProgress } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { downloadKeyFile } from '../../../store/actions';

function DownloadKeyBig({ handleClose, scanId }) {

    const firebase = useFirebase()
    const dispatch = useDispatch()

    const downloadKeyResult = useSelector((state) => state.scanData.downloadKeyFile)

    const downloadKey = () => {
        downloadKeyFile(scanId, firebase)(dispatch)
    }

    useEffect(() => {
        if (downloadKeyResult.error === false && downloadKeyResult.isloading === false) handleClose();
    }, [downloadKeyResult])

    function ButtonComponent() {
        return (
            <Button variant="contained" onClick={downloadKey} disabled={downloadKeyResult.isloading}>
                {downloadKeyResult.isloading && (<>
                    <CircularProgress size={14} sx={{ marginRight: '5px' }} />
                    Loading...
                </>
                )}
                {!downloadKeyResult.isloading && 'Download Key'}
            </Button>
        );
    }

    return (
        <>
            <Box sx={{ maxWidth: '320px' }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Download key</Typography>
                    <Alert severity="error">Lorem ipsum dolor sit amet, consectetur adipiscing elit. !</Alert>
                    <Typography fontSize="14px">Store this file securely, because your new key can't be revovered if lost</Typography>
                    <Stack direction="row" justifyContent="flex-end" spacing={2} xs={{ marginTop: '10px' }}>
                        <Button variant="text" onClick={() => handleClose()}>Cancel</Button>
                        <ButtonComponent />
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default DownloadKeyBig
