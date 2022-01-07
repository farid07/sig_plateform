
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 41.5868,
            longitude: -93.625,
            zoom: 13
        }
    };

    render() {
        return (
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoiZW1tYW51ZWxkYWR5MDA3IiwiYSI6ImNreGJ5eTBnZzJ6YWkydW8xNmN5YTc3OTEifQ.lS0GtZMN60Htzgixun_Thg"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            />
        );
    }
}

export default Map;