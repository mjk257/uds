import React, { useEffect } from "react";
import {CityPreferencesConfiguration, defaultCityPreferencesConfiguration} from "../types/utility-types";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl, FormHelperText, FormLabel, InputBaseComponentProps,
    InputLabel,
    MenuItem,
    Select, Slider, TextField, TextFieldVariants, Typography
} from "@mui/material";
import { Configs } from "../types/utility-types";

// Note that some of this stuff might be placeholders for later on

const ConfigurationForm = ({ currentConfig, setCurrentConfig, allConfigs, currentConfigName, setAllConfigs } : Props) => {

    const handleChange = (property : any, event : any) => {
        setCurrentConfig({ ...currentConfig, [property]: event.target.value });
    }

    useEffect(() => {
        console.log(currentConfig);
        setAllConfigs({ ...allConfigs, [currentConfigName as string]: currentConfig });
    }, [currentConfig])

    const clearForm = () => {
        setCurrentConfig(defaultCityPreferencesConfiguration);
    }

    const submitForm = () => {
        console.log("Not implemented yet, will be done once API stuff is finished");
    }

    const formInputs = [
        {
            inputComponent: "select",
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
            inputComponent: "select",
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
            inputComponent: "select",
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
            inputComponent: "select",
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
            inputComponent: "slider",
            inputLabel: "Crime Rate",
            defaultValue: 0,
            step: 5000,
            marks: true,
            min: 0,
            max: 100000,
            valueLabelDisplay: "auto",
            className: 'preferences-slider',
            onChange: (event: any) => handleChange("crimeRate", event),
            helperText: "The amount of people affected by crime per 100,000 people"
        },
        {
            inputComponent: "select",
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
            inputComponent: "select",
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
            inputComponent: "select",
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
            inputComponent: "select",
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
            inputComponent: "textField",
            label: "Average Population Age",
            variant: 'standard',
            type: 'text',
            value: currentConfig.avgPopulationAge,
            inputProps: {
                inputMode: 'numeric'
            },
            onChange: (event: any) => handleChange("avgPopulationAge", event),
            helperText: "Please enter a number between 1 - 100",
            error: currentConfig.avgPopulationAge < 1 || currentConfig.avgPopulationAge > 100 || String(currentConfig.avgPopulationAge).match('^\\D+$')
        }
    ]

    return  (
        <>
            <div className='preferences-form-container'>
                <Card className='preferences-form-card'>
                    <CardHeader title="What are you looking for in a city?" />
                    <Divider />
                    <CardContent className='preferences-form-content'>
                        { formInputs.map((input, index) => {
                            if (input.inputComponent === "select") {
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
                                    </FormControl>
                                )
                            } else if (input.inputComponent === "slider") {
                                return (
                                    <FormControl className='preferences-slider-text' key={ index }>
                                        <FormLabel component="legend">{ input.inputLabel }: { currentConfig.crimeRate }</FormLabel>
                                        <Slider
                                            defaultValue={ input?.defaultValue }
                                            step={ input?.step }
                                            marks={ input?.marks }
                                            min={ input?.min }
                                            max={ input?.max }
                                            valueLabelDisplay={ input?.valueLabelDisplay as "auto" }
                                            className={ input?.className }
                                            onChange={ input?.onChange }
                                        />
                                        <FormHelperText>{ input.helperText }</FormHelperText>
                                    </FormControl>
                                )
                            } else if (input.inputComponent === "textField") {
                                return (
                                    <FormControl variant='standard' className='preferences-text-field'>
                                        <TextField
                                            label={ input?.label }
                                            variant={ input?.variant as TextFieldVariants }
                                            type={ input?.type }
                                            value={ input?.value }
                                            inputProps={ input?.inputProps as InputBaseComponentProps }
                                            onChange={ input?.onChange }
                                            helperText={ input?.helperText }
                                            error={ input?.error as boolean }
                                        />
                                    </FormControl>
                                )
                            }
                        })}
                        <div className='preferences-form-sibling-set'>
                            <Button color='error' variant="outlined" onClick={ clearForm }>
                                Clear
                            </Button>
                            <Button color='primary' variant="outlined" onClick={ submitForm }>
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