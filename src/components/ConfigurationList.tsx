import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ConfigurationForm from "./ConfigurationForm";
import {
    defaultCityPreferencesConfigurationSet
} from "../types/utility-types";

const ConfigurationList = () => {

    const [allConfigs, setAllConfigs ]= useState(defaultCityPreferencesConfigurationSet);
    const [currentConfig, setCurrentConfig] = useState(allConfigs.config1);
    const [currentConfigName, setCurrentConfigName] = useState('config1');
    const handleChange = (event : any) => {
        if (event.target.value !== currentConfigName) {
            // @ts-ignore
            setCurrentConfig(allConfigs[event.target.value]);
            setCurrentConfigName(String(event.target.value));
        }
    }

    return (
        <div>
            <h2>Configurations</h2>
            <div className='config-container'>
                <ToggleButtonGroup color="primary" value={ currentConfigName } exclusive
                                   aria-label={'config-settings'} onChange={ handleChange }>
                    <ToggleButton value="config1" onChange={ () => setCurrentConfig(allConfigs.config1) }>
                        Configuration 1
                    </ToggleButton>
                    <ToggleButton value="config2" onChange={ () => setCurrentConfig(allConfigs.config2) }>
                        Configuration 2
                    </ToggleButton>
                    <ToggleButton value="config3" onChange={ () => setCurrentConfig(allConfigs.config3) }>
                        Configuration 3
                    </ToggleButton>
                    <ToggleButton value="config4" onChange={ () => setCurrentConfig(allConfigs.config4) }>
                        Configuration 4
                    </ToggleButton>
                    <ToggleButton value="config5" onChange={ () => setCurrentConfig(allConfigs.config5) }>
                        Configuration 5
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <ConfigurationForm currentConfig={ currentConfig } setCurrentConfig={ setCurrentConfig } allConfigs={ allConfigs }
                               currentConfigName={ currentConfigName } setAllConfigs={ setAllConfigs } />
        </div>
    );
};

export default ConfigurationList;