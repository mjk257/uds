import { Checkbox, FormControlLabel } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import React from "react";
import {CityPreferencesConfiguration} from "../types/utility-types";

const PriorityCheckbox = ({ currentConfig, value, bottomMargin, isDefaultRange, isLoading, handleChange } : CheckboxProps) => {
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
                        //@ts-ignore
                        (Array.isArray(currentConfig[value]) && currentConfig[value].length === 0) ||
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

type CheckboxProps = {
    value: string,
    bottomMargin: number,
    currentConfig: CityPreferencesConfiguration,
    isDefaultRange: Function,
    isLoading: boolean,
    handleChange: Function
};

export default PriorityCheckbox;