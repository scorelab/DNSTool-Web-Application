import React, { useState, useEffect } from 'react'
import Navbar from '../layout/navbar'
import Grid from '@material-ui/core/Grid';
import ScanTable from '../scanTable';
import { useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SecondaryNavbar from '../layout/secondaryNavbar';
import { Alert, Snackbar } from '@material-ui/core';

function Dashboard() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const deleteScanResult = useSelector((state) => state.scanData.deleteScan)
    const createScanMsg = useSelector((state) => state.scanData.createScan)

    const [open, setOpen] = useState(false);
    const [snackBarOptions, setSnackbarOptions] = useState({
        color: 'success',
        msg: ''
    })

    const handleCloseSnackBar = () => {
        setOpen(false);
    };

    useEffect(() => {
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
        if (createScanMsg.message) {
            setSnackbarOptions({
                color: 'success',
                msg: createScanMsg.message
            })
            setOpen(true)
        }
    }, [deleteScanResult.message, deleteScanResult.error, createScanMsg.message])

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
