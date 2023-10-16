import React, {useState} from "react";
import {
    Card,
    CardContent,
    Container
} from "@mui/material";
import ConfigurationList from "./ConfigurationList";
import CityResponseCard from "./CityResponseCard";
import ConfigurationForm from "./ConfigurationForm";
import {defaultCityPreferencesConfigurationSet, CityResponse } from "../types/utility-types";

export const CityPreferencesForm = () => {

    const [allConfigs, setAllConfigs ]= useState(defaultCityPreferencesConfigurationSet);
    const [currentConfig, setCurrentConfig] = useState(allConfigs.config1);
    const [currentConfigName, setCurrentConfigName] = useState('config1');
    const [returnedCities, setReturnedCities] = useState<CityResponse>({});

    return (
        <div>
            <Container maxWidth='xl'>
                <Card className='preferences-form'>
                    <CardContent>
                        <ConfigurationList setCurrentConfig={ setCurrentConfig } allConfigs={ allConfigs }
                                           currentConfigName={ currentConfigName } setCurrentConfigName={ setCurrentConfigName }/>
                        <ConfigurationForm currentConfig={ currentConfig } setCurrentConfig={ setCurrentConfig } allConfigs={ allConfigs }
                                           currentConfigName={ currentConfigName } setAllConfigs={ setAllConfigs } setReturnedCities={ setReturnedCities } />
                    </CardContent>
                </Card>
            </Container>
            {/* Note: In the future, the data should be returned as an array, already sorted by rank, since JSON's aren't ordered */}
            <Container maxWidth='xl'>
                {returnedCities &&
                    Object.values(returnedCities).map((city, idx) => {
                        return <CityResponseCard cityDetails={ city } key={ idx } rank={ idx + 1 }/>
                })}
            </Container>
        </div>
    )
}

export default CityPreferencesForm;