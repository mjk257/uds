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
  Radio,
  RadioGroup,
  Select, Slider,
  TextField,
} from "@mui/material";
import { Configs, ageRange, densityRange, populationRange, numTics } from "../types/utility-types";
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

  const isOverPriorityAttributesLimit = () =>
    currentConfig?.priorityAttributes.length > 3;

  const isConfigEmpty = () => {
    console.log(currentConfig);
    const filteredConfig = Object.values(currentConfig).filter(
      (value: any) => value !== "" && value !== null && ((!isDefaultRange("population") || !isDefaultRange("populationDensity") || !isDefaultRange("avgPopulationAge")))
    );
    // Priority attributes can be empty, so submission should be enabled so long as at least 1 attribute is filled
    return filteredConfig.length <= 1;
  };

  const isDefaultRange = (property: string) => {
    if (property === "population") {
      return currentConfig.population[0] === populationRange[0] && currentConfig.population[1] === populationRange[1];
    }
    else if (property === "populationDensity") {
      return currentConfig.populationDensity[0] === densityRange[0] && currentConfig.populationDensity[1] === densityRange[1];
    }
    else if (property === "avgPopulationAge") {
      return currentConfig.avgPopulationAge[0] === ageRange[0] && currentConfig.avgPopulationAge[1] === ageRange[1];
    }
    // If none of these, return false
    return false;
  }

  const handleChange = (property: any, event: any) => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    const attribute = event.target.value;
    const value =
      isNaN(event.target.value) || event.target.value === ""
        ? event.target.value
        : Number(event.target.value);

    console.log(value);

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

  // Used to change the slider value check marks. Had a lot of trouble with this so keeping this jank for now
  useEffect(() => {
    let newPriorityAttributes = currentConfig.priorityAttributes;
    // Removing an attribute from prioritization if it is given no preference
    console.log("Reached default range, should remove item from priority attributes")

    if (isDefaultRange("avgPopulationAge")) {
      newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "avgPopulationAge");
    }
    if (isDefaultRange("population")) {
      newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "population");
    }
    if (isDefaultRange("populationDensity")) {
      newPriorityAttributes = newPriorityAttributes.filter((item: any) => item !== "populationDensity");
    }
    setCurrentConfig({
      ...currentConfig,
      priorityAttributes: newPriorityAttributes
    });
  }, [currentConfig.population, currentConfig.populationDensity, currentConfig.avgPopulationAge])

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
    const populationMidpoint = ((currentConfig.population[0] as number) + (currentConfig.population[1] as number)) / 2;
    const densityMidpoint = ((currentConfig.populationDensity[0] as number) + (currentConfig.populationDensity[1] as number)) / 2;
    const ageMidpoint = ((currentConfig.avgPopulationAge[0] as number) + (currentConfig.avgPopulationAge[1] as number)) / 2;
    const currentConfigCopy = {
        ...currentConfig,
        population: populationMidpoint,
        populationDensity: densityMidpoint,
        avgPopulationAge: ageMidpoint
    }

    // send the data to the search function and await its response
    searchForCities(currentConfigCopy).then((resp) => {
      setReturnedCities(resp);
    });
  };

  const generateMarks = (range: number[], numTics: number) => {
    const increment = (range[1] - range[0]) / numTics;
    const marks = []
    for (let i = 0; i <= numTics; i++) {
        const value = range[0] + i * increment;
        let label = String(range[0] + i * increment);
        // If in the thousands, shorten to "num K"
        if (Number(value) >= 1000 && Number(value) < 1000000) {
          label = (Math.round(value / 1000)) + "k";
        }
        // If in the millions, shorten to "num M"
        else if (Number(value) >= 1000000) {
          label = (Math.round(value / 1000) / 1000) + "m";
        }
        marks.push({
            value: value,
            label: label
        });
    }
    return marks;
  }

  useEffect(() => {
    formInputs[6].options = allOccupations;
  }, [allOccupations]);

  const PriorityCheckbox = ({ value } : CheckboxProps) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            sx={{ marginLeft: 1, marginBottom: 0.5, width: "fit-content", pointerEvents: "auto" }}
            icon={ <StarBorder /> }
            checkedIcon={ <Star /> }
            //@ts-ignore
            disabled={
              //@ts-ignore
              currentConfig[value] === null ||
              //@ts-ignore
              currentConfig[value] === "" ||
              isDefaultRange(value)
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
      componentType: "radio",
      groupLabel: "Low Cost of Living?",
      groupValue: currentConfig.costOfLiving,
      labels: { na: "No Preference", yes: "Matters" },
      values: { na: "", yes: 0 },
      checkboxValue: "costOfLiving",
      onChange: (event: any) => handleChange("costOfLiving", event),
    },
    {
      componentType: "radio",
      groupLabel: "Low Crime Rate?",
      groupValue: currentConfig.crimeRate,
      values: { na: "", yes: 10000 },
      labels: { na: "No Preference", yes: "Matters" },
      onChange: (event: any) => handleChange("crimeRate", event),
      checkboxValue: "crimeRate",
      helperText: "The amount of people affected by crime per 100,000 people.",
    },
    {
      componentType: "radio",
      groupLabel: "High Walkability/Transability?",
      groupValue: currentConfig.walkAndTransability,
      values: { na: "", yes: 95 },
      labels: { na: "No Preference", yes: "Matters" },
      checkboxValue: "walkAndTransability",
      onChange: (event: any) => handleChange("walkAndTransability", event),
    },
    {
      componentType: "radio",
      groupLabel: "Good for Outdoor Recreation?",
      groupValue: currentConfig.outdoorScore,
      values: { na: "", yes: 100 },
      labels: { na: "No Preference", yes: "Matters" },
      checkboxValue: "outdoorScore",
      onChange: (event: any) => handleChange("outdoorScore", event),
    },
    {
      componentType: "slider",
      inputLabel: "Population",
      step: (populationRange[1] - populationRange[0]) / numTics,
      min: populationRange[0],
      max: populationRange[1],
      valueLabelDisplay: "auto",
      value: currentConfig.population,
      onChange: (event: any) => handleSliderChange("population", event),
      marks: generateMarks(populationRange, numTics),
      checkboxValue: "population",
      label: "Population"
    },
    {
      componentType: "slider",
      inputLabel: "Population Density",
      step: (densityRange[1] - densityRange[0]) / numTics,
      min: densityRange[0],
      max: densityRange[1],
      value: currentConfig.populationDensity,
      onChange: (event: any) => handleSliderChange("populationDensity", event),
      marks: generateMarks(densityRange, numTics),
      checkboxValue: "populationDensity",
      label: "Population Density"
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
    },
    {
      componentType: "select",
      inputLabel: "Climate",
      value: currentConfig.climate,
      onChange: (event: any) => handleChange("climate", event),
      label: "Climate",
      checkboxValue: "climate",
      menuProps: {
        PaperProps: {
          style: {
            maxHeight: 200,
          },
        },
      },
      menuItems: [
        { title: "No Preference", value: "" },
        { title: "Rainforest", value: "rainforest" },
        { title: "Monsoon", value: "monsoon" },
        { title: "Savanna", value: "savanna" },
        { title: "Hot Desert", value: "hot-desert" },
        { title: "Cold Desert", value: "cold-desert" },
        { title: "Hot Semi-arid", value: "hot-semi-arid" },
        { title: "Cold semi-arid", value: "cold-semi-arid" },
        {
          title: "Hot-summer Mediterranean",
          value: "hot-summer-mediterranean",
        },
        {
          title: "Warm-summer Mediterranean",
          value: "warm-summer-mediterranean",
        },
        {
          title: "Cold-summer Mediterranean",
          value: "cold-summer-mediterranean",
        },
        { title: "Humid Subtropical", value: "humid-subtropical" },
        { title: "Subtropical Highland", value: "subtropical-highland" },
        { title: "Oceanic", value: "oceanic" },
        { title: "Subpolar Oceanic", value: "subpolar-oceanic" },
        {
          title: "Hot-summer Mediterranean Continental",
          value: "hot-summer-mediterranean-continental",
        },
        {
          title: "Warm-summer Mediterranean Continental",
          value: "warm-summer-mediterranean-continental",
        },
        { title: "Dry-summer Subarctic", value: "dry-summer-subarctic" },
        {
          title: "Hot-summer Humid Continental",
          value: "hot-summer-humid-continental",
        },
        {
          title: "Warm-summer Humid Continental",
          value: "warm-summer-humid-continental",
        },
        { title: "Dry-winter Subarctic", value: "dry-winter-subarctic" },
        {
          title: "Hot-summer Humid Continental",
          value: "hot-summer-humid-continental",
        },
        {
          title: "Warm-summer Humid Continental",
          value: "warm-summer-humid-continental",
        },
        { title: "Subarctic", value: "subarctic" },
        { title: "Tundra", value: "tundra" },
        { title: "Ice-cap", value: "ice-cap" },
      ],
    },
    {
      componentType: "slider",
      inputLabel: "Average Population Age",
      value: currentConfig.avgPopulationAge,
      step: (ageRange[1] - ageRange[0]) / numTics,
      min: ageRange[0],
      max: ageRange[1],
      marks: generateMarks(ageRange, numTics),
      onChange: (event: any) => handleSliderChange("avgPopulationAge", event),
      checkboxValue: "avgPopulationAge",
      label: "Average Population Age"
    },
  ];

  return (
    <>
      <div className="preferences-form-container">
        {allOccupations && (
          <Card className="preferences-form-card">
            <CardHeader title="What are you looking for in a city?" />
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
                            MenuProps={input?.menuProps}
                            sx={{ width: "100%" }}
                        >
                          {input.menuItems?.map((menuItem, index) => {
                            return (
                                <MenuItem value={menuItem.value} key={index}>
                                  {menuItem.title}
                                </MenuItem>
                            );
                          })}
                        </Select>
                        <Box style={{ transform: "translate(0px, 10px)"}}>
                          <PriorityCheckbox value={input.checkboxValue} />
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
                        />
                        <Box style={{ transform: "translate(0px, 10px)"}}>
                          <PriorityCheckbox value={input.checkboxValue} />
                        </Box>
                      </div>
                    )}
                    {input?.componentType === "radio" && (
                      <>
                        <FormLabel sx={{ width: "fit-content", pointerEvents: "none", marginTop: -1, marginBottom: -1 }}>
                          {input?.groupLabel}
                          <PriorityCheckbox value={input.checkboxValue} />
                        </FormLabel>
                        <RadioGroup
                          key={index}
                          row
                          name={input?.groupValue + "group"}
                          onChange={input?.onChange}
                          value={input?.groupValue}
                          defaultValue={input?.values?.na}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            label={input?.labels?.yes}
                            value={input?.values?.yes}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label={input?.labels?.na}
                            value={input?.values?.na}
                          />
                        </RadioGroup>
                      </>
                    )}
                    {input?.componentType === "slider" && (
                        <>
                          <FormLabel sx={{ width: "fit-content", pointerEvents: "none", marginTop: -1, marginBottom: -1 }}>
                            {input?.label}
                            <PriorityCheckbox value={input?.checkboxValue} />
                          </FormLabel>
                          <Slider
                              key={index}
                              value={input?.value as number[]}
                              onChange={input?.onChange}
                              step={input?.step}
                              min={input?.min}
                              max={ input?.max }
                              marks={input?.marks}/>
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
                    Please only select up to 3 attributes!
                  </FormHelperText>
              )}
              <br />
              <div className="preferences-form-sibling-set">
                <Button color="error" variant="outlined" onClick={clearForm}>
                  Clear
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={submitForm}
                  disabled={isOverPriorityAttributesLimit() || isConfigEmpty()}
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
  value: string
}

export default ConfigurationForm;
