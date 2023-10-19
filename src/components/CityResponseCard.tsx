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
        const roundedRpp = Math.abs(rpp - 100).toFixed(2);
        if (rpp === 100) {
            return "Equal to the average cost of living in the U.S.A";
        }
        else if (rpp > 100) {
            return `${roundedRpp}% higher than the average cost of living in the U.S.A`;
        }
        else {
            return `${roundedRpp}% lower than the average cost of living in the U.S.A`;
        }
    }

    const populationToString = (population: number) => {
        return population + " people";
    }

    const populationDensityToString = (density: number) => {
        return density + " people per square mile";
    }

    const crimeRateToString = (crimeRate: number) => {
        return crimeRate + " crimes per 100,000 people";
    }

    const politicsToString = (partisan_lean: number) => {
        const roundedPartisanLean = (100 - Math.abs(partisan_lean)).toFixed(2);
        if (partisan_lean === 0) {
            return "Moderate, there is no major partisan lean in this area.";
        }
        else if (partisan_lean > 0) {
            return `${roundedPartisanLean}% more democratic than the average city in the U.S.A`;
        }
        else {
            return `${roundedPartisanLean}% more republican than the average city in the U.S.A`;
        }
    }

    const averagePopulationAgeToString = (avgPopulationAge: number) => {
        return avgPopulationAge + " years old";
    }

    const accordionDetails = [
        { title: 'Population', value: cityDetails?.population ? populationToString(cityDetails.population) : "N/A" },
        { title: 'Population Density', value: cityDetails?.density ? populationDensityToString(cityDetails.density) : "N/A" },
        { title: 'Cost of Living', value: cityDetails?.rpp ? costOfLivingToString(cityDetails?.rpp) : "N/A" },
        { title: 'Number of Jobs', value: cityDetails?.preferredOccupation ? cityDetails?.preferredOccupation : "N/A" },
        { title: 'Crime Rate', value: cityDetails?.crimeRate ? crimeRateToString(cityDetails.crimeRate) : "N/A" },
        { title: 'Walkability/Transability', value: cityDetails?.walkAndTransability ? cityDetails.walkAndTransability : "N/A" },
        { title: 'Politics', value: cityDetails?.partisan_lean ? politicsToString(cityDetails.partisan_lean) : "N/A" },
        { title: 'Quality of Education', value: cityDetails?.qualityOfEducation ? cityDetails?.qualityOfEducation : "N/A" },
        { title: 'Climate', value: cityDetails?.zone_description ? cityDetails?.zone_description : "N/A" },
        { title: 'Average Population Age', value: cityDetails?.avgPopulationAge ? averagePopulationAgeToString(cityDetails.avgPopulationAge) : "N/A" }
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