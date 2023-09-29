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

    const toggleButtonConfigurations = [
        { title: "Configuration 1", value: "config1", onChange: () => setCurrentConfig(allConfigs.config1) },
        { title: "Configuration 2", value: "config2", onChange: () => setCurrentConfig(allConfigs.config2) },
        { title: "Configuration 3", value: "config3", onChange: () => setCurrentConfig(allConfigs.config3) },
        { title: "Configuration 4", value: "config4", onChange: () => setCurrentConfig(allConfigs.config4) },
        { title: "Configuration 5", value: "config5", onChange: () => setCurrentConfig(allConfigs.config5) }
    ];

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
                    { toggleButtonConfigurations.map((item, idx) => {
                        return (
                            <ToggleButton key={ idx } value={ item.value } onChange={ item.onChange }>
                                { item.title }
                            </ToggleButton>
                        )
                    })}
                </ToggleButtonGroup>
            </div>
            <ConfigurationForm currentConfig={ currentConfig } setCurrentConfig={ setCurrentConfig } allConfigs={ allConfigs }
                               currentConfigName={ currentConfigName } setAllConfigs={ setAllConfigs } />
        </div>
    );
};

export default ConfigurationList;