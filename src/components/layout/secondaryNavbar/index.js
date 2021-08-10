import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CreateScanModal from '../../createScan';
import { Divider, Snackbar, Stack, Alert } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import PageviewIcon from '@material-ui/icons/Pageview';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NewsSidebar from '../newsSidebar';
import { useDispatch, useSelector } from 'react-redux'
import DeletePrompt from '../../prompts/DeletePrompt';
import { useFirebase } from 'react-redux-firebase';
import { updateScanState } from '../../../store/actions';

function SecondaryNavbar() {

    const dispatch = useDispatch()
    const selectedScans = useSelector((state) => state.scanData.selectedScanList.data)
    const scanDataList = useSelector((state) => state.scanData.scanlist.data)
    const updateStateMsg = useSelector((state) => state.scanData.updateScanState)

    const firebase = useFirebase()

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        console.log(selectedScans)
        if (selectedScans.length > 0 && scanDataList[selectedScans[0]]['state'] === 'active') setIsActive(true)
        else setIsActive(false)
    }, [selectedScans])

    const [openCreateScanModal, setOpenCreateScanModal] = useState(false)
    const handleOpen = () => setOpenCreateScanModal(true);
    const handleClose = () => setOpenCreateScanModal(false);

    const [deletePromptIsVisible, setDeletePromptIsVisible] = useState(false)
    const handleOpenDeletePrompt = () => setDeletePromptIsVisible(true)
    const handleCloseDeletePrompt = () => setDeletePromptIsVisible(false)

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

    const [open, setOpen] = useState(false);
    const [snackBarOptions, setSnackbarOptions] = useState({
        color: 'success',
        msg: ''
    })


    const handleCloseSnackBar = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log(updateStateMsg)
        if (updateStateMsg.error) {
            setSnackbarOptions({
                color: 'error',
                msg: updateStateMsg.error
            })
            setOpen(true)
        } else if (updateStateMsg.message) {
            setSnackbarOptions({
                color: 'success',
                msg: updateStateMsg.message
            })
            setOpen(true)
        }
    }, [updateStateMsg])


    const changeActiveState = () => {
        if (selectedScans.length > 1) {
            setSnackbarOptions({
                color: 'warning',
                msg: 'Please select only one scan'
            })
            setOpen(true)
        } else {
            updateScanState(selectedScans[0], scanDataList[selectedScans[0]]['state'], firebase)(dispatch)
        }
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
                                {
                                    isActive ?
                                        (<Button onClick={changeActiveState} disabled={(selectedScans.length) > 0 ? false : true} size="small">Stop</Button>)
                                        :
                                        (<Button onClick={changeActiveState} disabled={(selectedScans.length) > 0 ? false : true} size="small">Start</Button>)
                                }
                                <Button disabled={(selectedScans.length) > 0 ? false : true} onClick={handleOpenDeletePrompt} size="small">Delete</Button>
                                <Button size="small" onClick={openDrawer}>News</Button>
                            </>
                        ) : (
                            <>
                                <Stack direction='row'>
                                    <Button startIcon={<PageviewIcon />} size="small">Scans</Button>
                                    <Button startIcon={<CreateIcon />} size="small" onClick={handleOpen}>Create a Scan</Button>
                                    {
                                        isActive ?
                                            (<Button startIcon={<PauseIcon />} onClick={changeActiveState} disabled={(selectedScans.length) > 0 ? false : true} size="small">Stop</Button>)
                                            :
                                            (<Button startIcon={<PlayArrowIcon />} onClick={changeActiveState} disabled={(selectedScans.length) > 0 ? false : true} size="small">Start</Button>)
                                    }
                                    <Button startIcon={<DeleteIcon />} disabled={(selectedScans.length) > 0 ? false : true} onClick={handleOpenDeletePrompt} size="small">Delete</Button>
                                </Stack>
                                <Button startIcon={<AnnouncementIcon />} onClick={openDrawer} size="small" >News</Button>
                            </>
                        )
                    }

                </Toolbar>
                <CreateScanModal open={openCreateScanModal} handleClose={handleClose} />
                <DeletePrompt open={handleOpenDeletePrompt} isOpen={deletePromptIsVisible} close={handleCloseDeletePrompt} />
                <NewsSidebar open={openDrawer} close={closeDrawer} isOpen={state.right} />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleCloseSnackBar} severity={snackBarOptions.color} sx={{ width: '100%' }}>
                        {snackBarOptions.msg}
                    </Alert>
                </Snackbar>
            </AppBar>
            <Divider style={{ marginTop: '-2px' }} />
        </>
    )
}

export default SecondaryNavbar
