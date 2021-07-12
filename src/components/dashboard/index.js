import React from 'react'
import Navbar from '../layout/navbar'
import Grid from '@material-ui/core/Grid';
import NewsCard from '../newsCard';
import ScanTable from '../scanTable';
import Scanbuttons from './Scanbuttons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function Dashboard() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Navbar />
            <Grid container spacing={2} style={{ padding: !isMobile ? '10px 30px 0px 70px' : '10px 20px' }}>
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
