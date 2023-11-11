import React, { useState, useEffect } from "react";
import { Card, CardContent, Container } from "@mui/material";
import ConfigurationList from "./ConfigurationList";
import CityResponseCard from "./CityResponseCard";
import ConfigurationForm from "./ConfigurationForm";
import Map from "./Map";
import {
  defaultCityPreferencesConfigurationSet,
  CityResponse,
} from "../types/utility-types";
import axios from "axios";

export const CityPreferencesForm = () => {
  const [allConfigs, setAllConfigs] = useState(
    defaultCityPreferencesConfigurationSet
  );
  const [currentConfig, setCurrentConfig] = useState(allConfigs.config1);
  const [currentConfigName, setCurrentConfigName] = useState("config1");
  const [returnedCities, setReturnedCities] = useState<CityResponse>({});

  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
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
      <Container maxWidth="xl">
        <Card className="preferences-form">
          <CardContent>
            <ConfigurationList
              setCurrentConfig={setCurrentConfig}
              allConfigs={allConfigs}
              currentConfigName={currentConfigName}
              setCurrentConfigName={setCurrentConfigName}
            />
            <ConfigurationForm
              currentConfig={currentConfig}
              setCurrentConfig={setCurrentConfig}
              allConfigs={allConfigs}
              currentConfigName={currentConfigName}
              setAllConfigs={setAllConfigs}
              setReturnedCities={setReturnedCities}
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
    </div>
  );
};

export default CityPreferencesForm;
