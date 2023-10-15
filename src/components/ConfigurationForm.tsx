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
    MenuItem, Radio, RadioGroup,
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
                preferredJobIndustry: 100000,
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
                preferredJobIndustry: 100000,
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
                preferredJobIndustry: 100000,
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

    // Idk if we want this, but i'll keep it for reference
    const formInputDefaultValues = {
        costOfLiving: 1500,
        crimeRate: 50000,
        walkAndTransability: 50,
        qualityOfEducation: 50,
        population: 450000,
        populationDensity: 3000,
        climate: "humid subtropical",
        preferredJobIndustry: "computers-and-it",
        politics: "republican",
        avgPopulationAge: 30
    };

    const formInputs = [
        {
            componentType: "radio",
            groupLabel: "Low Cost of Living?",
            groupValue: currentConfig.costOfLiving,
            labels: { na: "No Preference", yes: "Matters" },
            values: { na: "", yes: 1000 },
            onChange: (event: any) => handleChange("costOfLiving", event)
        },
        {
            componentType: "radio",
            groupLabel: "Low Crime Rate?",
            groupValue: currentConfig.crimeRate,
            values: { na: "", yes: 10000 },
            labels: { na: "No Preference", yes: "Matters" },
            onChange: (event: any) => handleChange("crimeRate", event),
            helperText: "The amount of people affected by crime per 100,000 people."
        },
        {
            componentType: "radio",
            groupLabel: "High Walkability/Transability?",
            groupValue: currentConfig.walkAndTransability,
            values: { na: "", yes: "high" },
            labels: { na: "No Preference", yes: "Matters" },
            onChange: (event: any) => handleChange("walkAndTransability", event),
        },
        {
            componentType: "radio",
            groupLabel: "High Quality of Education?",
            groupValue: currentConfig.qualityOfEducation,
            values: { na: "", yes: "high" },
            labels: { na: "No Preference", yes: "Matters" },
            onChange: (event: any) => handleChange("qualityOfEducation", event),
        },
        {
            componentType: "select",
            inputLabel: "Population",
            value: currentConfig.population,
            onChange: (event: any) => handleChange("population", event),
            label: "Population",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low (<300,000 people)", value: 150000},
                {title: "Medium (300,000 - 599,999 people)", value: 450000},
                {title: "High (>600,000 people)", value: 1000000}
            ]
        },
        {
            componentType: "select",
            inputLabel: "Population Density",
            value: currentConfig.populationDensity,
            onChange: (event: any) => handleChange("populationDensity", event),
            label: "Population Density",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Low (<2,500 people per square mile)", value: 2000},
                {title: "Medium (2,500 - 5,500 people per square mile)", value: 4000},
                {title: "High (>5,500 people per square mile)", value: 7000}
            ]
        },
        {
            componentType: "select",
            inputLabel: "Preferred Job Industry",
            value: currentConfig.preferredJobIndustry,
            onChange: (event: any) => handleChange("preferredJobIndustry", event),
            label: "Preferred Job Industry",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Software Developers (Computers and IT)", value: "computers-and-it"},
                {title: "Receptionists and Information Clerks (Office and Administrative Support)", value: "administrative-support"},
                {title: "Marketing Managers/Sales Managers/Chief Executives (Management)", value: "management"},
                {title: "Accountants and Auditors/Financial and Investment Analysts (Business/Financial)", value: "business-and-financial"},
                {title: "Chemical Engineers/Aerospace Engineers (Engineering)", value: "engineering"},
                {title: "Fashion Designers/Graphic Designers (Arts & Design)", value: "arts-and-design"},
                {title: "Secondary School Teachers/Elementary School Teachers (Education, Training, & Library)", value: "education-training-and-library"},
                {title: "Registered Nurses/Physicians, All Other (Healthcare)", value: "healthcare"},
                {title: "Actors/Coaches and Scouts (Entertainment/Sports)", value: "entertainment-and-sports"},
                {title: "Lawyers/Judges, Magistrate Judges, and Magistrates (Legal)", value: "legal"},
                {title: "Social Workers/Counselors, All Other (Community & Social Services)", value: "community-and-social-services"},
                {title: "All Other Industries", value: "other"}
            ]
        },
        {
            componentType: "select",
            inputLabel: "Politics",
            value: currentConfig.politics,
            onChange: (event: any) => handleChange("politics", event),
            label: "Politics",
            menuItems: [
                {title: "No Preference", value: ""},
                {title: "Democrat", value: "democrat"},
                {title: "Republican", value: "republican"}
            ]
        },
        {
            componentType: "select",
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
            componentType: "select",
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
        { title: "Cost of Living", value: "costOfLiving" },
        { title: "Crime Rate", value: "crimeRate" },
        { title: 'Walkability/Transability', value: "walkAndTransability" },
        { title: "Quality of Education", value: "qualityOfEducation" },
        { title: "Population", value: "population" },
        { title: "Population Density", value: "populationDensity" },
        { title: "Preferred Job Industry", value: "preferredJobIndustry" },
        { title: "Politics", value: "politics" },
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
                                        { input?.componentType === 'select' &&
                                            <>
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
                                            </>
                                        }
                                        { input?.componentType === 'radio' &&
                                            <>
                                                <FormLabel id="demo-row-radio-buttons-group-label">{ input?.groupLabel }</FormLabel>
                                                <RadioGroup key={ index } row name={ input?.groupValue + "group" } onChange={ input?.onChange }
                                                            value={ input?.groupValue } defaultValue={ input?.values?.na }>
                                                    {/* @ts-ignore */ }
                                                    <FormControlLabel control={<Radio />} label={ input?.labels?.yes } value={ input?.values?.yes } />
                                                    {/* @ts-ignore */ }
                                                    <FormControlLabel control={<Radio />} label={ input?.labels?.na } value={ input?.values?.na } />
                                                </RadioGroup>
                                            </>
                                        }
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