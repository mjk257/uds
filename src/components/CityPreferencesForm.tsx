import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from "@mui/material";
import CityResponseCard from "./CityResponseCard";
import ConfigurationForm from "./ConfigurationForm";
import Map from "./Map";
import {
  defaultCityPreferencesConfigurationSet,
  CityResponse,
  CityPreferencesConfiguration,
} from "../types/utility-types";
import { getAllCities, getAllOccupations, getRanges } from "../util/api-calls";
import Cookies from "js-cookie";

export const CityPreferencesForm = () => {
  interface City {
    name: string;
    state: string;
    population: number;
    latitude: number;
    longitude: number;
  }

  // This field remains if we want to read configurations later
  const [allConfigs, setAllConfigs] = useState(
    defaultCityPreferencesConfigurationSet
  );

  // Read 'userInput' cookie, load configurations from last submit
  let parsedConfig = allConfigs.config1;
  const userInputCookie = Cookies.get("userInput");
  if (userInputCookie) {
    try {
      // Parse the cookie and update the currentConfig
      parsedConfig = JSON.parse(
        userInputCookie
      ) as CityPreferencesConfiguration;
    } catch (error) {
      console.error("Error parsing 'userInput' cookie:", error);
    }
  }
  const [currentConfig, setCurrentConfig] = useState(parsedConfig);
  const [returnedCities, setReturnedCities] = useState<CityResponse>({});

  // API Data
  const [allOccupations, setAllOccupations] = useState([]);
  const [ranges, setRanges] = useState(null);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    // Getting all necessary form data from the backend
    getAllOccupations().then((resp) => {
      setAllOccupations(resp);
    });
    getAllCities().then((resp) => {
      setCities(resp);
    });
    getRanges().then((resp) => {
      setRanges(resp);
    });
  }, []);

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
    (cityName: string) => {
      // Replace spaces with hyphens in the city name
      const cityNameId = cityName.replace(/\s/g, "-");

      // Check if a response card for the clicked city already exists
      const existingCard = document.getElementById(cityNameId);
      if (existingCard) {
        // If it exists, scroll to the existing card
        existingCard.scrollIntoView({ behavior: "smooth" });
      } else {
        // If it doesn't exist, generate a new response card
        const selectedCity = cities.find((city) => city.name === cityName);
        setSelectedCity(selectedCity as City);
      }
    },
    [cities]
  );

  const handleClose = useCallback(() => {
    setSelectedCity(null);
  }, []);

  return (
    <div>
      {allOccupations && ranges ? (
        <>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {returnedCities && (
              <Map
                cities={
                  Object.keys(returnedCities).length > 0
                    ? Object.values(returnedCities)
                    : cities
                }
                onMarkerClick={handleMarkerClick}
              />
            )}
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
                  handleClose={handleClose}
                  isMarkerClicked={true}
                />
              </Box>
            )}
            <Card className="preferences-form">
              <CardContent>
                <ConfigurationForm
                  currentConfig={currentConfig}
                  setCurrentConfig={setCurrentConfig}
                  setReturnedCities={setReturnedCities}
                  allOccupations={allOccupations}
                  allRanges={ranges}
                />
              </CardContent>
            </Card>
          </Container>
          {/* Note: In the future, the data should be returned as an array, already sorted by rank, since JSON's aren't ordered */}
          <Container maxWidth="xl">
            {returnedCities &&
              Object.values(returnedCities).map((city, idx) => {
                return (
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
                      cityDetails={city}
                      key={idx}
                      rank={idx + 1}
                      handleClose={handleClose}
                      isMarkerClicked={false}
                    />
                  </Box>
                );
              })}
          </Container>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress size={100} />
        </Box>
      )}
    </div>
  );
};

export default CityPreferencesForm;
