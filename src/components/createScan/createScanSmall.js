import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete'
import Button from '@material-ui/core/Button';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

function CreateScanSmall({ handleClose }) {
    return (
        <div>
            <Box sx={{ width: '500px', margin: '20px' }}>
                <Typography id="modal-modal-title" variant="h5" component="h2" textAlign='center' style={{ marginTop: '-15px' }}>
                    Create A Scan
                    </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '5px' }}>
                    Filters
                    </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} justifyContent="center">
                        <Stack spacing={5} style={{ marginTop: '20px' }} alignItems="center">
                            <div style={{ fontWeight: '300', fontSize: '18px' }}>
                                Sort By:
                                </div>
                                coming soon
                            <div>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8} >
                        <Stack spacing={13}>
                            <Stack spacing={5} alignItems='center' sx={{ padding: '20px' }}>
                                <Autocomplete
                                    multiple
                                    id="selectZone"
                                    options={top100Films}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
                                    style={{ width: '70%' }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Zone" />
                                    )}
                                />
                                <Autocomplete
                                    multiple
                                    id="selectRegion"
                                    options={top100Films}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
                                    style={{ width: '70%' }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Region" />
                                    )}
                                />
                                <Stack direction='row' spacing={5} style={{ marginTop: '80px' }}>
                                    <Button variant="contained" style={{ width: '90px' }}>OK</Button>
                                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                                </Stack>
                            </Stack>
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default CreateScanSmall
