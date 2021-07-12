import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CreateScanBig from './createScanBig';
import CreateScanSmall from './createScanSmall';

const dialogStyle = {
    width: '90%',
    minHeight: 400,
    display: 'flex',
    justifyContent: 'center'
}

function CreateScanModal({ open, handleClose }) {

    const theme = useTheme();
    const IsMobileOrTable = useMediaQuery(theme.breakpoints.down('md'));

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
                        IsMobileOrTable ? <CreateScanSmall handleClose={handleClose} /> : <CreateScanBig handleClose={handleClose} />
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateScanModal
