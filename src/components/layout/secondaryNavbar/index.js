import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import CreateScanModal from '../../createScan';
import { Divider, Stack } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import PageviewIcon from '@material-ui/icons/Pageview';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NewsSidebar from '../newsSidebar';

function SecondaryNavbar() {

    const [openCreateScanModal, setOpenCreateScanModal] = useState(false)
    const handleOpen = () => setOpenCreateScanModal(true);
    const handleClose = () => setOpenCreateScanModal(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [state, setstate] = useState({
        right: false
    })

    const openDrawer = () => {
        setstate({
            right: true
        })
    }

    const closeDrawer = () => {
        setstate({
            right: false
        })
    }

    return (
        <>
            <AppBar position="static" sx={{ display: 'flex', height: '45px', justifyContent: 'center' }} color="transparent" elevation={0}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {
                        isMobile ? (
                            <>
                                <Button size="small">Scans</Button>
                                <Button size="small" onClick={handleOpen}>Create</Button>
                                <Button size="small">Start</Button>
                                <Button size="small">Delete</Button>
                                <Button size="small" onClick={openDrawer}>News</Button>
                            </>
                        ) : (
                            <>
                                <Stack direction='row'>
                                    <Button startIcon={<PageviewIcon />} size="small">Scans</Button>
                                    <Button startIcon={<CreateIcon />} size="small" onClick={handleOpen}>Create a Scan</Button>
                                    <Button startIcon={<PlayArrowIcon />} size="small">Start</Button>
                                    <Button startIcon={<DeleteIcon />} size="small">Delete</Button>
                                </Stack>
                                <Button startIcon={<AnnouncementIcon />} onClick={openDrawer} size="small" >News</Button>
                            </>
                        )
                    }

                </Toolbar>
                <CreateScanModal open={openCreateScanModal} handleClose={handleClose} />
                <NewsSidebar open={openDrawer} close={closeDrawer} isOpen={state.right} />
            </AppBar>
            <Divider style={{ marginTop: '-2px' }} />
        </>
    )
}

export default SecondaryNavbar
