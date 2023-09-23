import React from "react";
import {
    Box,
    Card,
    CardContent, FormControl, FormHelperText, FormLabel, Slider
} from "@mui/material";
import ConfigurationList from "./ConfigurationList";
import Grid from "@mui/material/Unstable_Grid2";
import CityResponseCard from "./CityResponseCard";

export const CityPreferencesForm = () => {
    return (
        <div>
            <Card className='preferences-form'>
                <CardContent>
                    <ConfigurationList />
                </CardContent>
            </Card>
            {/* Note that in the future this will be rendered dynamically, but right now is just showing for reference */}
            <CityResponseCard />
        </div>
    )
}

export default CityPreferencesForm;