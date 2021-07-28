import React, { useState, useEffect } from 'react'
import Navbar from '../layout/navbar'
import Grid from '@material-ui/core/Grid';
import NewsCard from '../newsCard';
import ScanTable from '../scanTable';
import Scanbuttons from './Scanbuttons';
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SecondaryNavbar from '../layout/secondaryNavbar';
import DownloadKey from './downloadKey';
import { Alert, Snackbar } from '@material-ui/core';

function Dashboard() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [openKeyDownloadModal, setOpenKeyDownloadModal] = useState(false)
    const handleOpen = () => setOpenKeyDownloadModal(true);
    const handleClose = () => setOpenKeyDownloadModal(false);

    const deleteScanResult = useSelector((state) => state.scanData.deleteScan)

    const [open, setOpen] = useState(false);
    const [snackBarOptions, setSnackbarOptions] = useState({
        color: 'success',
        msg: ''
    })

    const handleCloseSnackBar = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log(deleteScanResult)
        if (deleteScanResult.error) {
            setSnackbarOptions({
                color: 'error',
                msg: deleteScanResult.error
            })
            setOpen(true)
        } else if (deleteScanResult.message) {
            setSnackbarOptions({
                color: 'success',
                msg: deleteScanResult.message
            })
            setOpen(true)
        }
    }, [deleteScanResult])

    return (
        <>
            <Navbar />
            <SecondaryNavbar />
            <Grid container spacing={2} style={{ padding: !isMobile ? '10px 30px 0px 30px' : '10px 20px' }}>
                <Grid item xs={12} justifyContent='center' sx={{ marginTop: '20px' }}>
                    <ScanTable />
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleCloseSnackBar} severity={snackBarOptions.color} sx={{ width: '100%' }}>
                        {snackBarOptions.msg}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}

export default Dashboard
