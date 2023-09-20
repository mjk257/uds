import React, { useState } from "react";
import {Button, ButtonGroup, Fab, ToggleButton, ToggleButtonGroup} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import ConfigurationForm from "./ConfigurationForm";
import CityPreferencesForm from "./CityPreferencesForm";
import {defaultCityPreferencesConfiguration} from "../types/utility-types";

const ConfigurationList = () => {

    const MAX_CONFIG_BUTTONS = 10;
    const [config, setConfig] = useState({})
    const [currentConfig, setCurrentConfig] = useState('config-1');

    // const [numButtons, setNumButtons] = useState<number>(1);
    // const [buttonsList, setButtonsList] = useState<any>([]);
    // const [config, setConfig] = useState({})
    //
    // // Essentially all this is a list of configuration buttons, which will each have
    // // their own associated preferences form
    //
    // const addConfigButton = (key: any) => {
    //     console.log("Entered");
    //     buttonsList.push(numButtons + 1);
    //     setButtonsList(buttonsList);
    //     setNumButtons(numButtons + 1);
    //     console.log(buttonsList);
    //     key = `config-${key}`;
    //     if (!(key in config)) {
    //         setConfig({ ...config, [key] : defaultCityPreferencesConfiguration });
    //         console.log(config);
    //     }
    // }
    //
    // const removeConfigButton = () => {
    //     buttonsList.pop();
    //     setNumButtons(numButtons - 1);
    //     setButtonsList(buttonsList);
    //     const keyToRemove = `config-${buttonsList.length - 1}`;
    //     // @ts-ignore
    //     delete config[keyToRemove];
    // }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        currentConfig: string,
    ) => {
        setCurrentConfig(currentConfig);
    };

    return (
        <div>
            <h2>Configurations</h2>
            <div className='config-container'>
                <ToggleButtonGroup color="primary" value={ currentConfig } exclusive
                                   aria-label={'config-settings'} onChange={ handleChange}>
                    <ToggleButton value="config-1" onChange={ () => setCurrentConfig('config-1') }>
                        Configuration 1
                    </ToggleButton>
                    <ToggleButton value="config-2" onChange={ () => setCurrentConfig('config-2') }>
                        Configuration 2
                    </ToggleButton>
                    <ToggleButton value="config-3" onChange={ () => setCurrentConfig('config-3') }>
                        Configuration 3
                    </ToggleButton>
                    <ToggleButton value="config-4" onChange={ () => setCurrentConfig('config-4') }>
                        Configuration 4
                    </ToggleButton>
                    <ToggleButton value="config-5" onChange={ () => setCurrentConfig('config-5') }>
                        Configuration 5
                    </ToggleButton>
                </ToggleButtonGroup>
                {/*{buttonsList.map((component: any, idx: any) => {*/}
                {/*    console.log("Entered rendering section")*/}
                {/*    return (*/}
                {/*        <ButtonGroup>*/}
                {/*            <Button key={ idx } variant="contained">*/}
                {/*                Config { idx }*/}
                {/*            </Button>*/}
                {/*        </ButtonGroup>*/}
                {/*    );*/}
                {/*})}*/}
                {/*{buttonsList.length < MAX_CONFIG_BUTTONS &&*/}
                {/*    <Fab color="primary" aria-label="add" size="small" onClick={ () => addConfigButton(buttonsList.length) }>*/}
                {/*        <AddIcon />*/}
                {/*    </Fab>}*/}
                {/*{buttonsList.length > 0  &&*/}
                {/*    <Fab color='error' aria-label="remove" size="small" onClick={ () => removeConfigButton() }>*/}
                {/*        <RemoveIcon />*/}
                {/*    </Fab>}*/}
            </div>
            <ConfigurationForm config={ config } />
        </div>
    );
};

export default ConfigurationList;