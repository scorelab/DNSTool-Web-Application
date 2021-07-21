import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { Chip } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const columns = [
    { field: 'id', headerName: 'ID', width: 80, sortable: false, headerAlign: 'center', },
    {
        field: 'state',
        headerName: 'State',
        width: 100,
        sortable: false,
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <>
                    {
                        params && params.row.state === 'Active' ?
                            (<Chip label={params.row.state} style={{ backgroundColor: '#dbf3e5' }} />) :
                            (<Chip label={params.row.state} />)
                    }
                </>

            )
        }
    },
    { field: 'scanningRegions', headerName: 'Scanning Regions', headerAlign: 'center', width: 180, sortable: false },
    { field: 'zones', headerName: 'Zones', width: 130, headerAlign: 'center', sortable: false },
    {
        field: 'key',
        headerName: 'Key',
        width: 130,
        sortable: false,
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <GetAppIcon />
            )
        }
    },
];

const rows = [
    { id: '34524352', state: 'Active', scanningRegions: 'US-EAST 1', zones: '.com', key: '23423' },
    { id: '34524435', state: 'Suspend', scanningRegions: 'US-EAST 2', zones: '.edu', key: '23423' },
    { id: '35345434', state: 'Active', scanningRegions: 'US-EAST 1', zones: '.lk', key: '324234' },
];

function ScanTable() {

    const useStyles = makeStyles({
        root: {
            '& .super-app-theme--header': {
                backgroundColor: 'rgba(255, 7, 0, 0.55)',
            },
        },
    });

    const classes = useStyles();

    return (
        <div style={{ height: 400, width: '100%' }} className={classes.root}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}

export default ScanTable
