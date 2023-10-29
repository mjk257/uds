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

    const apiCredits = [
        {
            apiName: "Population Estimate API by the US Census Bureau (2019)",
            apiLink: "https://www.census.gov/data/developers/data-sets/popest-popproj/popest.Vintage_2019.html#list-tab-2014455046"
        },
        {
            apiName: "Geocoding API",
            apiLink: "https://geocode.maps.co"
        },
        {
            apiName: "Climate Zones API",
            apiLink: "http://climateapi.scottpinkelman.com"
        },
        {
            apiName: "RPP API (Cost of Living)",
            apiLink: "https://www.bea.gov/news/2022/real-personal-consumption-expenditures-state-and-real-personal-income-state-and"
        },
        {
            apiName: "Partisan Lean API by FiveThirtyEight",
            apiLink: "https://github.com/fivethirtyeight/data/tree/master/partisan-lean"
        },
        {
            apiName: "WebAPI Job Counts/Salaries by CareerOneStop",
            apiLink: "https://www.careeronestop.org/Developers/WebAPI/technical-information.aspx"
        }
    ]

    const Credits = () => {
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    APIs Used:
                </Typography>
                <ol>
                    {apiCredits.map((api) => {
                        return (
                            <li>
                                <Typography>
                                    <strong>{api.apiName}:</strong>{' '}
                                    <a href={api.apiLink} target="_blank" rel="noopener noreferrer">
                                        {api.apiLink}
                                    </a>
                                </Typography>
                            </li>
                        )
                    })}
                </ol>
            </div>
        );
    }

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
                content: <Credits />,
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