import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import CreateScanModal from '../../createScan';
import CustomDrawer from '../sidebar';


function Navbar() {

    const useStyles = makeStyles({
        button: {
            backgroundColor: 'white !important'
        }
    });

    const [state, setstate] = useState({
        left: false
    })

    const classes = useStyles();

    const openDrawer = () => {
        setstate({
            left: true
        })
    }

    const closeDrawer = () => {
        setstate({
            left: false
        })
    }

    return (
        <>
            <AppBar position="static" sx={{ display: 'flex', height: '45px', justifyContent: 'center', zIndex: 150, zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        DNS-IP
                    </Typography>
                    {/* <Button onClick={handleOpen} className={classes.button} variant="outlined" >Create Scan</Button>
                    <CreateScanModal open={openCreateScanModal} handleClose={handleClose} /> */}
                    <CustomDrawer isOpen={state.left} open={openDrawer} close={closeDrawer} />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
