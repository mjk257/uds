import React, { useState, useEffect } from "react";
import {Box, Card, CardContent, CircularProgress, Container} from "@mui/material";
import CityResponseCard from "./CityResponseCard";
import ConfigurationForm from "./ConfigurationForm";
import Map from "./Map";
import {
  defaultCityPreferencesConfigurationSet,
  CityResponse, Ranges,
} from "../types/utility-types";
import axios from "axios";
import {getAllCities, getAllOccupations, getRanges,} from "../util/api-calls";

export const CityPreferencesForm = () => {
  // These three fields are used for configurations, should we decide to re-add them
  const [allConfigs, setAllConfigs] = useState(
    defaultCityPreferencesConfigurationSet
  );
  const [currentConfig, setCurrentConfig] = useState(allConfigs.config1);
  const [currentConfigName] = useState("config1");
  const [returnedCities, setReturnedCities] = useState<CityResponse>({});

  // API Data
  const [allOccupations, setAllOccupations] = useState([]);
  const [ranges, setRanges] = useState(null);
  const [cities, setCities] = useState([]);

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

  const handleMarkerClick = (cityName: string) => {
    const cityResponseCard = document.getElementById(cityName);
    if (cityResponseCard) {
      cityResponseCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {(allOccupations && ranges) ? (
          <>
            <Container maxWidth="xl">
              <Card className="preferences-form">
                <CardContent>
                  <ConfigurationForm
                    currentConfig={currentConfig}
                    setCurrentConfig={setCurrentConfig}
                    allConfigs={allConfigs}
                    currentConfigName={currentConfigName}
                    setAllConfigs={setAllConfigs}
                    setReturnedCities={setReturnedCities}
                    allOccupations={allOccupations}
                    allRanges={ranges}
                  />
                </CardContent>
              </Card>
            </Container>
            <Container maxWidth="xl">
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
            </Container>
            {/* Note: In the future, the data should be returned as an array, already sorted by rank, since JSON's aren't ordered */}
            <Container maxWidth="xl">
              {returnedCities &&
                Object.values(returnedCities).map((city, idx) => {
                  return (
                    <CityResponseCard cityDetails={city} key={idx} rank={idx + 1} />
                  );
                })}
            </Container>
          </>) : (
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 minHeight="50vh">
              <CircularProgress size={100} />
            </Box>
          )}
    </div>
  );
};

export default CityPreferencesForm;
