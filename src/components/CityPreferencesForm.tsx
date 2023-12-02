import React, { useState, useEffect } from "react";
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
  City
} from "../types/utility-types";
import { getAllOccupations, getRanges } from "../util/api-calls";
import Cookies from "js-cookie";

export const CityPreferencesForm = ({cities, returnedCities, setReturnedCities} : Props) => {


  // This field remains if we want to read configurations later
  const [allConfigs] = useState(
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


  // API Data
  const [allOccupations, setAllOccupations] = useState([]);
  const [ranges, setRanges] = useState(null);

  useEffect(() => {
    // Getting all necessary form data from the backend
    getAllOccupations().then((resp) => {
      setAllOccupations(resp);
    });
    getRanges().then((resp) => {
      setRanges(resp);
    });
  }, []);


  return (
    <div>
      {allOccupations && ranges ? (
        <>
          
            {Object.keys(returnedCities).length === 0 && (
              <Container
              maxWidth="xl"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            )}

          {/* Note: In the future, the data should be returned as an array, already sorted by rank, since JSON's aren't ordered */}
          <Container maxWidth="xl">
            {Object.keys(returnedCities).length > 0 && returnedCities && (
              <Box>
                <Map
                  cities={
                    Object.keys(returnedCities).length > 0
                      ? Object.values(returnedCities)
                      : cities
                  }
                  onMarkerClick={() => {}}
                />
                <Box className="button-container">
                  <Button variant="contained" onClick={() => {
                    setReturnedCities({});
                    window.scrollTo({top: 0, behavior: "smooth"});
                    }}>New Search</Button>
                </Box>
              </Box>
            )} 
            {Object.keys(returnedCities).length > 0 && returnedCities &&
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
                    />
                  </Box>
                );
              })} 
              {Object.keys(returnedCities).length > 0 && returnedCities && (
                <Box className="button-container">
                  <Button variant="contained" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>Back to Top</Button>
                </Box>
              )}
          </Container>
        </>
      ) : (
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 minHeight="100vh"
                 flexDirection="column">
              <CircularProgress size={100} />
            </Box>
          )}
      <br/>
      <br/>
    </div>
  );
};

type Props = {
  cities: City[];
  returnedCities: CityResponse;
  setReturnedCities: Function;
};

export default CityPreferencesForm;
