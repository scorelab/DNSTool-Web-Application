import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

function Spinner() {
    return (
        <>
            <Box sx={{ display: 'flex' ,height:'100vh',width:'100vw',justifyContent:'center',alignItems:'center'}}>
                <CircularProgress size="3.5rem"/>
            </Box>
        </>
    )
}

export default Spinner
