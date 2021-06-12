import { Button } from '@material-ui/core'
import React from 'react'

function Scanbuttons() {
    return (
        <div style={{ marginBottom: '40px' }}>
            <div style={{ textAlign: 'start', fontSize: '28px', marginTop: '20px' }}>
                About Us
                    </div>
            <div style={{ textAlign: 'start', fontSize: '18px', marginTop: '10px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula venenatis mi. Pellentesque lectus est,
                    </div>
            <div style={{ textAlign: 'start', fontSize: '28px', margin: '20px 0px' }}>
                Scans
                    </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Button variant="outlined" style={{ margin: '5px' }}>Start</Button>
                <Button variant="outlined" style={{ margin: '5px' }}>Suspend</Button>
                <Button variant="outlined" style={{ margin: '5px' }}>Remove the Scan</Button>
            </div>
        </div>
    )
}

export default Scanbuttons
