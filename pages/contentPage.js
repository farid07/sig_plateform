import {Radio, RadioGroup, Stack} from "@chakra-ui/react"
import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '80%',

};

function contentPage(props){
    return(
        <div>
            <div>
                <RadioGroup defaultValue="2">
                    <Stack spacing={5} direction="row">
                        <Radio colorScheme="red" value="1">
                            Infrastructures optiques
                        </Radio>
                        <Radio colorScheme="green" value="2">
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
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAR5fVv2qLR0gZrJhm0h7rd55FNfKAApL0'
})(contentPage);

