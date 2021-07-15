import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import CreateScanModal from '../../createScan';
import { Divider } from '@material-ui/core';

function SecondaryNavbar() {

    const [openCreateScanModal, setOpenCreateScanModal] = useState(false)
    const handleOpen = () => setOpenCreateScanModal(true);
    const handleClose = () => setOpenCreateScanModal(false);

    return (
        <>
            <AppBar position="static" sx={{ display: 'flex',height:'45px',justifyContent:'center' }} color="transparent" elevation={0}>
                <Toolbar>
                    <Button size="small">Scans</Button>
                    <Button size="small" onClick={handleOpen}>Create a Scan</Button>
                    <Button size="small">Start</Button>
                    <Button size="small">Delete</Button>
                    <CreateScanModal open={openCreateScanModal} handleClose={handleClose} />
                </Toolbar>
            </AppBar>
            <Divider style={{marginTop:'-2px'}}/>
        </>
    )
}

export default SecondaryNavbar
