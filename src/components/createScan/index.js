import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CreateScanBig from './createScanBig';
import CreateScanSmall from './createScanSmall';

function CreateScanModal({ open, handleClose }) {

    const theme = useTheme();
    const IsMobileOrTable = useMediaQuery(theme.breakpoints.down('sm'));

    const dialogStyle = {
        maxWidth: IsMobileOrTable?'90%':'540px',
        minHeight: 400,
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
                        IsMobileOrTable ? <CreateScanSmall handleClose={handleClose} /> : <CreateScanBig handleClose={handleClose} />
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateScanModal
