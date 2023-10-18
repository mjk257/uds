import React, { useEffect } from "react";
import {CityPreferencesConfiguration, defaultCityPreferencesConfiguration, Occupation} from "../types/utility-types";
import {
    Autocomplete, AutocompleteRenderInputParams,
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select, TextField
} from "@mui/material";
import { Configs } from "../types/utility-types";
import { searchForCities, getAllOccupations } from "../util/api-calls";

const ConfigurationForm = ({ currentConfig, setCurrentConfig, allConfigs, currentConfigName, setAllConfigs, setReturnedCities }: Props) => {

    const [allOccupations, setAllOccupations] = React.useState([]);

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
            // Not sure why, but items which are numbers are not being converted after being passed through
            // handleChange, so I'm doing the conversion manually for now. Will fix later on
            const value = isNaN(event.target.value) || event.target.value === "" ?
                event.target.value : Number(event.target.value);
            setCurrentConfig({...currentConfig, [property]: value });
        }
    }

    const handleAutocompleteChange = (property: any, event: any, newValue: any) => {
        setCurrentConfig({...currentConfig, [property]: newValue });
    }

    useEffect(() => {
        // Get all the occupations at the beginning
        getAllOccupations().then(resp => {
            setAllOccupations(resp);
        });
    }, [])

    useEffect(() => {
        setAllConfigs({ ...allConfigs, [currentConfigName as string]: currentConfig });
    }, [currentConfig])

    const clearForm = () => {
        setCurrentConfig(defaultCityPreferencesConfiguration);
    }

    const submitForm = () => {
        // 1.) send the data to the search function and await its response
        searchForCities(currentConfig).then(resp => {
            setReturnedCities(resp);
        });
    }

    useEffect(() => {
        formInputs[6].options = allOccupations
    }, [allOccupations]);

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
            values: { na: "", yes: 95 },
            labels: { na: "No Preference", yes: "Matters" },
            onChange: (event: any) => handleChange("walkAndTransability", event),
        },
        {
            componentType: "radio",
            groupLabel: "High Quality of Education?",
            groupValue: currentConfig.qualityOfEducation,
            values: { na: "", yes: 95 },
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
            componentType: "autocomplete",
            options: allOccupations,
            getOptionLabel: (option: any) => option.title,
            value: currentConfig.preferredOccupation,
            onChange: (event: any, newValue: any) => handleAutocompleteChange("preferredOccupation", event, newValue),
            label: "Preferred Occupation"
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
        { title: "Preferred Occupation", value: "preferredOccupation" },
        { title: "Politics", value: "politics" },
        { title: "Climate", value: "climate" },
        { title: "Average Population Age", value: "avgPopulationAge" }
    ]

    return  (
        <>
            <div className='preferences-form-container'>
                {allOccupations &&
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
                                        { input?.componentType === 'autocomplete' &&
                                            <>
                                                <Autocomplete options={ input?.options as Occupation[] }
                                                              autoComplete
                                                              getOptionLabel={ input?.getOptionLabel }
                                                              renderInput={ (params) => <TextField { ...params } label={ input?.label } variant='standard' /> }
                                                              value={ input?.value }
                                                              onChange={ input?.onChange }
                                                              />
                                            </>
                                        }
                                        { input?.componentType === 'radio' &&
                                            <>
                                                <FormLabel id="demo-row-radio-buttons-group-label">{ input?.groupLabel }</FormLabel>
                                                <RadioGroup key={ index } row name={ input?.groupValue + "group" } onChange={ input?.onChange }
                                                            value={ input?.groupValue } defaultValue={ input?.values?.na }>
                                                    <FormControlLabel control={<Radio />} label={ input?.labels?.yes } value={ input?.values?.yes } />
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
                                                              disabled={ !currentConfig[checkbox.value] }
                                                              checked={ currentConfig.priorityAttributes.includes(checkbox.value) }
                                                              onChange={ (event) => handleChange("priorityAttributes", event) }
                                                              name={ checkbox.title }
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
                </Card>}
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