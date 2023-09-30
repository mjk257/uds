import React, {useState} from "react";
import {
    Card,
    CardContent,
    Container
} from "@mui/material";
import ConfigurationList from "./ConfigurationList";
import CityResponseCard from "./CityResponseCard";
import ConfigurationForm from "./ConfigurationForm";
import {defaultCityPreferencesConfigurationSet} from "../types/utility-types";

export const CityPreferencesForm = () => {

    const [allConfigs, setAllConfigs ]= useState(defaultCityPreferencesConfigurationSet);
    const [currentConfig, setCurrentConfig] = useState(allConfigs.config1);
    const [currentConfigName, setCurrentConfigName] = useState('config1');

    return (
        <div>
            <Container maxWidth='xl'>
                <Card className='preferences-form'>
                    <CardContent>
                        <ConfigurationList setCurrentConfig={ setCurrentConfig } allConfigs={ allConfigs }
                                           currentConfigName={ currentConfigName } setCurrentConfigName={ setCurrentConfigName }/>
                        <ConfigurationForm currentConfig={ currentConfig } setCurrentConfig={ setCurrentConfig } allConfigs={ allConfigs }
                                           currentConfigName={ currentConfigName } setAllConfigs={ setAllConfigs } />
                    </CardContent>
                </Card>
            </Container>
            {/* Note that in the future this will be rendered dynamically, but right now is just showing for reference */}
            <Container maxWidth='xl'>
                <CityResponseCard />
            </Container>
        </div>
    )
}

export default CityPreferencesForm;