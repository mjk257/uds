import {CityPreferencesConfiguration, defaultCityPreferencesConfiguration, Ranges} from "../../types/utility-types";
import {useEffect} from "react";
import {searchForCities} from "../../util/api-calls";
import Cookies from 'js-cookie';


const useConfigForm = ({ currentConfig, setCurrentConfig, allRanges, setReturnedCities, setIsLoading } : Props) => {
    const populationRange = [allRanges.min_population, allRanges.max_population, allRanges.avg_population];
    const ageRange =[allRanges.min_age, allRanges.max_age, allRanges.avg_age];
    const densityRange = [allRanges.min_density, allRanges.max_density, allRanges.avg_density];
    const annualSnowfallRange = [allRanges.min_density, allRanges.max_density, allRanges.avg_density];
    const annualRainfallRange = [allRanges.min_rain, allRanges.max_rain, allRanges.avg_rain];
    const avgWinterTempRange = [allRanges.min_winter_temp, allRanges.max_winter_temp, allRanges.avg_winter_temp];
    const avgSummerTempRange = [allRanges.min_summer_temp, allRanges.max_summer_temp, allRanges.avg_summer_temp];

    const isOverPriorityAttributesLimit = () =>
        currentConfig?.priorityAttributes.length > 3;

    const isConfigEmpty = () => {
        const allSlidersInDefaultRange = isDefaultRange("population")
            && isDefaultRange("avgPopulationAge")
            && isDefaultRange("avgWinterTemp")
            && isDefaultRange("avgSummerTemp");
        const occupationNull = currentConfig.preferredOccupation === null;
        let allOtherValuesEmpty = true;
        for (const [key, value] of Object.entries(currentConfig)) {
            if ((typeof(value) === "string" || typeof(value) === "number") && (value !== "" && value !== null)) {
                allOtherValuesEmpty = false;
            }
        }
        if(currentConfig.annualRainfall.length || currentConfig.annualSnowfall.length){
            allOtherValuesEmpty = false
        }
        // Priority attributes can be empty, so submission should be enabled so long as at least 1 attribute is filled
        return allSlidersInDefaultRange && allOtherValuesEmpty && occupationNull;
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

    const numFormatter = (num: number) => {
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
        // console.log(range.sort(function(a, b){return a - b}))
        return range.sort(function(a, b){return a - b});
    }

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

    const clearForm = () => {
        setCurrentConfig(defaultCityPreferencesConfiguration); 
        //comment line below if you want cookie to be reset when form is cleared
        Cookies.set('userInput', JSON.stringify(defaultCityPreferencesConfiguration))
    };

    // Slider data
    const sliders = {
        populationSlider: generateRange(populationRange),
        summerSlider: generateRange(avgSummerTempRange),
        winterSlider: generateRange(avgWinterTempRange),
        ageSlider: generateRange(ageRange)
    }

    const submitForm = () => {
        // Create a copy of the current config, making sure to display the original on screen
        // This copy will contain the min and max values of the slider values, the same values for other fields
        const currentConfigCopy = {
            ...currentConfig,
            population: {min: sliders.populationSlider[(currentConfig.population[0] as number)], max: sliders.populationSlider[(currentConfig.population[1] as number)]},
            populationAge: {min: sliders.ageSlider[(currentConfig.avgPopulationAge[0] as number)], max: sliders.ageSlider[(currentConfig.avgPopulationAge[1] as number)]},
            winterTemp: {min: sliders.winterSlider[(currentConfig.avgWinterTemp[0] as number)], max: sliders.winterSlider[(currentConfig.avgWinterTemp[1] as number)]},
            summerTemp: {min: sliders.summerSlider[(currentConfig.avgSummerTemp[0] as number)], max: sliders.summerSlider[(currentConfig.avgSummerTemp[1] as number)]}
        }
        
        // Save configuration to cookie on submit
        Cookies.set('userInput', JSON.stringify(currentConfig), { expires: 15 })
        console.log(currentConfigCopy);

        // send the data to the search function and await its response
        searchForCities(currentConfigCopy, setIsLoading).then((resp) => {
            setReturnedCities(resp);
            setIsLoading(false);
        });
    };

    return {
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
        numFormatter,
        generateRange,
        generateMarks,
        sliders,
        densityRange,
        annualSnowfallRange,
        annualRainfallRange
    }
}

type Props = {
    currentConfig: CityPreferencesConfiguration,
    setCurrentConfig: Function,
    allRanges: Ranges,
    setReturnedCities: Function,
    setIsLoading: Function
}

export default useConfigForm;