import React from "react";
import CityPreferencesForm from "./CityPreferencesForm";
import {CityPreferencesConfiguration} from "../types/utility-types";
import {Button, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

// Note that some of this stuff might be placeholders for later on

const ConfigurationForm = ({ config, setConfig, currentConfig } : Props) => {

    const handleChange = (property : any, event : any) => {
        // @ts-ignore
        setConfig({ ...config[currentConfig], [property]: event.target.value });
    }

    return  (
        <>
            <div className='preferences-form-container'>
                <Card className='preferences-form-card'>
                    <CardHeader title="What are you looking for in a city?" />
                    <Divider />
                    <CardContent className='preferences-form-content'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Population</InputLabel>
                            <Select
                                labelId="population-select"
                                // This is likely going to cause an error
                                value={config.population}
                                onChange={ () => handleChange("population", this) }
                                label="Population"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Population Density</InputLabel>
                            <Select
                                labelId="population-density-select"
                                // This is likely going to cause an error
                                value={config.populationDensity}
                                onChange={ () => handleChange("populationDensity", this) }
                                label="Population Density"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Cost of Living</InputLabel>
                            <Select
                                labelId="col-select"
                                // This is likely going to cause an error
                                value={config.costOfLiving}
                                onChange={ () => handleChange("costOfLiving", this) }
                                label="Cost of Living"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Number of Jobs Available</InputLabel>
                            <Select
                                labelId="col-select"
                                // This is likely going to cause an error
                                value={config.numberOfJobsAvailable}
                                onChange={ () => handleChange("numberOfJobsAvailable", this) }
                                label="Number of Jobs Available"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Add the rest later on, I believe that this should be fine but I might add an object config */}
                        <div className='preferences-form-sibling-set'>
                            <Button color='error' variant="outlined">
                                Clear
                            </Button>
                            <Button color='primary' variant="outlined">
                                Submit
                            </Button>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

type Props = {
    config: CityPreferencesConfiguration,
    currentConfig: String
    setConfig: Function
};

export default ConfigurationForm;