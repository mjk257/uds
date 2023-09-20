import React from "react";
import CityPreferencesForm from "./CityPreferencesForm";
import {CityPreferencesConfiguration} from "../types/utility-types";

const ConfigurationForm = ({ ...props }) => {
    return  (
        <>
            This is a new configuration form
        </>
    )
}

type Props = {
    config: CityPreferencesConfiguration
};

export default ConfigurationForm;