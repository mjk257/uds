import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Accordion, AccordionSummary, Typography, AccordionDetails, Icon
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

// This will likely take in props later on, but the base styling will be set up
const CityResponseCard = ({ cityDetails, rank } : Props) => {

    const costOfLivingToString = (rpp: number) => {
        if (rpp === 100) {
            return "Equal to the average cost of living in the U.S.A";
        }
        else if (rpp > 100) {
            const roundedRpp = (rpp - 100).toFixed(2);
            return `${roundedRpp}% higher than the average cost of living in the U.S.A`;
        }
        else {
            const roundedRpp = (100 - rpp).toFixed(2);
            return `${roundedRpp}% lower than the average cost of living in the U.S.A`;
        }
    }

    const accordionDetails = [
        { title: 'Population', value: cityDetails?.population ? cityDetails?.population : "N/A" },
        { title: 'Population Density', value: cityDetails?.density ? cityDetails?.density : "N/A" },
        { title: 'Cost of Living', value: cityDetails?.rpp ? costOfLivingToString(cityDetails?.rpp) : "N/A" },
        { title: 'Number of Jobs', value: cityDetails?.preferredOccupation ? cityDetails?.preferredOccupation : "N/A" },
        { title: 'Crime Rate', value: cityDetails?.crimeRate ? cityDetails?.crimeRate : "N/A" },
        { title: 'Walkability/Transability', value: cityDetails?.walkAndTransability ? cityDetails?.walkAndTransability : "N/A" },
        { title: 'Politics', value: (cityDetails?.partisan_lean && cityDetails?.partisan_lean > 0)  ?
                "Democrat" : (cityDetails?.partisan_lean && cityDetails?.partisan_lean < 0) ? "Republican" : "N/A" },
        { title: 'Quality of Education', value: cityDetails?.qualityOfEducation ? cityDetails?.qualityOfEducation : "N/A" },
        { title: 'Climate', value: cityDetails?.zone_description ? cityDetails?.zone_description : "N/A" },
        { title: 'Average Population Age', value: cityDetails?.avgPopulationAge ? cityDetails?.avgPopulationAge : "N/A" },
    ];

    return (
        <Card className='city-response'>
            <CardHeader title={ `${rank}.) ${cityDetails?.name}, ${cityDetails?.state}` } titleTypographyProps={{ align: 'left' }} />
            <CardContent className='city-response-content'>
                { cityDetails?.summary ? <Typography>{ cityDetails?.summary }</Typography> : "N/A" }
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
    rank: number
}

export default CityResponseCard;