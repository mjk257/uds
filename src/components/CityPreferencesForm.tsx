import React from "react";
import {
    Box,
    Card,
    CardContent, FormControl, FormHelperText, FormLabel, Slider
} from "@mui/material";
import ConfigurationList from "./ConfigurationList";
import Grid from "@mui/material/Unstable_Grid2";

export const CityPreferencesForm = () => {
    return (
        <div>
            <Card className='preferences-form'>
                <CardContent>
                    <ConfigurationList />
                </CardContent>
            </Card>
        </div>
    )
}

export default CityPreferencesForm;