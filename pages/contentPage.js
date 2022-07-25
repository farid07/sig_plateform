import {Radio, RadioGroup, Stack} from "@chakra-ui/react"
import React, {useState} from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import DashboardShell2 from "@/layouts/DashboardShell2";

const mapStyles = {
    width: '82%',
    height: '90%',
    margin: '1% 0 0 18%',
};

function contentPage(props) {

    const [Value, setValue] = useState("1")

    return (
        <DashboardShell2>
            <div>
                <div id="radioGroup">
                    <RadioGroup defaultValue="2">
                        <Stack spacing={5} direction="row">
                            <Radio colorScheme="green" value="2">
                                Toutes les infrastructures
                            </Radio>
                            <Radio colorScheme="yellow" value="1">
                                Infrastructures optiques
                            </Radio>
                            <Radio colorScheme="red" value="2">
                                Infrastructures non optiques
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </div>

                <Map
                    google={props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: -1.2884,
                            lng: 36.8233
                        }
                    }
                />
            </div>
        </DashboardShell2>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAR5fVv2qLR0gZrJhm0h7rd55FNfKAApL0'
})(contentPage);



