import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Accordion, AccordionSummary, Typography, AccordionDetails, Icon
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

/*
The following Props will be needed in the future:
1.) cityName => String
2.) citySummary => String
3.) cityDetails => Object (preferably of type CityDetails, which will be figured out when we set up the data pipeline
 */

// This will likely take in props later on, but the base styling will be set up
const CityResponseCard = ({ cityDetails } : Props) => {

    const accordionDetails = [
        { title: 'Population', value: cityDetails?.population },
        { title: 'Population Density', value: cityDetails?.populationDensity },
        { title: 'Cost of Living', value: cityDetails?.costOfLiving },
        { title: 'Number of Jobs', value: cityDetails?.preferredJobIndustry },
        { title: 'Crime Rate', value: cityDetails?.crimeRate },
        { title: 'Walkability/Transability', value: cityDetails?.walkAndTransability },
        { title: 'Politics', value: cityDetails?.politics },
        { title: 'Quality of Education', value: cityDetails?.qualityOfEducation },
        { title: 'Climate', value: cityDetails?.climate },
        { title: 'Average Population Age', value: cityDetails?.avgPopulationAge }
    ];

    return (
        <Card className='city-response'>
            <CardHeader title={ cityDetails?.name } titleTypographyProps={{ align: 'left' }} />
            <CardContent className='city-response-content'>
                { cityDetails?.summary }
                <Accordion className='city-response-details'>
                    <AccordionSummary
                        expandIcon={ <Icon style={{ color: 'black !important' }}><ExpandMore /></Icon> }
                    >
                        <Typography>City Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        { accordionDetails.map((item, idx) => {
                            return (
                                <Typography key={ idx }>
                                    { `${item.title}: ${item.value}` }
                                </Typography>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}

type Props = {
    cityDetails: any
}

export default CityResponseCard;