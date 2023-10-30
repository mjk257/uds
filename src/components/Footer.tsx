import React from 'react';
import { AppBar, Toolbar, Typography, Container, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <AppBar position="static" className='footer'>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="body2" color="inherit" style={{ flex: 1 }} align='center' data-testid='uds-footer-test'>
                        &copy; {new Date().getFullYear()} UDS: Urban Discovery System
                    </Typography>
                </Toolbar>
                <Link href='https://github.com/mjk257/uds' target='_blank' className='footer-link' data-testid='github-footer-icon'>
                    <GitHubIcon />
                </Link>
            </Container>
        </AppBar>
    );
};

export default Footer;