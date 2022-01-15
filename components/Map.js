import {Component} from 'react';
import ReactMapGL, {GeolocateControl} from 'react-map-gl';

class Map extends Component {
    state = {
        viewport: {
            width: '1250px',
            height: '690px',
            latitude: 6.366667,
            longitude: 2.433333,
            zoom: 14
        },
        geoLocateControlStyle: {
            right: 10,
            top: 10
        },
        fullScreenControlStyle: {
            right: 10,
            top: 50
        }
    };

    render() {
        return (
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/streets-v10"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            >
                <GeolocateControl
                    style={this.state.geoLocateControlStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />
                {/*<FullscreenControl style={this.state.fullScreenControlStyle} />*/}
            </ReactMapGL>
        );
    }
}

export default Map;