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
const CityResponseCard = () => {

    const accordionDetails = [
        { title: 'Population' },
        { title: 'Population Density' },
        { title: 'Cost of Living' },
        { title: 'Number of Jobs' },
        { title: 'Crime Rate' },
        { title: 'Walkability/Transability' },
        { title: 'Politics' },
        { title: 'Quality of Education' },
        { title: 'Climate' },
        { title: 'Average Population Age' }
    ];

    return (
        <Card className='city-response'>
            <CardHeader title='Insert City Name Prop Here' titleTypographyProps={{ align: 'left' }} />
            <CardContent className='city-response-content'>
                Insert Chat GPT Summary Here
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
                                    { item?.title }
                                </Typography>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default CityResponseCard;