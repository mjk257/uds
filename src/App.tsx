import React from'react';
import { useState, useEffect } from 'react';
import CityPreferencesForm from "./components/CityPreferencesForm";
import "./styles/index.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CityBrowseForm from './components/CityBrowseForm';
import { getAllCities } from "./util/api-calls";
import { City, CityResponse } from "./types/utility-types";

function App() {


  // API Data
  const [cities, setCities] = useState<City[]>([]);
  const [returnedCities, setReturnedCities] = useState<CityResponse>({});

  useEffect(() => {
    // Getting all necessary form data from the backend
    getAllCities().then((resp) => {
      setCities(resp);
    });
  }, []);

  const [search, setSearch] = useState(true);
  return (
    <React.StrictMode>
      <Header setSearch={setSearch} setReturnedCities={setReturnedCities}/>
      { search ? (
        <CityPreferencesForm cities={cities} 
        returnedCities={returnedCities} 
        setReturnedCities={setReturnedCities}/>
      ) : (
        <CityBrowseForm cities={cities}/>
      )}
      <Footer />
    </React.StrictMode>
  );
}

export default App;
