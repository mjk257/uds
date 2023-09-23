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
                        <Typography>
                            Insert Population Here
                        </Typography>
                        <Typography>
                            Insert Population Density Here
                        </Typography>
                        <Typography>
                            Insert Cost of Living Here
                        </Typography>
                        <Typography>
                            Insert Number of Jobs Here
                        </Typography>
                        <Typography>
                            Insert Crime Rate Here
                        </Typography>
                        <Typography>
                            Insert Walkability/Transability Here
                        </Typography>
                        <Typography>
                            Insert Politics Here
                        </Typography>
                        <Typography>
                            Insert Quality of Education Here
                        </Typography>
                        <Typography>
                            Insert Climate Here
                        </Typography>
                        <Typography>
                            Insert Average Population Age Here
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default CityResponseCard;