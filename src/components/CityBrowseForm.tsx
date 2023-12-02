import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography
} from "@mui/material";
import CityResponseCard from "./CityResponseCard";
import Map from "./Map";
import { City } from "../types/utility-types";

export const CityBrowseForm = ({cities} : Props) => {

  // City to search when selected on map
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    if (selectedCity) {
      const cityResponseCard = document.getElementById(
        (selectedCity as City).name.replace(/\s/g, "-")
      );
      if (cityResponseCard) {
        cityResponseCard.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedCity]);

  const handleMarkerClick = useCallback(
    (cityName: string, cityState: string) => {
      // If it doesn't exist, generate a new response card
      const selectedCity = cities.find((city) => city.name === cityName && city.state === cityState);
      setSelectedCity(selectedCity as City);
    },
    [cities]
  );

  return (
    <div>
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Map
                cities={cities}
                onMarkerClick={handleMarkerClick}
            />
            <Typography variant="h6">Zoom in to see more cities and click on any city to view its details.</Typography>
            <br/>
            {selectedCity && (
              <Box
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CityResponseCard
                  cityDetails={selectedCity}
                  rank={null}
                />
              </Box>
            )}
        </Container>
    </div>
  );
};

type Props = {
    cities: City[];
};

export default CityBrowseForm;
