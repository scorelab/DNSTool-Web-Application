import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { deleteScan } from '../../store/actions';

function DeletePrompt({ open, isOpen, close }) {

    const firebase = useFirebase()
    const dispatch = useDispatch()
    const selectedScans = useSelector((state) => state.scanData.selectedScanList.data)

    const deleteScans = () => {
        close()
        deleteScan(selectedScans, firebase)(dispatch)
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do You want To Delete the Scans?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {selectedScans && selectedScans.map(i =>
                        (
                            <span key={i} style={{ marginRight: '5px' }}>
                                {i},
                            </span>
                        )
                        )

                        } Scans will be deleted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={deleteScans}>Delete Scans</Button>
                    <Button onClick={close} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeletePrompt
