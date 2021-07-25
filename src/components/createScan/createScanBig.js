import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete'
import Button from '@material-ui/core/Button';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

import { useDispatch, useSelector } from 'react-redux'
import { getZoneList, getGCPZoneList } from '../../store/actions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CreateScanBig({ handleClose }) {

    const dispatch = useDispatch()
    const zoneListData = useSelector((state) => state.scanData.zonelist.data)
    const gcpZoneData = useSelector((state) => state.scanData.gcpzones.data)

    const getZones = (e) => {
        e.target.value && (e.target.value.length > 0) && getZoneList(e.target.value)(dispatch)
    }

    const getGCPZones = (e) => {
        e.target.value && (e.target.value.length > 0) && getGCPZoneList(e.target.value)(dispatch)
    }

    const [zoneList, setZoneList] = useState([])
    const [gcpZoneList, setGcpZoneList] = useState([])

    const [selectedList, setSelecteList] = useState({
        zones: [],
        regions: []
    })

    const handleChangeZones = (e, values) => {
        setSelecteList({
            ...selectedList,
            zones: values
        })
    }

    const handleChangeRegions = (e, values) => {
        setSelecteList({
            ...selectedList,
            regions: values
        })
    }


    useEffect(() => {
        setZoneList(zoneListData)
    }, [zoneListData])

    useEffect(() => {
        setGcpZoneList(gcpZoneData)
    }, [gcpZoneData])

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
                    <Grid item xs={4}>
                        <Stack spacing={5} style={{ marginTop: '20px' }}>
                            <div style={{ fontWeight: '300', fontSize: '18px' }}>
                                Sort By:
                            </div>
                            coming soon
                            <div>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={8}>
                        <Stack spacing={13}>
                            <Stack spacing={5} alignItems='center'>
                                <Autocomplete
                                    multiple
                                    id="selectZone"
                                    options={zoneList}
                                    onChange={handleChangeZones}
                                    onInputChange={getZones}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option}
                                        </li>
                                    )}
                                    style={{ width: 380 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Zone" />
                                    )}
                                />
                                <Autocomplete
                                    multiple
                                    id="selectRegion"
                                    options={gcpZoneList}
                                    onInputChange={getGCPZones}
                                    onChange={handleChangeRegions}
                                    disableCloseOnSelect
                                    getOptionLabel={(i) => i}
                                    renderOption={(props, i, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {i}
                                        </li>
                                    )}
                                    style={{ width: 380 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Region" />
                                    )}
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
        </div>
    )
}

export default CreateScanBig
