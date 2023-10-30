import React from 'react';
import { AppBar, Toolbar, Typography, Container, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <AppBar position="static" className='footer'>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="body2" color="inherit" style={{ flex: 1 }} align='center'>
                        &copy; {new Date().getFullYear()} UDS: Urban Discovery System
                    </Typography>
                    <Link href='https://github.com/mjk257/uds' target='_blank' className='footer-link'>
                        <GitHubIcon />
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;