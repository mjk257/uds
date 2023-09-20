import React from "react";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import ConfigurationList from "./ConfigurationList";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


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