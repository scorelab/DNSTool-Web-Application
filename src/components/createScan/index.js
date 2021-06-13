import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Grid } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete'
import Button from '@material-ui/core/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    minHeight: 350,
    bgcolor: 'background.paper',
    boxShadow: 10,
    borderRadius: '6px',
    p: 4,
};

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 }
]

function CreateScanModal({ open, handleClose }) {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" textAlign='center' style={{ marginTop: '-15px' }}>
                        Create A Scan
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '5px' }}>
                        Filters
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Stack spacing={5} style={{ marginTop: '20px' }}>
                                <div style={{ fontWeight: '300', fontSize: '18px' }}>
                                    Sort By:
                                </div>
                                <div>
                                    <div style={{ fontWeight: '300', fontSize: '18px' }}>
                                        Sort Direction:
                                    </div>
                                    <Stack>
                                        <RadioGroup
                                            aria-label="gender"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            style={{ marginLeft: '10px', marginTop: '10px' }}
                                        >
                                            <FormControlLabel value="Ascending" control={<Radio />} label="Ascending" sx={{ fontSize: '12px' }} />
                                            <FormControlLabel value="Descending" control={<Radio />} label="Descending" />
                                        </RadioGroup>
                                    </Stack>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack spacing={13}>
                                <Stack spacing={5} alignItems='center'>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 380 }}
                                        renderInput={(params) => <TextField {...params} label="Select Zone" variant="outlined" />}
                                    />
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 380 }}
                                        renderInput={(params) => <TextField {...params} label="Select Region" variant="outlined" />}
                                    />
                                </Stack>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" style={{ marginLeft: '-40px', width: '90px' }}>OK</Button>
                                    <Button variant="contained" onClick={handleClose} style={{ marginLeft: '40px' }}>Cancel</Button>
                                </div>
                            </Stack>

                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default CreateScanModal
