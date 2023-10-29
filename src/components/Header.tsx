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
    const helpTerms = [
        {
            term: "RPP",
            description: "Regional Price Parity (RPP) is a measure of the differences in the price levels of goods and services across states and metropolitan areas for a given year." +
                " RPPs are expressed as a percentage of the overall national price level for each year."
        }
    ]

    const AboutUs = () => {
        return (
            <div>
                <Typography variant="body1" gutterBottom>
                    <strong>Project Aim:</strong>{' '}
                    <br/>
                    After graduating college, many people choose to either move back to their hometown
                    or stay wherever they completed schooling. However, with hundreds of unique cities
                    across the United States alone, there are an overwhelming number of options for those
                    who are just starting their careers and those who are contemplating a change of location
                    to choose from. A lot of thought can go into moving to another city, and properties such as
                    cost of living, climate, work opportunities, and many more can be incredibly important when
                    it comes to making this decision. The team created this application with the intent of helping
                    young professionals and those considering a lifestyle change to find the city that best fits
                    their needs.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>About the Developers and the Project:</strong>
                    <br/>
                    This project was created by a team of eight students for CSDS 395: Senior Project
                    at Case Western Reserve University. Their names are listed below:
                    <ol>
                        <li>Peter Schlueter (<a href='https://www.linkedin.com/in/peter-schlueter-32b759165/'>LinkedIn</a>)</li>
                        <li>Martin Kovac</li>
                        <li>Tyler Avery</li>
                        <li>Vikranth Mallikarjun</li>
                        <li>Thomas Bornhorst</li>
                        <li>Fatih Ahmet Gurbuz</li>
                        <li>Ziyad Sbeih</li>
                        <li>Francis Mungai</li>
                    </ol>
                </Typography>
            </div>
        )
    }

    const Credits = () => {
        return (
            <div>
                <Typography variant="body1" gutterBottom>
                    <strong>APIs Used:</strong>
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

    const Help = () => {
        return (
            <div>
                <Typography variant="body1" gutterBottom>
                    <strong>Measurements and their Meanings:</strong>
                </Typography>
                <ol>
                    {helpTerms.map((term) => {
                        return (
                            <li>
                                <Typography>
                                    <strong>{term.term}:</strong>{' '}
                                    {term.description}
                                </Typography>
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }

    const navItems = [
        {
            buttonTitle: 'About Us',
            popupProps: {
                title: 'About Us',
                content: <AboutUs />,
                popupOpen: aboutPopupOpen,
                setPopupOpen: setAboutPopupOpen
            }
        },
        {
            buttonTitle: 'Help',
            popupProps: {
                title: 'Help',
                content: <Help />,
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