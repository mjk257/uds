import React, { useState } from "react";
import {
  CityPreferencesConfiguration,
  Occupation,
} from "../types/utility-types";
import {
  Autocomplete, Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select, Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Ranges } from "../types/utility-types";
import {LoadingButton} from "@mui/lab";
import PriorityCheckbox from "./PriorityCheckbox";
import useConfigForm from "./hooks/useConfigForm";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ParkIcon from '@mui/icons-material/Park';

const ConfigurationForm = ({
  currentConfig,
  setCurrentConfig,
  setReturnedCities,
  allOccupations,
  allRanges
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // Getting all our utility functions from the custom hook
  const {
    isOverPriorityAttributesLimit,
    isConfigEmpty,
    isDefaultRange,
    handleMultiChange,
    handleChange,
    handleSliderChange,
    handleCheckboxChange,
    handleAutocompleteChange,
    clearForm,
    submitForm,
    sliders,
    generateMarks,
    densityRange,
    annualRainfallRange,
    annualSnowfallRange
  } = useConfigForm({ currentConfig, setCurrentConfig, allRanges, setReturnedCities, setIsLoading });

  // Inputs for the form
  const formInputs = [
    {
      componentType: "header",
      text: "Traits",
      checkboxValue: "traits"
    },
    {
      componentType: "checkbox",
      label: "Low Cost of Living",
      checkboxValue: "costOfLiving",
      checkedValue: 0,
      onChange: () => handleCheckboxChange("costOfLiving", 0),
      icon: (<AttachMoneyIcon></AttachMoneyIcon>)
      
    },
    {
      componentType: "checkbox",
      label: "Low Crime Rate",
      checkboxValue: "crimeRate",
      checkedValue: 1,
      onChange: () => handleCheckboxChange("crimeRate", 1),
      icon: (<LocalPoliceIcon></LocalPoliceIcon>)
    },
    {
      componentType: "checkbox",
      label: "High Walkability",
      checkboxValue: "walkability",
      checkedValue: 100,
      onChange: () => handleCheckboxChange("walkability", 100),
      icon: (<DirectionsWalkIcon></DirectionsWalkIcon>)
    },
    {
      componentType: "checkbox",
      label: "High Bikeability",
      checkboxValue: "bikeability",
      checkedValue: 100,
      onChange: () => handleCheckboxChange("bikeability", 100),
      icon: (<PedalBikeIcon></PedalBikeIcon>)
    },
    {
      componentType: "checkbox",
      label: "Good for Outdoor Recreation",
      checkboxValue: "outdoorScore",
      checkedValue: 100,
      onChange: () => handleCheckboxChange("outdoorScore", 100),
      icon:(<ParkIcon></ParkIcon>)
    },
    {
      componentType: "header",
      text: "Population Stats",
      checkboxValue: "pop stats"
    },
    {
      componentType: "slider",
      inputLabel: "Population",
      valueLabelDisplay: "auto",
      value: Array.isArray(currentConfig.population)  ? currentConfig.population.slice(0, 2)  : currentConfig.population,
      onChange: (event: any) => handleSliderChange("population", event),
      marks: generateMarks(sliders.populationSlider),
      checkboxValue: "population",
      label: "Population"
    },
    {
      componentType: "slider",
      inputLabel: "Average Population Age",
      value: Array.isArray(currentConfig.avgPopulationAge)  ? currentConfig.avgPopulationAge.slice(0, 2)  : currentConfig.avgPopulationAge,
      marks: generateMarks(sliders.ageSlider),
      onChange: (event: any) => handleSliderChange("avgPopulationAge", event),
      checkboxValue: "avgPopulationAge",
      label: "Average Population Age"
    },
    {
      componentType: "select",
      inputLabel: "Population Density",
      value: currentConfig.populationDensity,
      onChange: (event: any) => handleChange("populationDensity", event),
      checkboxValue: "populationDensity",
      label: "Population Density",
      menuItems: [
        { title: "No Preference", value: ""},
        { title: "Low", value: densityRange[0] },
        { title: "Medium", value: densityRange[2] },
        { title: "High", value: densityRange[1] },
      ],
    },
    {
      componentType: "header",
      text: "Climate",
      checkboxValue: "climate"
    },
    {
      componentType: "slider",
      inputLabel: "Average Winter Temperature (fahrenheit)",
      value: Array.isArray(currentConfig.avgWinterTemp)  ? currentConfig.avgWinterTemp.slice(0, 2)  : currentConfig.avgWinterTemp,
      onChange: (event: any) => handleSliderChange("avgWinterTemp", event),
      marks: generateMarks(sliders.winterSlider),
      checkboxValue: "avgWinterTemp",
      label: "Average Winter Temperature (°F)"
    },
    {
      componentType: "slider",
      inputLabel: "Average Summer Temperature (fahrenheit)",
      value: Array.isArray(currentConfig.avgSummerTemp)  ? currentConfig.avgSummerTemp.slice(0, 2)  : currentConfig.avgSummerTemp,
      onChange: (event: any) => handleSliderChange("avgSummerTemp", event),
      marks: generateMarks(sliders.summerSlider),
      checkboxValue: "avgSummerTemp",
      label: "Average Summer Temperature (°F)"
    },
    {
      componentType: "select",
      inputLabel: "Annual Snowfall (inches)",
      value: currentConfig.annualSnowfall,
      onChange: (event: any) => handleMultiChange("annualSnowfall", event),
      checkboxValue: "annualSnowfall",
      label: "Annual Snowfall",
      menuItems: [
        { title: "No Snow", value: annualSnowfallRange[0] },
        { title: "Average Snow", value: annualSnowfallRange[2] },
        { title: "Excessive Snow", value: annualSnowfallRange[1] },
      ],
      multiple: true,
    },
    {
      componentType: "select",
      inputLabel: "Annual Rainfall (inches)",
      value: currentConfig.annualRainfall,
      onChange: (event: any) => handleMultiChange("annualRainfall", event),
      checkboxValue: "annualRainfall",
      label: "Annual Rainfall",
      menuItems: [
        { title: "Dry", value: annualRainfallRange[0] },
        { title: "Average", value: annualRainfallRange[2] },
        { title: "Wet", value: annualRainfallRange[1] },
      ],
      multiple: true,
    },
    {
      componentType: "header",
      text: "Career",
      checkboxValue: "career"
    },
    {
      componentType: "autocomplete",
      options: allOccupations,
      getOptionLabel: (option: any) => option.title,
      value: currentConfig.preferredOccupation,
      onChange: (event: any, newValue: any) =>
          handleAutocompleteChange("preferredOccupation", event, newValue),
      label: "Preferred Occupation",
      checkboxValue: "preferredOccupation",
      helperText: "Note: Since live data is being used, selecting a preferred occupation will add roughly 10 seconds to the search time."
    },
    {
      componentType: "select",
      inputLabel: "State Politics",
      value: currentConfig.politics,
      onChange: (event: any) => handleChange("politics", event),
      checkboxValue: "politics",
      label: "State Politics",
      menuItems: [
        { title: "No Preference", value: "" },
        { title: "Democrat", value: "democrat" },
        { title: "Republican", value: "republican" },
      ],
    }
  ];

  return (
    <>
      {allOccupations && allRanges && (
        <div className="preferences-form-container">
            <Card sx={{borderRadius:"15px"}} className="preferences-form-card">
              <CardHeader title="What Are You Looking For in a City?"/>
              <Divider />
              <CardContent className="preferences-form-content">
                <Typography variant="body1" className="preferences-form-text">
                  Fill in any criteria that you want and star up to three that are very important to you.
                </Typography>
                <br/>
                {formInputs.map((input, index) => {
                  return (
                    <FormControl
                      variant="standard"
                      className="preferences-select"
                      key={index}
                    >
                      {input?.componentType === "header" && (
                          <>
                            <div style={{ display: 'flex', alignItems: 'left' }}>
                              <Typography variant="h4" sx={{ display: 'flex', alignItems: 'left', marginTop: "10px" }}><strong>{input.text}</strong></Typography>
                            </div>
                          </>
                      )}
                      {input?.componentType === "select" && (
                        <div style={{ display: 'flex', alignItems: 'left' }}>
                          <InputLabel id={input.inputLabel}>
                            {input.label}
                          </InputLabel>
                          <Select
                              labelId={input?.inputLabel}
                              id={input?.inputLabel}
                              value={input?.value}
                              onChange={input?.onChange}
                              label={input?.label}
                              sx={{ width: "100%" }}
                              disabled={isLoading}
                              multiple={input?.multiple}
                          >
                            {input.menuItems?.map((menuItem, index) => {
                              return (
                                  <MenuItem value={menuItem.value} key={index}>
                                    {menuItem.title}
                                  </MenuItem>
                              );
                            })}
                          </Select>
                          <Box style={{ transform: "translate(10px, 10px)" }}>
                            <PriorityCheckbox currentConfig={ currentConfig } value={input.checkboxValue}
                                              bottomMargin={ 0.5 } isDefaultRange={ isDefaultRange }
                                              handleChange={ handleChange } isLoading={ isLoading }/>
                          </Box>
                        </div>
                      )}
                      {input?.componentType === "autocomplete" && (
                        <div style={{ display: 'flex', alignItems: 'left' }}>
                          <Autocomplete
                            options={input?.options as Occupation[]}
                            autoComplete
                            getOptionLabel={input?.getOptionLabel}
                            sx={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={input?.label}
                                variant="standard"
                              />
                            )}
                            value={input?.value}
                            onChange={input?.onChange}
                            disabled={isLoading}
                          />
                          <Box style={{ transform: "translate(10px, 10px)" }}>
                            <PriorityCheckbox currentConfig={ currentConfig } value={input.checkboxValue}
                                              bottomMargin={ 0.5 } isDefaultRange={ isDefaultRange }
                                              handleChange={ handleChange } isLoading={ isLoading }/>
                          </Box>
                        </div>
                      )}
                      {input?.componentType === "checkbox" && (
                          <>
                            <FormLabel sx={{display:"flex", alignItems:"center" , width: "fit-content", pointerEvents: "none", marginTop: -1, marginBottom: -1 }}>
                              {input?.icon}<div style={{margin:"0px 5px"}}></div>{input?.label}
                              <div style={{ display: "flex", alignItems: "center", marginRight: "5px"}}>
                                <Checkbox
                                      sx={{ width: "fit-content", pointerEvents: "auto" }}
                                      //@ts-ignore
                                      checked={currentConfig[input.checkboxValue] === input.checkedValue}
                                      onChange={ input?.onChange }
                                      value={ input?.value }
                                      disabled={isLoading}
                                />
                                <PriorityCheckbox currentConfig={ currentConfig } value={input.checkboxValue}
                                                  bottomMargin={ 0.25 } isDefaultRange={ isDefaultRange }
                                                  handleChange={ handleChange } isLoading={ isLoading }/>
                              </div>
                            </FormLabel>
                          </>
                      )}
                      {input?.componentType === "slider" && (
                          <>
                            <FormLabel sx={{ width: "fit-content", pointerEvents: "none", marginTop: -1, marginBottom: -1 }}>
                              {input?.label}
                              <PriorityCheckbox currentConfig={ currentConfig } value={input.checkboxValue}
                                                bottomMargin={ 0.5 } isDefaultRange={ isDefaultRange }
                                                handleChange={ handleChange } isLoading={ isLoading }/>
                            </FormLabel>
                            <Slider
                                key={index}
                                value={input?.value as number[]}
                                onChange={input?.onChange}
                                disabled={isLoading}
                                step={null}
                                min={0}
                                max={10}
                                marks={input?.marks}
                                />
                          </>
                      )}
                      {input?.helperText && input?.value && (
                          <FormHelperText>{input?.helperText}</FormHelperText>
                      )}
                    </FormControl>
                  );
                })}
                {isOverPriorityAttributesLimit() && (
                    <FormHelperText>
                      <span style={{ fontSize: 16, color: "red" }}>You may only star up to three attributes!</span>
                    </FormHelperText>
                )}
                <br />
                <div className="preferences-form-sibling-set">
                  <Button color="error" variant="outlined" onClick={clearForm} disabled={isLoading}>
                    Clear
                  </Button>
                  <LoadingButton
                    loading={ isLoading }
                    color="primary"
                    variant="outlined"
                    onClick={submitForm}
                    disabled={isOverPriorityAttributesLimit() || isConfigEmpty() || isLoading}
                    >
                    Submit
                  </LoadingButton>
                </div>
              </CardContent>
            </Card>
        </div>)}
    </>
  );
};

type Props = {
  currentConfig: CityPreferencesConfiguration;
  setCurrentConfig: Function;
  setReturnedCities: Function;
  allOccupations: Occupation[];
  allRanges: Ranges;
};

export default ConfigurationForm;
