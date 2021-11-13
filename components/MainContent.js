import {Radio, RadioGroup, Stack} from "@chakra-ui/react"
import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    margin: '5px 5px 5px 5px' ,
};

const MainContent = () => {
    return (
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
                    google={this.props.google}
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
})(MainContent);