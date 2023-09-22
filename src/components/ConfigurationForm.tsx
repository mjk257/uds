import React, { useEffect } from "react";
import {CityPreferencesConfiguration, defaultCityPreferencesConfiguration} from "../types/utility-types";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl, FormHelperText, FormLabel,
    InputLabel,
    MenuItem,
    Select, Slider, TextField, Typography
} from "@mui/material";
import { Configs } from "../types/utility-types";

// Note that some of this stuff might be placeholders for later on

const ConfigurationForm = ({ currentConfig, setCurrentConfig, allConfigs, currentConfigName, setAllConfigs } : Props) => {

    const handleChange = (property : any, event : any) => {
        setCurrentConfig({ ...currentConfig, [property]: event.target.value });
    }

    useEffect(() => {
        console.log(currentConfig);
        // @ts-ignore
        setAllConfigs({ ...allConfigs, [currentConfigName]: currentConfig });
    }, [currentConfig])

    const clearForm = () => {
        console.log("Entered")
        setCurrentConfig(defaultCityPreferencesConfiguration);
    }

    return  (
        <>
            <div className='preferences-form-container'>
                <Card className='preferences-form-card'>
                    <CardHeader title="What are you looking for in a city?" />
                    <Divider />
                    <CardContent className='preferences-form-content'>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Population</InputLabel>
                            <Select
                                labelId="population-select"
                                value={currentConfig.population}
                                onChange={ (event) => handleChange("population", event) }
                                label="Population"
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Population Density</InputLabel>
                            <Select
                                labelId="population-density-select"
                                value={currentConfig.populationDensity}
                                onChange={ (event) => handleChange("populationDensity", event) }
                                label="Population Density"
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Cost of Living</InputLabel>
                            <Select
                                labelId="col-select"
                                value={currentConfig.costOfLiving}
                                onChange={ (event) => handleChange("costOfLiving", event) }
                                label="Cost of Living"
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Number of Jobs Available</InputLabel>
                            <Select
                                labelId="col-select"
                                value={currentConfig.numberOfJobsAvailable}
                                onChange={ (event) => handleChange("numberOfJobsAvailable", event) }
                                label="Number of Jobs Available"
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className="preferences-slider-text">
                            <FormLabel>Crime Rate: {currentConfig.crimeRate}</FormLabel>
                            <Slider
                                defaultValue={0}
                                step={5000}
                                marks
                                min={0}
                                max={100000}
                                valueLabelDisplay="auto"
                                className='preferences-slider'
                                onChange={ (event) => handleChange("crimeRate", event) }
                            />
                            <FormHelperText>The amount of people affected by crime per 100,000 people</FormHelperText>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Walkability/Transability</InputLabel>
                            <Select
                                labelId="walkability-transability-select"
                                value={currentConfig.walkAndTransability}
                                onChange={ (event) => handleChange("walkAndTransability", event) }
                                label="Walkability/Transability"
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Politics</InputLabel>
                            <Select
                                labelId="politics-select"
                                value={currentConfig.politics}
                                onChange={ (event) => handleChange("politics", event) }
                                label="Politics"
                            >
                                <MenuItem value="">
                                    <em>Apolitical/No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Democrat"}>Democrat</MenuItem>
                                <MenuItem value={"Moderate"}>Moderate</MenuItem>
                                <MenuItem value={"Republican"}>Republican</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Quality of Education</InputLabel>
                            <Select
                                labelId="qoe-select"
                                value={currentConfig.qualityOfEducation}
                                onChange={ (event) => handleChange("qualityOfEducation", event) }
                                label="Quality of Education"
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-select'>
                            <InputLabel>Climate</InputLabel>
                            <Select
                                labelId="climate-select"
                                value={currentConfig.climate}
                                onChange={ (event) => handleChange("climate", event) }
                                label="Climate"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em>No Preference</em>
                                </MenuItem>
                                <MenuItem value={"Rainforest"}>Rainforest</MenuItem>
                                <MenuItem value={"Monsoon"}>Monsoon</MenuItem>
                                <MenuItem value={"Savanna"}>Savanna</MenuItem>
                                <MenuItem value={"Hot Desert"}>Hot Desert</MenuItem>
                                <MenuItem value={"Cold Desert"}>Cold Desert</MenuItem>
                                <MenuItem value={"Hot Semi-arid"}>Hot Semi-arid</MenuItem>
                                <MenuItem value={"Cold semi-arid"}>Cold Semi-arid</MenuItem>
                                <MenuItem value={"Hot-summer Mediterranean"}>Hot-summer Mediterranean</MenuItem>
                                <MenuItem value={"Warm-summer Mediterranean"}>Warm-summer Mediterranean</MenuItem>
                                <MenuItem value={"Cold-summer Mediterranean"}>Cold-summer Mediterranean</MenuItem>
                                <MenuItem value={"Humid Subtropical"}>Humid Subtropical</MenuItem>
                                <MenuItem value={"Subtropical Highland"}>Subtropical Highland</MenuItem>
                                <MenuItem value={"Oceanic"}>Oceanic</MenuItem>
                                <MenuItem value={"Subpolar Oceanic"}>Subpolar Oceanic</MenuItem>
                                <MenuItem value={"Hot-summer Mediterranean Continental"}>Hot-summer Mediterranean Continental</MenuItem>
                                <MenuItem value={"Warm-summer Mediterranean Continental"}>Warm-summer Mediterranean Continental</MenuItem>
                                <MenuItem value={"Dry-summer Subarctic"}>Dry-summer Subarctic</MenuItem>
                                <MenuItem value={"Hot-summer Humid Continental"}>Hot-summer Humid Continental</MenuItem>
                                <MenuItem value={"Hot-summer Humid Continental"}>Warm-summer Humid Continental</MenuItem>
                                <MenuItem value={"Dry-winter Subarctic"}>Dry-winter Subarctic</MenuItem>
                                <MenuItem value={"Hot-summer Humid Continental"}>Hot-summer Humid Continental</MenuItem>
                                <MenuItem value={"Warm-summer Humid Continental"}>Warm-summer Humid Continental</MenuItem>
                                <MenuItem value={"Subarctic"}>Subarctic</MenuItem>
                                <MenuItem value={"Tundra"}>Tundra</MenuItem>
                                <MenuItem value={"Ice-cap"}>Ice-cap</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" className='preferences-text-field'>
                            <TextField
                                label='Average Population Age'
                                variant='standard'
                                type='text'
                                value={currentConfig.avgPopulationAge}
                                InputProps={{
                                    inputProps: {
                                        inputMode: 'numeric'
                                    },
                                }}
                                onChange={ (event) => handleChange("avgPopulationAge", event) }
                                helperText='Please enter a number between 1 - 100'
                            >
                            </TextField>
                        </FormControl>
                        {/* Add the rest later on, I believe that this should be fine but I might add an object config */}
                        <div className='preferences-form-sibling-set'>
                            <Button color='error' variant="outlined" onClick={ clearForm }>
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
    currentConfig: CityPreferencesConfiguration,
    setCurrentConfig: Function,
    allConfigs: Configs,
    currentConfigName: String,
    setAllConfigs: Function
}

export default ConfigurationForm;