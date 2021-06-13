import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

const columns = [
    { field: 'name', headerName: 'ID', width: 80, sortable: false },
    { field: 'state', headerName: 'State', width: 100, sortable: false },
    { field: 'cloud', headerName: 'Cloud', width: 100, sortable: false },
    {
        field: 'maxCPU',
        headerName: 'Max CPU',
        type: 'number',
        width: 130,
        sortable: false
    },
    {
        field: 'maxGPU',
        headerName: 'Max GPU',
        sortable: false,
        width: 130,
        type: 'number',
    },
    {
        field: 'regions',
        headerName: 'Regions',
        sortable: false,
        width: 120,
    },
    {
        field: 'date',
        headerName: 'Date',
        description: 'Initialized Date',
        sortable: false,
        width: 100,
    },
    {
        field: 'key',
        headerName: 'Key',
        description: 'Click To Copy The Token',
        sortable: false,
        width: 80,
    },
];

const rows = [

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
