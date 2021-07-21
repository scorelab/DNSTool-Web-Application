import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const drawerWidth = 240;


function NewsSidebar({ isOpen, open, close }) {



    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            <List>
                {['News'/* 'Starred', 'Send email', 'Drafts' */].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );


    return (
        <>
            <SwipeableDrawer
                anchor='right'
                open={isOpen}
                onClose={close}
                onOpen={open}
            >
                {list('right')}
            </SwipeableDrawer>
        </>
    )
}

export default NewsSidebar
