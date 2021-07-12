import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import CreateScanModal from '../../createScan';


function Navbar() {

    const useStyles = makeStyles({
        button: {
            backgroundColor: 'white !important'
        }
    });

    const classes = useStyles();

    const [openCreateScanModal, setOpenCreateScanModal] = useState(false)
    const handleOpen = () => setOpenCreateScanModal(true);
    const handleClose = () => setOpenCreateScanModal(false);

    return (
        <>
            <AppBar position="static" style={{ display: 'flex' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        DNS-IP
                    </Typography>
                    <Button onClick={handleOpen} className={classes.button} variant="outlined" >Create Scan</Button>
                    <CreateScanModal open={openCreateScanModal} handleClose={handleClose} />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
