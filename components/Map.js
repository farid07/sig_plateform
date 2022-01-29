import {Component} from 'react';
// import ReactMapGL, {
//     FlyToInterpolator,
//     FullscreenControl,
//     GeolocateControl, Marker,
//     NavigationControl,
//     Popup,
//     ScaleControl
// } from 'react-map-gl'
// import * as d3 from "d3-ease";
import {Box, Icon} from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";

const CircleIcon = (props) => (
    <Icon height={24} viewBox='0 0 200 200' style={{fill: '#d00', stroke: 'none'}} {...props}>
        <path
            fill='#d00'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
    </Icon>
)

// "mapbox://styles/carl97/cky5rnaek6k3j15pcyi6phi2f"
//mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
// viewport: {
//     width: "1050px",
//         height: "650px",
//         longitude: 2.485455,
//         latitude: 6.366667,
//         zoom: 12,
//         bearing: 0,
//         pitch: 0,
//         transitionDuration: 5000,
//         transitionInterpolator: new FlyToInterpolator(),
//         transitionEasing: d3.easeCubic
// },
//
// static async getServerSideProps(context) {
//     const res = await fetch(`/api/equipments`)
//     const data = await res.json()
//
//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }
//
//     return { data } // will be passed to the page component as props
// }

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapStyle: "mapbox://styles/carl97/cky5rnaek6k3j15pcyi6phi2f",
            lat: 6.366667,
            lng: 2.485455,
            zoom: 12,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
        }
    }

    componentDidMount() {
        // const data = fetch("")
        const map = new mapboxgl.Map({
            accessToken: this.state.accessToken,
            container: this.mapContainer,
            style: this.state.mapStyle,
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        let marker = new mapboxgl.Marker({color: "#f1072a", draggable: true})
            .setLngLat([this.state.lng, this.state.lat])
            .setPopup(new mapboxgl.Popup({offset: 30}).setHTML('<h4>' + 'Akpakpa' + '</h4>'))
            // .setHTML('<h4>'+'Akpakpa'+'</h4>')
            .addTo(map);
    }

    render() {
        return (
            <Box ref={element => this.mapContainer = element} style={{maxWidth: "1050px", height: "650px"}}></Box>
        );
    }
}

export default Map;