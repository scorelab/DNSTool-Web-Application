import React from 'react'
import Navbar from '../layout/navbar'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewsCard from '../newscard';
import ScanTable from '../scantable';
import Scanbuttons from './Scanbuttons';

function Dashboard() {
    return (
        <>
            <Navbar />
            <Grid container spacing={2} style={{ padding: '10px 30px 0px 70px' }}>
                <Grid item xs={12} md={9} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Scanbuttons />
                        <ScanTable />
                    </div>
                </Grid>
                <Grid item xs={12} md={3} justifyContent='center' alignItems='center'>
                    <NewsCard />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
