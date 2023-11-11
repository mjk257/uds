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

// Function to get a color on a red to green spectrum from a percent, max, and min
function percentageToColor(perc: number, min: number, max: number) {
  var base = (max - min);

  if (base === 0) { perc = 100; }
  else {
    perc = (perc - min) / base * 100; 
  }
  
  var r, g, b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  // Convert RGB to HSL
  r /= 255;
  g/= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = "100%",
      l = "45%";
      if (delta === 0)
      h = 0;
    // Red is max
    else if (cmax === r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;
    return "hsl(" + h + "," + s + "," + l + ")";
}

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
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people";
  };

  const populationDensityToString = (density: number) => {
    return density.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people per square mile";
  };

  const averagePopulationAgeToString = (avgPopulationAge: number) => {
    return avgPopulationAge + " years old";
  };

  const crimeRateToString = (crimeRate: number) => {
    return crimeRate + " crimes per 100,000 people";
  };

  const politicsToString = (partisan_lean: number) => {
    // Ranges from 69 to -49
    const roundedPartisanLean = Math.abs(partisan_lean);
    let side = partisan_lean > 0 ? "Democrat" : "Republican"
    let lean = "";
    if (roundedPartisanLean > 0 && roundedPartisanLean < 10) {
      lean = "mildly";
    } else if (roundedPartisanLean > 10 && roundedPartisanLean < 20) {
      lean = "moderately"
    } else {
      lean = "strongly"
    }
    return "Leans " + lean + " " + side;
  };

  const numberOfJobsToString = (occupation_data: { [key: string]: any }) => {
    if (occupation_data["hourly_salary"] == null)
      return occupation_data["job_count"] + " jobs for " + occupation_data["title"];
    else
      return occupation_data["job_count"] + " jobs for " + occupation_data["title"] + " with a median hourly salary of $" + occupation_data["hourly_salary"];
  };

  const precipToString = (precip: number) => {
    let s = "";
    if(precip !== 1)
      s = "es"
    return precip + " inch" + s + " annually";
  };

  const tempToString = (summer: number) => {
    return summer + "°F";
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
      title: "Average Population Age",
      value: cityDetails?.median_age
        ? averagePopulationAgeToString(cityDetails.median_age)
        : "N/A",
    },
    {
      title: "State Politics",
      value: cityDetails?.partisan_lean
        ? politicsToString(cityDetails.partisan_lean)
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
      title: "Walk Score",
      value: cityDetails?.walk_score
        ? cityDetails.walk_score
        : "N/A",
      style: {color: percentageToColor(cityDetails?.walk_score, 45, 100)}
    },
    {
      title: "Transit Score",
      value: cityDetails?.transit_score
        ? cityDetails.transit_score
        : "N/A",
      style: {color: percentageToColor(cityDetails?.transit_score, 45, 100)}
    },
    {
      title: "Bike Score",
      value: cityDetails?.bike_score
        ? cityDetails.bike_score
        : "N/A",
      style: {color: percentageToColor(cityDetails?.bike_score, 45, 100)}  
    },
    {
      title: "Outdoor Score",
      value: cityDetails?.outdoor_score
        ? cityDetails.outdoor_score
        : "N/A",
      style: {color: percentageToColor(cityDetails?.outdoor_score, 45, 100)}
    },
    {
      title: "Climate Zone Description",
      value: cityDetails?.zone_description
        ? cityDetails?.zone_description
        : "N/A",
    },
    {
      title: "Average Rainfall",
      value: cityDetails?.annual_precipitation
        ? precipToString(cityDetails?.annual_precipitation)
        : "N/A",
    },
    {
      title: "Average Snowfall",
      value: cityDetails?.annual_snow
        ? precipToString(cityDetails?.annual_snow)
        : "N/A",
    },
    {
      title: "Average Summer Temperature",
      value: cityDetails?.summer_temp
        ? tempToString(cityDetails?.summer_temp)
        : "N/A",
    },
    {
      title: "Average Winter Temperature",
      value: cityDetails?.winter_temp
        ? tempToString(cityDetails?.winter_temp)
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
                  <span style={item.style}>{item.value}</span>
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
