import React from 'react'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


function NewsCard() {
    return (
        <>
            <Card sx={{ minWidth: 275 }} style={{ backgroundColor: 'rgba(9, 109, 217, 0.13)', minHeight: '300px', width: '250px', margin: '20px' }}>
                <CardHeader title="News" sx={{ backgroundColor: 'rgba(9, 109, 217, 0.33)', height: '6px', textAlign: 'left' }} />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default NewsCard
