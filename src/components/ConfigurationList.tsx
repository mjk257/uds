import React from "react";
import { Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import ConfigurationForm from "./ConfigurationForm";
import {
    CityPreferencesConfiguration, Configs,
    defaultCityPreferencesConfigurationSet
} from "../types/utility-types";
import {ConfigFn} from "@testing-library/react";

const ConfigurationList = ({ setCurrentConfig, allConfigs, currentConfigName, setCurrentConfigName } : Props) => {

    const toggleButtonConfigurations = [
        { title: "Config 1", value: "config1", onChange: () => setCurrentConfig(allConfigs.config1) },
        { title: "Config 2", value: "config2", onChange: () => setCurrentConfig(allConfigs.config2) },
        { title: "Config 3", value: "config3", onChange: () => setCurrentConfig(allConfigs.config3) },
        { title: "Config 4", value: "config4", onChange: () => setCurrentConfig(allConfigs.config4) },
        { title: "Config 5", value: "config5", onChange: () => setCurrentConfig(allConfigs.config5) }
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
            <Typography variant='h4' align='center' className='configurations-header'>
                Configurations
            </Typography>
            <Container maxWidth='xl'>
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
            </Container>
        </div>
    );
};

type Props = {
    setCurrentConfig: Function,
    allConfigs: Configs,
    currentConfigName: string,
    setCurrentConfigName: Function
}

export default ConfigurationList;