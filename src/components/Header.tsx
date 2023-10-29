import React from "react";
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";
import Popup from "./Popup";

const CityPreferencesForm = () => {

    const headerSx = { display: { xs: 'none', sm: 'block' } };
    const [aboutPopupOpen, setAboutPopupOpen] = React.useState(false);
    const [creditsPopupOpen, setCreditsPopupOpen] = React.useState(false);
    const [helpPopupOpen, setHelpPopupOpen] = React.useState(false);
    const navItems = [
        {
            buttonTitle: 'About Us',
            popupProps: {
                title: 'About Us',
                content: "Lorem Ipsum",
                popupOpen: aboutPopupOpen,
                setPopupOpen: setAboutPopupOpen
            }
        },
        {
            buttonTitle: 'Help',
            popupProps: {
                title: 'Help',
                content: "Lorem Ipsum Dolem Dolem Dolem Dolem Dolem Dolem Dolem",
                popupOpen: helpPopupOpen,
                setPopupOpen: setHelpPopupOpen
            }
        },
        {
            buttonTitle: 'Credits',
            popupProps: {
                title: 'Credits',
                content: "Lorem Ipsum",
                popupOpen: creditsPopupOpen,
                setPopupOpen: setCreditsPopupOpen
            }
        }
    ];

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
                            <>
                                <Button key={ item.buttonTitle } color='inherit' onClick={ () => item.popupProps.setPopupOpen(true) }>
                                    { item.buttonTitle }
                                </Button>
                                <Popup key={ item.buttonTitle + " Popup" } { ...item.popupProps } />
                            </>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default CityPreferencesForm;