import React from 'react'
import Navbar from '../layout/navbar'
import Grid from '@material-ui/core/Grid';
import NewsCard from '../newsCard';
import ScanTable from '../scanTable';
import Scanbuttons from './Scanbuttons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SecondaryNavbar from '../layout/secondaryNavbar';

function Dashboard() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Navbar />
            <SecondaryNavbar />
            <Grid container spacing={2} style={{ padding: !isMobile ? '10px 30px 0px 70px' : '10px 20px' }}>
                <Grid item xs={12}  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Scanbuttons />
                        <ScanTable />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
