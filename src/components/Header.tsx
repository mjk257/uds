import React from "react";
import {AppBar, Box, Button, Grid, MenuItem, Toolbar, Typography} from "@mui/material";

const CityPreferencesForm = () => {

    const navItems = ['About Us', 'Credits', 'Help'];
    const headerSx = { display: { xs: 'none', sm: 'block' } };

    return (
        <div>
            <AppBar position="static" className='header-bar'>
                <Toolbar>
                    <Typography variant='h4' component='div'
                                className='header-bar-text' align='left'
                                sx={ headerSx }>
                        UDS: Urban Discovery System
                    </Typography>
                    <Box sx={ headerSx }>
                        {navItems.map((item) => (
                            <Button key={item} color='inherit'>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default CityPreferencesForm;