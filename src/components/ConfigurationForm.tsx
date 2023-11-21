import React, { useEffect } from "react";
import {
  CityPreferencesConfiguration,
  defaultCityPreferencesConfiguration,
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
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select, Slider,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Configs, ageRange, densityRange, populationRange,
  avgSummerTempRange, avgWinterTempRange,
  annualRainfallRange, annualSnowfallRange } from "../types/utility-types";
import { searchForCities, getAllOccupations } from "../util/api-calls";
import {Star, StarBorder} from "@mui/icons-material";

const ConfigurationForm = ({
  currentConfig,
  setCurrentConfig,
  allConfigs,
  currentConfigName,
  setAllConfigs,
  setReturnedCities,
}: Props) => {
  const [allOccupations, setAllOccupations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const isOverPriorityAttributesLimit = () =>
    currentConfig?.priorityAttributes.length > 3;

  const isConfigEmpty = () => {
    const allSlidersInDefaultRange = isDefaultRange("population")
        && isDefaultRange("avgPopulationAge")
        && isDefaultRange("avgWinterTemp")
        && isDefaultRange("avgSummerTemp");
    let allOtherValuesEmpty = true;
    for (const [key, value] of Object.entries(currentConfig)) {
      if ((typeof(value) === "string" || typeof(value) === "number") && (value !== "" && value !== null)) {
        allOtherValuesEmpty = false;
      }
    }
    // Priority attributes can be empty, so submission should be enabled so long as at least 1 attribute is filled
    return allSlidersInDefaultRange && allOtherValuesEmpty;
  };

  const isDefaultRange = (property: string) => {
    if (property === "population") {
      return currentConfig.population[0] === 0 && currentConfig.population[1] === 10;
    }
    else if (property === "populationDensity") {
      return currentConfig.populationDensity[0] === 0 && currentConfig.populationDensity[1] === 10;
    }
    else if (property === "avgPopulationAge") {
      return currentConfig.avgPopulationAge[0] === 0 && currentConfig.avgPopulationAge[1] === 10;
    }
    else if (property === "annualSnowfall") {
        return currentConfig.annualSnowfall[0] === 0 && currentConfig.annualSnowfall[1] === 10;
    }
    else if (property === "annualRainfall") {
        return currentConfig.annualRainfall[0] === 0 && currentConfig.annualRainfall[1] === 10;
    }
    else if (property === "avgWinterTemp") {
        return currentConfig.avgWinterTemp[0] === 0 && currentConfig.avgWinterTemp[1] === 10;
    }
    else if (property === "avgSummerTemp") {
        return currentConfig.avgSummerTemp[0] === 0 && currentConfig.avgSummerTemp[1] === 10;
    }
    // If none of these, return false
    return false;
  }

  const handleMultiChange = (property: any, event: any) => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    const {
      target: { value },
    } = event;
    let newValue;
    if(typeof value === 'string'){
      newValue = value.includes(",") ? value.split(",") : [value];
    } else {
      newValue = value;
    }
    setCurrentConfig({
        ...currentConfig,
        priorityAttributes: newPriorityAttributes,
        [property]: newValue,
    });
  };

  const handleChange = (property: any, event: any) => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    const attribute = event.target.value;
    const value =
      isNaN(event.target.value) || event.target.value === ""
        ? event.target.value
        : Number(event.target.value);

    if (property === "priorityAttributes") {
      if (newPriorityAttributes.includes(attribute)) {
        newPriorityAttributes = newPriorityAttributes.filter(
          (item: any) => item !== attribute
        );
      } else {
        newPriorityAttributes = newPriorityAttributes.concat(attribute);
      }
      setCurrentConfig({ ...currentConfig, [property]: newPriorityAttributes });
    } else if (!value && currentConfig.priorityAttributes.includes(property)) {
      // Removing an attribute from prioritization if it is given no preference
      newPriorityAttributes = newPriorityAttributes.filter(
        (item: any) => item !== property
      );
      setCurrentConfig({
        ...currentConfig,
        priorityAttributes: newPriorityAttributes,
        [property]: value,
      });
    } else {
      setCurrentConfig({ ...currentConfig, [property]: value });
    }
  };

  const handleSliderChange = (property: any, event: any) => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    const value = event.target.value;

    if (isDefaultRange(property)) {
      setCurrentConfig({
        ...currentConfig,
        priorityAttributes: newPriorityAttributes,
        [property]: value,
      });
    }
    else {
      setCurrentConfig({ ...currentConfig, [property]: value });
    }
  }

  const handleCheckboxChange = (property: any, checkedValue: any) => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    // @ts-ignore
    if (currentConfig.priorityAttributes.includes(property) && currentConfig[property] === checkedValue) {
      newPriorityAttributes = newPriorityAttributes.filter(
        (item: any) => item !== property
      );
    }
    // @ts-ignore
    const newValue = currentConfig[property] === checkedValue ? "" : checkedValue;
    setCurrentConfig({
        ...currentConfig,
        [property]: newValue,
        priorityAttributes: newPriorityAttributes
    });
  };

  // Used to change the slider value check marks. Had a lot of trouble with this so keeping this jank for now
  useEffect(() => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    // Removing an attribute from prioritization if it is given no preference

    if (isDefaultRange("avgPopulationAge")) {
      newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "avgPopulationAge");
    }
    if (isDefaultRange("population")) {
      newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "population");
    }
    if (isDefaultRange("populationDensity")) {
      newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "populationDensity");
    }
    if (isDefaultRange("annualSnowfall")) {
        newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "annualSnowfall");
    }
    if (isDefaultRange("annualRainfall")) {
        newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "annualRainfall");
    }
    if (isDefaultRange("avgWinterTemp")) {
        newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "avgWinterTemp");
    }
    if (isDefaultRange("avgSummerTemp")) {
        newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "avgSummerTemp");
    }
    setCurrentConfig({
      ...currentConfig,
      priorityAttributes: newPriorityAttributes
    });
  }, [currentConfig.population, currentConfig.populationDensity, currentConfig.avgPopulationAge,
    currentConfig.annualRainfall, currentConfig.annualSnowfall, currentConfig.avgWinterTemp, currentConfig.avgSummerTemp])

  const handleAutocompleteChange = (
    property: any,
    event: any,
    newValue: any
  ) => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    // Removing an attribute from prioritization if it is given no preference
    newPriorityAttributes = newPriorityAttributes.filter(
        (item: any) => item !== property
    );
    setCurrentConfig({
      ...currentConfig,
      priorityAttributes: newPriorityAttributes,
      [property]: newValue,
    });
  };

  useEffect(() => {
    // Get all the occupations at the beginning
    getAllOccupations().then((resp) => {
      setAllOccupations(resp);
    });
  }, []);

  useEffect(() => {
    setAllConfigs({
      ...allConfigs,
      [currentConfigName as string]: currentConfig,
    });
  }, [currentConfig]);

  const clearForm = () => {
    setCurrentConfig(defaultCityPreferencesConfiguration);
  };

  const submitForm = () => {
    // Create a copy of the current config, making sure to display the original on screen
    // This copy will contain the midpoint of the slider values, the same values for other fields
    const populationMidpoint = (populationSlider[(currentConfig.population[0] as number)] + populationSlider[(currentConfig.population[1] as number)]) / 2;
    const ageMidpoint = (ageSlider[(currentConfig.avgPopulationAge[0] as number)] + ageSlider[(currentConfig.avgPopulationAge[1] as number)]) / 2;
    const annualSnowfallMidpoint = currentConfig.annualSnowfall.length > 0 ? currentConfig.annualSnowfall.reduce((a, b) => a + b) / currentConfig.annualSnowfall.length : null;
    const annualRainfallMidpoint =currentConfig.annualRainfall.length > 0 ? currentConfig.annualRainfall.reduce((a, b) => a + b) / currentConfig.annualRainfall.length : null;
    const avgWinterTempMidpoint = (summerSlider[(currentConfig.avgWinterTemp[0] as number)] + summerSlider[(currentConfig.avgWinterTemp[1] as number)]) / 2;
    const avgSummerTempMidpoint = (winterSlider[(currentConfig.avgSummerTemp[0] as number)] + winterSlider[(currentConfig.avgSummerTemp[1] as number)]) / 2;
    const currentConfigCopy = {
        ...currentConfig,
        population: populationMidpoint,
        avgPopulationAge: ageMidpoint,
        annualSnowfall: annualSnowfallMidpoint,
        annualRainfall: annualRainfallMidpoint,
        avgWinterTemp: avgWinterTempMidpoint,
        avgSummerTemp: avgSummerTempMidpoint
    }

    // send the data to the search function and await its response
    searchForCities(currentConfigCopy, setIsLoading).then((resp) => {
      setReturnedCities(resp);
      setIsLoading(false);
    });
  };

  function numFormatter(num: number) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  const generateRange = (ranges: number[]) => {
    const range = [];
    range.push(ranges[1]);
    range.push(ranges[2]);
    for(let i = 0; i < 10; i++){
      if(i < 5){
        range.push(Math.round(ranges[0] + i % 5 * ((ranges[2] - ranges[0]) / 5)))
      } else if (i > 5){
        range.push(Math.round(ranges[2] + i % 5 * ((ranges[1] - ranges[2]) / 5)))
      }
    }
    console.log(range.sort(function(a, b){return a - b}))
    return range.sort(function(a, b){return a - b});
  }

  const populationSlider = generateRange(populationRange);
  const summerSlider = generateRange(avgSummerTempRange);
  const winterSlider = generateRange(avgWinterTempRange);
  const ageSlider = generateRange(ageRange);

  const generateMarks = (range: number[]) => {
    let marks = []
    for(let i = 0; i < range.length; i++){
      marks.push({
        value: i,
        label: numFormatter(Math.round(range[i]))
      })
    }
    return marks;
  }

  useEffect(() => {
    formInputs[6].options = allOccupations;
  }, [allOccupations]);

  const PriorityCheckbox = ({ value, bottomMargin } : CheckboxProps) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            sx={{ marginLeft: 1, marginBottom: bottomMargin, width: "fit-content", pointerEvents: "auto" }}
            icon={ <StarBorder /> }
            checkedIcon={ <Star /> }
            //@ts-ignore
            disabled={
              //@ts-ignore
              currentConfig[value] === null ||
              //@ts-ignore
              currentConfig[value] === "" ||
              isDefaultRange(value) ||
              isLoading
            }
            checked={currentConfig.priorityAttributes.includes(value)}
            onChange={(event) => handleChange("priorityAttributes", event)}
            value={value}
          />
        }
        label={""}
      />
    );
  };

  const formInputs = [
    {
      componentType: "checkbox",
      label: "Low Cost of Living",
      checkboxValue: "costOfLiving",
      checkedValue: 95,
      onChange: () => handleCheckboxChange("costOfLiving", 95)
    },
    {
      componentType: "checkbox",
      label: "Low Crime Rate",
      checkboxValue: "crimeRate",
      checkedValue: 1,
      onChange: () => handleCheckboxChange("crimeRate", 1)
    },
    {
      componentType: "checkbox",
      label: "High Walkability",
      checkboxValue: "walkability",
      checkedValue: 100,
      onChange: () => handleCheckboxChange("walkability", 100)
    },
    {
      componentType: "checkbox",
      label: "High Bikeability",
      checkboxValue: "bikeability",
      checkedValue: 100,
      onChange: () => handleCheckboxChange("bikeability", 100)
    },
    {
      componentType: "checkbox",
      label: "Good for Outdoor Recreation",
      checkboxValue: "outdoorScore",
      checkedValue: 100,
      onChange: () => handleCheckboxChange("outdoorScore", 100)
    },
    {
      componentType: "slider",
      inputLabel: "Population",
      valueLabelDisplay: "auto",
      value: Array.isArray(currentConfig.population)  ? currentConfig.population.slice(0, 2)  : currentConfig.population,
      onChange: (event: any) => handleSliderChange("population", event),
      marks: generateMarks(populationSlider),
      checkboxValue: "population",
      label: "Population"
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
      componentType: "slider",
      inputLabel: "Average Winter Temperature (fahrenheit)",
      value: Array.isArray(currentConfig.avgWinterTemp)  ? currentConfig.avgWinterTemp.slice(0, 2)  : currentConfig.avgWinterTemp,
      onChange: (event: any) => handleSliderChange("avgWinterTemp", event),
      marks: generateMarks(winterSlider),
      checkboxValue: "avgWinterTemp",
      label: "Average Winter Temperature (fahrenheit)"
    },
    {
      componentType: "slider",
      inputLabel: "Average Summer Temperature (fahrenheit)",
      value: Array.isArray(currentConfig.avgSummerTemp)  ? currentConfig.avgSummerTemp.slice(0, 2)  : currentConfig.avgSummerTemp,
      onChange: (event: any) => handleSliderChange("avgSummerTemp", event),
      marks: generateMarks(summerSlider),
      checkboxValue: "avgSummerTemp",
      label: "Average Summer Temperature (fahrenheit)"
    },
    {
      componentType: "slider",
      inputLabel: "Average Population Age",
      value: Array.isArray(currentConfig.avgPopulationAge)  ? currentConfig.avgPopulationAge.slice(0, 2)  : currentConfig.avgPopulationAge,
      marks: generateMarks(ageSlider),
      onChange: (event: any) => handleSliderChange("avgPopulationAge", event),
      checkboxValue: "avgPopulationAge",
      label: "Average Population Age"
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
      inputLabel: "Politics",
      value: currentConfig.politics,
      onChange: (event: any) => handleChange("politics", event),
      checkboxValue: "politics",
      label: "Politics",
      menuItems: [
        { title: "No Preference", value: "" },
        { title: "Democrat", value: "democrat" },
        { title: "Republican", value: "republican" },
      ],
    }
  ];

  return (
    <>
      <div className="preferences-form-container">
        {allOccupations && (
          <Card className="preferences-form-card">
            <CardHeader title="What Are You Looking For in a City?" />
            <Divider />
            <CardContent className="preferences-form-content">
              {formInputs.map((input, index) => {
                return (
                  <FormControl
                    variant="standard"
                    className="preferences-select"
                    key={index}
                  >
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
                          <PriorityCheckbox value={input.checkboxValue} bottomMargin={ 0.5 }/>
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
                          <PriorityCheckbox value={input.checkboxValue} bottomMargin={ 0.5 }/>
                        </Box>
                      </div>
                    )}
                    {input?.componentType === "checkbox" && (
                        <>
                          <FormLabel sx={{ width: "fit-content", pointerEvents: "none", marginTop: -1, marginBottom: -1 }}>
                            {input?.label}
                            <Checkbox
                                  sx={{ width: "fit-content", pointerEvents: "auto" }}
                                  //@ts-ignore
                                  checked={currentConfig[input.checkboxValue] === input.checkedValue}
                                  onChange={ input?.onChange }
                                  value={ input?.value }
                                  disabled={isLoading}
                            />
                            <PriorityCheckbox value={input.checkboxValue} bottomMargin={ 0.25 }/>
                          </FormLabel>
                        </>
                    )}
                    {input?.componentType === "slider" && (
                        <>
                          <FormLabel sx={{ width: "fit-content", pointerEvents: "none", marginTop: -1, marginBottom: -1 }}>
                            {input?.label}
                            <PriorityCheckbox value={input?.checkboxValue} bottomMargin={ 0.5 }/>
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
                    <span style={{ fontSize: 20, color: "red" }}>Please only star up to 3 attributes!</span>
                  </FormHelperText>
              )}
              <br />
              <div className="preferences-form-sibling-set">
                {isLoading && (<CircularProgress/>)}
                <Button color="error" variant="outlined" onClick={clearForm} disabled={isLoading}>
                  Clear
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={submitForm}
                  disabled={isOverPriorityAttributesLimit() || isConfigEmpty() || isLoading}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

type Props = {
  currentConfig: CityPreferencesConfiguration;
  setCurrentConfig: Function;
  allConfigs: Configs;
  currentConfigName: String;
  setAllConfigs: Function;
  setReturnedCities: Function;
};

type CheckboxProps = {
  value: string,
  bottomMargin: number
}

export default ConfigurationForm;
