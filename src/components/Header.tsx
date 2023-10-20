import React from "react";
import {AppBar, MenuItem, Toolbar, Typography} from "@mui/material";

const CityPreferencesForm = () => {
    return (
        <div>
            <AppBar position="static" className='header-bar'>
                <Toolbar>
                    <Typography variant='h4' component='div' className='header-bar-text' align='left'>
                        UDS: Urban Discovery System
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default CityPreferencesForm;