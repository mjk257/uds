import React, { useEffect } from "react";
import {CityPreferencesConfiguration, defaultCityPreferencesConfiguration} from "../types/utility-types";
import {
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox, Chip,
    Divider,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputBaseComponentProps,
    InputLabel,
    MenuItem,
    Select, Slider, TextField, TextFieldVariants, Typography
} from "@mui/material";
import { Configs } from "../types/utility-types";
import { JSX } from "react/jsx-runtime";

// Note that some of this stuff might be placeholders for later on

const ConfigurationForm = ({ currentConfig, setCurrentConfig, allConfigs, currentConfigName, setAllConfigs, setReturnedCities }: Props) => {

    const handleChange = (property: any, event: any) => {
        if (property === 'priorityAttributes') {
            //@ts-ignore
            let newPriorityAttributes = currentConfig[property];
            const attribute = event.target.value;
            if (newPriorityAttributes.includes(attribute)) {
                newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== attribute);
            } else {
                newPriorityAttributes = newPriorityAttributes.concat(attribute);
            }
            setCurrentConfig({...currentConfig, [property]: newPriorityAttributes});
        } else {
            setCurrentConfig({...currentConfig, [property]: event.target.value});
        }
    }

    useEffect(() => {
        console.log(currentConfig);
        setAllConfigs({ ...allConfigs, [currentConfigName as string]: currentConfig });
    }, [currentConfig])

    const clearForm = () => {
        setCurrentConfig(defaultCityPreferencesConfiguration);
    }

    const submitForm = () => {
        // 1.) send the data to the search function and await its response
        // 2.) recieve the data in some form
            // a.) Right now, I just have a mock for what it might look like
        const mockResponse = [
            {
                summary: "New York City is a city in the United States. " +
                    "It is the largest city in the United States. " +
                    "It is also the most populous city in the United States. " +
                    "It is also the most densely populated city in the United States. " +
                    "It is also the most expensive city in the United States. " +
                    "It is also the most dangerous city in the United States. " +
                    "It is also the most walkable city in the United States. " +
                    "It is also the most democratic city in the United States. " +
                    "It is also the most educated city in the United States. " +
                    "It is also the most humid-subtropical city in the United States. " +
                    "It is also the youngest city in the United States.",
                name: "New York City",
                population: 8398748,
                populationDensity: 10933,
                costOfLiving: "high",
                numberOfJobsAvailable: 100000,
                crimeRate: 45000,
                walkAndTransability: "high",
                politics: "democrat",
                qualityOfEducation: "high",
                climate: "humid-subtropical",
                avgPopulationAge: 35
            },
            {
                summary: "Los Angeles is a city in the United States. " +
                    "It is the second largest city in the United States. " +
                    "It is also the second most populous city in the United States. " +
                    "It is also the second most densely populated city in the United States. " +
                    "It is also the second most expensive city in the United States. " +
                    "It is also the second most dangerous city in the United States. " +
                    "It is also the second most walkable city in the United States. " +
                    "It is also the second most democratic city in the United States. " +
                    "It is also the second most educated city in the United States. " +
                    "It is also the second most humid-subtropical city in the United States. " +
                    "It is also the second youngest city in the United States.",
                name: "Los Angeles",
                population: 3990456,
                populationDensity: 3276,
                costOfLiving: "high",
                numberOfJobsAvailable: 100000,
                crimeRate: 45000,
                walkAndTransability: "high",
                politics: "democrat",
                qualityOfEducation: "high",
                climate: "humid-subtropical",
                avgPopulationAge: 35
            },
            {
                summary: "Chicago is a city in the United States. " +
                    "It is the third largest city in the United States. " +
                    "It is also the third most populous city in the United States. " +
                    "It is also the third most densely populated city in the United States. " +
                    "It is also the third most expensive city in the United States. " +
                    "It is also the third most dangerous city in the United States. " +
                    "It is also the third most walkable city in the United States. " +
                    "It is also the third most democratic city in the United States. " +
                    "It is also the third most educated city in the United States. " +
                    "It is also the third most humid-subtropical city in the United States. " +
                    "It is also the third youngest city in the United States.",
                name: "Chicago",
                population: 2705994,
                populationDensity: 4574,
                costOfLiving: "high",
                numberOfJobsAvailable: 100000,
                crimeRate: 45000,
                walkAndTransability: "high",
                politics: "democrat",
                qualityOfEducation: "high",
                climate: "humid-subtropical",
                avgPopulationAge: 35
            }
        ]
        setReturnedCities(mockResponse);
    }

    const formInputs = [
        {
            inputLabel: "Population",
            value: currentConfig.population,
            onChange: (event: any) => handleChange("population", event),
            label: "Population",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low", value: "low"},
                {title: "Medium", value: "medium"},
                {title: "High", value: "high"}
            ]
        },
        {
            inputLabel: "Population Density",
            value: currentConfig.populationDensity,
            onChange: (event: any) => handleChange("populationDensity", event),
            label: "Population Density",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low", value: "low"},
                {title: "Medium", value: "medium"},
                {title: "High", value: "high"}
            ]
        },
        {
            inputLabel: "Cost of Living",
            value: currentConfig.costOfLiving,
            onChange: (event: any) => handleChange("costOfLiving", event),
            label: "Cost of Living",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low", value: "low"},
                {title: "Medium", value: "medium"},
                {title: "High", value: "high"}
            ]
        },
        {
            inputLabel: "Number of Jobs Available",
            value: currentConfig.numberOfJobsAvailable,
            onChange: (event: any) => handleChange("numberOfJobsAvailable", event),
            label: "Number of Jobs Available",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "<1,000", value: "low"},
                {title: ">1,000 - 9,999", value: "medium-low"},
                {title: "10,000 - 24,999", value: "medium-high"},
                {title: "25,000+", value: "high"}
            ]
        },
        {
            inputLabel: "Crime Rate",
            value: currentConfig.crimeRate,
            onChange: (event: any) => handleChange("crimeRate", event),
            label: "Crime Rate",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "<10,000", value: 5000},
                {title: "10,000 - 19,999", value: 15000},
                {title: "20,000 - 29,999", value: 25000},
                {title: "30,000 - 39,999", value: 35000},
                {title: "40,000 - 49,999", value: 45000},
                {title: "50,000 - 59,999", value: 55000},
                {title: "60,000 - 69,999", value: 65000},
                {title: "70,000 - 79,999", value: 75000},
                {title: "80,000 - 89,999", value: 85000},
                {title: "90,000", value: 95000},
            ],
            helperText: "The amount of people affected by crime per 100,000 people."
        },
        {
            inputLabel: "Walkability/Transability",
            value: currentConfig.walkAndTransability,
            onChange: (event: any) => handleChange("walkAndTransability", event),
            label: "Walkability/Transability",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low", value: "low"},
                {title: "Medium", value: "medium"},
                {title: "High", value: "high"}
            ]
        },
        {
            inputLabel: "Politics",
            value: currentConfig.politics,
            onChange: (event: any) => handleChange("politics", event),
            label: "Politics",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Democrat", value: "democrat"},
                {title: "Moderate", value: "moderate"},
                {title: "Republican", value: "republican"}
            ]
        },
        {
            inputLabel: "Quality of Education",
            value: currentConfig.qualityOfEducation,
            onChange: (event: any) => handleChange("qualityOfEducation", event),
            label: "Quality of Education",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low", value: "low"},
                {title: "Medium", value: "medium"},
                {title: "High", value: "high"}
            ]
        },
        {
            inputLabel: "Climate",
            value: currentConfig.climate,
            onChange: (event: any) => handleChange("climate", event),
            label: "Climate",
            menuProps: {
                PaperProps: {
                    style: {
                        maxHeight: 200,
                    },
                },
            },
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Rainforest", value: "rainforest"},
                {title: "Monsoon", value: "monsoon"},
                {title: "Savanna", value: "savanna"},
                {title: "Hot Desert", value: "hot-desert"},
                {title: "Cold Desert", value: "cold-desert"},
                {title: "Hot Semi-arid", value: "hot-semi-arid"},
                {title: "Cold semi-arid", value: "cold-semi-arid"},
                {title: "Hot-summer Mediterranean", value: "hot-summer-mediterranean"},
                {title: "Warm-summer Mediterranean", value: "warm-summer-mediterranean"},
                {title: "Cold-summer Mediterranean", value: "cold-summer-mediterranean"},
                {title: "Humid Subtropical", value: "humid-subtropical"},
                {title: "Subtropical Highland", value: "subtropical-highland"},
                {title: "Oceanic", value: "oceanic"},
                {title: "Subpolar Oceanic", value: "subpolar-oceanic"},
                {title: "Hot-summer Mediterranean Continental", value: "hot-summer-mediterranean-continental"},
                {title: "Warm-summer Mediterranean Continental", value: "warm-summer-mediterranean-continental"},
                {title: "Dry-summer Subarctic", value: "dry-summer-subarctic"},
                {title: "Hot-summer Humid Continental", value: "hot-summer-humid-continental"},
                {title: "Warm-summer Humid Continental", value: "warm-summer-humid-continental"},
                {title: "Dry-winter Subarctic", value: "dry-winter-subarctic"},
                {title: "Hot-summer Humid Continental", value: "hot-summer-humid-continental"},
                {title: "Warm-summer Humid Continental", value: "warm-summer-humid-continental"},
                {title: "Subarctic", value: "subarctic"},
                {title: "Tundra", value: "tundra"},
                {title: "Ice-cap", value: "ice-cap"}
            ]
        },
        {
            inputLabel: "Average Population Age",
            value: currentConfig.avgPopulationAge,
            onChange: (event: any) => handleChange("avgPopulationAge", event),
            label: "Average Population Age",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "<20", value: 15},
                {title: "20 - 29", value: 25},
                {title: "30 - 39", value: 35},
                {title: "40 - 49", value: 45},
                {title: "50 - 59", value: 55},
                {title: "60 - 69", value: 65},
                {title: "70 - 79", value: 75},
                {title: "80 - 89", value: 85},
                {title: "90+", value: 95}
            ]
        }
    ]

    const priorityAttributeCheckboxes = [
        { title: "Population", value: "population" },
        { title: "Population Density", value: "populationDensity" },
        { title: "Cost of Living", value: "costOfLiving" },
        { title: "Number of Jobs Available", value: "numberOfJobsAvailable" },
        { title: "Crime Rate", value: "crimeRate" },
        { title: 'Walkability/Transability', value: "walkAndTransability" },
        { title: "Politics", value: "politics" },
        { title: "Quality of Education", value: "qualityOfEducation" },
        { title: "Climate", value: "climate" },
        { title: "Average Population Age", value: "avgPopulationAge" }
    ]

    return  (
        <>
            <div className='preferences-form-container'>
                <Card className='preferences-form-card'>
                    <CardHeader title="What are you looking for in a city?" />
                    <Divider />
                    <CardContent className='preferences-form-content'>
                        { formInputs.map((input, index) => {
                                return (
                                    <FormControl variant="standard" className='preferences-select' key={ index }>
                                        <InputLabel id={ input.inputLabel }>{ input.label }</InputLabel>
                                        <Select
                                            labelId={ input?.inputLabel }
                                            id={ input?.inputLabel }
                                            value={ input?.value }
                                            onChange={ input?.onChange }
                                            label={ input?.label }
                                            MenuProps={ input?.menuProps }
                                        >
                                            { input.menuItems?.map((menuItem, index) => {
                                                return (
                                                    <MenuItem value={ menuItem.value } key={ index }>{ menuItem.title }</MenuItem>
                                                )
                                            }) }
                                        </Select>
                                        { input?.helperText && <FormHelperText>{ input?.helperText }</FormHelperText> }
                                    </FormControl>
                                )
                            })}
                        <br/>
                        <Divider />
                        <FormControl variant='standard'
                                     error={ currentConfig.priorityAttributes.length < 3 || currentConfig.priorityAttributes.length > 5 }>
                            <FormLabel className='preferences-form-priority-attributes-label'>Select the 3 - 5 Attributes Which you Value Most!</FormLabel>
                            <FormGroup>
                                { priorityAttributeCheckboxes.map((checkbox, index) => {
                                    return (
                                        <>
                                            <FormControlLabel control={
                                                    <Checkbox key={ index }
                                                              //@ts-ignore
                                                              disabled={ currentConfig[checkbox.value] === '' }
                                                              checked={ currentConfig.priorityAttributes.includes(checkbox.value) }
                                                              onChange={ (event) => handleChange("priorityAttributes", event) }
                                                              name={ checkbox.title}
                                                              value={ checkbox.value } />
                                                }
                                                label={ checkbox.title } />
                                        </>
                                    )
                                })}
                            </FormGroup>
                            {(currentConfig.priorityAttributes.length < 3 || currentConfig.priorityAttributes.length > 5) &&
                                <FormHelperText>Please select between 3 - 5 values!</FormHelperText>}
                        </FormControl>
                        <div className='preferences-form-sibling-set'>
                            <Button color='error' variant="outlined" onClick={ clearForm }>
                                Clear
                            </Button>
                            <Button color='primary' variant="outlined" onClick={ submitForm }
                                    disabled={ currentConfig.priorityAttributes.length < 3 || currentConfig.priorityAttributes.length > 5 }>
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
    setAllConfigs: Function,
    setReturnedCities: Function
}

export default ConfigurationForm;