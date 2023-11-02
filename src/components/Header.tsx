import React from "react";
import {
    AppBar,
    Box,
    Button,
    Link,
    Toolbar,
    Typography
} from "@mui/material";
import Popup from "./Popup";
import {GitHub} from "@mui/icons-material";

const Header = () => {

    const headerSx = { display: { xs: 'none', sm: 'block' } };
    const [aboutPopupOpen, setAboutPopupOpen] = React.useState(false);
    const [creditsPopupOpen, setCreditsPopupOpen] = React.useState(false);
    const [helpPopupOpen, setHelpPopupOpen] = React.useState(false);

    const apiCredits = [
        {
            apiName: "Population Estimate Dataset by the US Census Bureau (2019)",
            apiLink: "https://www.census.gov/data/developers/data-sets/popest-popproj/popest.Vintage_2019.html#list-tab-2014455046"
        },
        {
            apiName: "Geocoding API",
            apiLink: "https://geocode.maps.co"
        },
        {
            apiName: "Koppen Geiger Climate Zones API",
            apiLink: "http://climateapi.scottpinkelman.com"
        },
        {
            apiName: "RPP Dataset (Cost of Living) by the Bureau of Economic Analysis (2021)",
            apiLink: "https://www.bea.gov/news/2022/real-personal-consumption-expenditures-state-and-real-personal-income-state-and"
        },
        {
            apiName: "Partisan Lean Dataset by FiveThirtyEight (2021)",
            apiLink: "https://github.com/fivethirtyeight/data/tree/master/partisan-lean/2021"
        },
        {
            apiName: "WebAPI Job Counts/Salaries by CareerOneStop",
            apiLink: "https://www.careeronestop.org/Developers/WebAPI/technical-information.aspx"
        },
        {
            apiName: "PAD-US Dataset by U.S. Geological Survey (2022)",
            apiLink: "https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-overview"
        },
        {
            apiName: "Outdoor Recreation Dataset by Bureau of Economic Analysis (2021)",
            apiLink: "https://www.bea.gov/data/special-topics/outdoor-recreation"
        },
        {
            apiName: "AQI by CBSA Dataset by Environmental Protection Agency (2022)",
            apiLink: "https://aqs.epa.gov/aqsweb/airdata/download_files.html#Annual"
        },
        {
            apiName: "Environmental Protection Agency Toxic Release Index Dataset (2022)",
            apiLink: "https://www.epa.gov/toxics-release-inventory-tri-program"
        },
        {
            apiName: "U.S. Census State Area Measurements and Internal Point Coordinates Dataset (2010)",
            apiLink: "https://www.census.gov/geographies/reference-files/2010/geo/state-area.html"
        }


    ]
    const helpTerms = [
        {
            term: "RPP",
            description: "Regional Price Parity (RPP) is a measure of the differences in the price levels of goods and services across states and metropolitan areas for a given year." +
                " RPPs are expressed as a percentage of the overall national price level for each year."
        },
        {
            term: "Outdoor Score",
            description: "The outdoor score is calculated using a weighted, curved average using the percentage of the state covered by GAP-1, GAP-2, and GAP-3 protected areas, percentage of the state" +
            " economy made up by the outdoor recreation industry, median annual air quality, LBs of chemicals released annually per state square mile, and miles of trail per state square mile."
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
                    <ul>
                        <li>Peter Schlueter (<a href='https://www.linkedin.com/in/peter-schlueter-32b759165/'>LinkedIn</a>)</li>
                        <li>Jack Kovac (<a href='https://www.linkedin.com/in/martin-j-kovac/'>LinkedIn</a>)</li>
                        <li>Tyler Avery</li>
                        <li>Vikranth Mallikarjun</li>
                        <li>Thomas Bornhorst</li>
                        <li>Fatih Ahmet Gurbuz</li>
                        <li>Ziyad Sbeih</li>
                        <li>Francis Mungai</li>
                    </ul>
                </Typography>
            </div>
        )
    }

    const Credits = () => {
        return (
            <div>
                <Typography variant="body1" gutterBottom>
                    <strong>APIs & Datasets Used:</strong>
                </Typography>
                <ol>
                    {apiCredits.map((api) => {
                        return (
                            <li>
                                <Typography>
                                    <a href={api.apiLink} target="_blank" rel="noopener noreferrer">
                                        {api.apiName}
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

    const navButtons = [
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

    const navIcons = [
        {
            icon: <GitHub sx={ { paddingLeft: 2 }} data-testid='github-header-icon'/>,
            link: "https://github.com/mjk257/uds"
        }
    ]

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
                        {navButtons.map((item) => (
                            <>
                                <Button key={ item.buttonTitle } color='inherit' onClick={ () => item.popupProps.setPopupOpen(true) }>
                                    { item.buttonTitle }
                                </Button>
                                <Popup key={ item.buttonTitle + " Popup" } { ...item.popupProps } />
                            </>
                        ))}
                    </Box>
                    {navIcons.map((item) => (
                        <Link key={ item.link } color='inherit' href={ item.link } target="_blank">
                            { item.icon }
                        </Link>
                    ))}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;