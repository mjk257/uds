import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Icon,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

// This will likely take in props later on, but the base styling will be set up
const CityResponseCard = ({ cityDetails, rank }: Props) => {
  const costOfLivingToString = (rpp: number) => {
    const roundedRpp = Math.abs(rpp - 100).toFixed(2);
    if (rpp === 100) {
      return "Equal to the average cost of living in the U.S.A";
    } else if (rpp > 100) {
      return `${roundedRpp}% higher than the average cost of living in the U.S.A`;
    } else {
      return `${roundedRpp}% lower than the average cost of living in the U.S.A`;
    }
  };

  const populationToString = (population: number) => {
    return population + " people";
  };

  const populationDensityToString = (density: number) => {
    return density + " people per square mile";
  };

  const crimeRateToString = (crimeRate: number) => {
    return crimeRate + " crimes per 100,000 people";
  };

  const outdoorScoreToString = (outdoorScore: number) => {
    // Outdoor score ranges from 58 through 100
    // So I will use 79 as the average
    const OUTDOOR_SCORE_AVG = 79;
    const roundedOutdoorScore = Math.abs(OUTDOOR_SCORE_AVG - outdoorScore).toFixed(2);
    if (outdoorScore === OUTDOOR_SCORE_AVG) {
      return "No better or worse than other cities for outdoor recreation.";
    } else if (outdoorScore > OUTDOOR_SCORE_AVG) {
      return `${roundedOutdoorScore}% better for outdoor recreation than other cities in the U.S.A`;
    } else {
      return `${roundedOutdoorScore}% worse for outdoor recreation than other cities in the U.S.A`;
    }
  };

  const walkabilityTransabilityToString = (walkAndTransability: number) => {
    const roundedWAT = (100 - Math.abs(walkAndTransability)).toFixed(2);
    if (walkAndTransability === 0) {
      return "The walkability/transability in this city is equal to the national average.";
    } else if (walkAndTransability > 0) {
      return `${walkAndTransability}% higher walkability/transability than other cities in the U.S.A`;
    } else {
      return `${walkAndTransability}% lowerS walkability/transability than other cities in the U.S.A`;
    }
  };

  const politicsToString = (partisan_lean: number) => {
    const roundedPartisanLean = (100 - Math.abs(partisan_lean)).toFixed(2);
    if (partisan_lean === 0) {
      return "Moderate, there is no major partisan lean in this area.";
    } else if (partisan_lean > 0) {
      return `${roundedPartisanLean}% more democratic than the average city in the U.S.A`;
    } else {
      return `${roundedPartisanLean}% more republican than the average city in the U.S.A`;
    }
  };

  const numberOfJobsToString = (occupation_data: { [key: string]: any }) => {
    if (occupation_data["hourly_salary"] == null)
      return occupation_data["job_count"] + " jobs for " + occupation_data["title"];
    else
      return occupation_data["job_count"] + " jobs for " + occupation_data["title"] + " with a median hourly salary of $" + occupation_data["hourly_salary"];
  };

  const averagePopulationAgeToString = (avgPopulationAge: number) => {
    return avgPopulationAge + " years old";
  };

  const accordionDetails = [
    {
      title: "Population",
      value: cityDetails?.population
        ? populationToString(cityDetails.population)
        : "N/A",
    },
    {
      title: "Population Density",
      value: cityDetails?.density
        ? populationDensityToString(cityDetails.density)
        : "N/A",
    },
    {
      title: "Cost of Living",
      value: cityDetails?.rpp ? costOfLivingToString(cityDetails?.rpp) : "N/A",
    },
    {
      title: "Job Market",
      value: cityDetails?.occupation_data
        ? numberOfJobsToString(cityDetails.occupation_data)
        : "N/A",
    },
    {
      title: "Crime Rate",
      value: cityDetails?.crimeRate
        ? crimeRateToString(cityDetails.crimeRate)
        : "N/A",
    },
    {
      title: "Walkability/Transability",
      value: cityDetails?.walkAndTransability
        ? walkabilityTransabilityToString(cityDetails.walkAndTransability)
        : "N/A",
    },
    {
      title: "Politics",
      value: cityDetails?.partisan_lean
        ? politicsToString(cityDetails.partisan_lean)
        : "N/A",
    },
    {
      title: "Outdoor Score",
      value: cityDetails?.outdoor_score
        ? outdoorScoreToString(cityDetails.outdoor_score)
        : "N/A",
    },
    {
      title: "Climate",
      value: cityDetails?.zone_description
        ? cityDetails?.zone_description
        : "N/A",
    },
    {
      title: "Average Population Age",
      value: cityDetails?.median_age
        ? averagePopulationAgeToString(cityDetails.median_age)
        : "N/A",
    },
  ];

  const id = cityDetails?.name.replace(/ /g, "-"); // Convert city name to a valid ID

  return (
    <Card className="city-response" id={id}>
      <CardHeader
        title={`${rank}.) ${cityDetails?.name}, ${cityDetails?.state}`}
        titleTypographyProps={{ align: "left" }}
      />
      <CardContent className="city-response-content">
        {cityDetails?.summary ? (
          <Typography>{cityDetails?.summary}</Typography>
        ) : (
          "N/A"
        )}
        <Accordion className="city-response-details">
          <AccordionSummary
            expandIcon={
              <Icon style={{ color: "black !important" }}>
                <ExpandMore />
              </Icon>
            }
          >
            <Typography>City Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {accordionDetails.map((item, idx) => {
              return (
                <Typography key={idx} className="city-response-text">
                  <span className="title">{`${item.title}: `}</span>{" "}
                  {item.value}
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

type Props = {
  cityDetails: any;
  rank: number;
};

export default CityResponseCard;
