import React from "react";
import {
    Card,
    CardContent,
    Container
} from "@mui/material";
import ConfigurationList from "./ConfigurationList";
import CityResponseCard from "./CityResponseCard";

export const CityPreferencesForm = () => {
    return (
        <div>
            <Container maxWidth='xl'>
                <Card className='preferences-form'>
                    <CardContent>
                        <ConfigurationList />
                    </CardContent>
                </Card>
            </Container>
            {/* Note that in the future this will be rendered dynamically, but right now is just showing for reference */}
            <Container maxWidth='xl'>
                <CityResponseCard />
            </Container>
        </div>
    )
}

export default CityPreferencesForm;