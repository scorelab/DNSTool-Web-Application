import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DownloadKeyBig from './downloadKeyBig';
import DownloadKeySmall from './downloadKeySmall';

function DownloadKey({ open, handleClose, scanId }) {

    const theme = useTheme();
    const IsMobileOrTable = useMediaQuery(theme.breakpoints.down('sm'));

    const dialogStyle = {
        //maxWidth: IsMobileOrTable ? '90%' : '540px',
        minHeight: 200,
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <>
            <Dialog
                fullScreen={IsMobileOrTable}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent sx={dialogStyle}>

                    {
                        IsMobileOrTable ? <DownloadKeySmall handleClose={handleClose} scanId={scanId} /> : <DownloadKeyBig handleClose={handleClose} scanId={scanId} />
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DownloadKey
