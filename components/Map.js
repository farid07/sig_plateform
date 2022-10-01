import {Component} from 'react';
import {Box, FormControl, FormErrorMessage, FormLabel, Input, position} from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {useAuth} from "@/lib/auth";

// const CircleIcon = (props) => (
//     <Icon height={24} viewBox='0 0 200 200' style={{fill: '#d00', stroke: 'none'}} {...props}>
//         <path
//             fill='#d00'
//             d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
//         />
//     </Icon>
// );


const Map = (props) => {
    const {authUser} = useAuth();
    // console.log(authUser);
    // props.authUser = authUser
    return <MapClass {...props} authUser={authUser} showAll={props.showAll}/>
}

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapStyle: "mapbox://styles/carl97/cky5rnaek6k3j15pcyi6phi2f",
            lat: 6.409846,
            lng: 2.328328,
            zoom: 14,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
            data: {},
        }
        //   console.log("aaaa", props.authUser);

    }

    async componentDidMount() {
        //recuperation de la liste des equipements
        const data = await fetch("/api/equipments", {
            method: 'GET',
            headers: new Headers({"Content-Type": 'application/json'}),
            credentials: 'same-origin'
        });

        const d = await data.json()
        //  console.log(d.equipments);


        if (this.props.showAll === true) {
            this.state.data = d.equipments;
        } else {
            this.state.data = d.equipments.filter(e => e.userId === this.props.authUser.uid);
        }


        // console.log(this.props.showAll);
        //  console.log('xxxxx', this.state.data);

        // this.state.data = d.equipments.filter(e => e.userId == '556TzAC9XUdmUGTNdESr9ZYgJwD2');
        // this.state.data = d.equipments.filter(e => e.userId == this.props.authUser.uid);

        const map = new mapboxgl
            .Map({
                accessToken: this.state.accessToken,
                container: this.mapContainer,
                style: this.state.mapStyle,
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom,
            })

        //************ FAIRE APPARAITRE LES MARQUEURS ET LES POPUPS***********************************

        this.state.data?.map((equipment) => {
            const marker = new mapboxgl.Marker({color: equipment?.color, draggable: false}); //Add marker
            //Afficher le popup au survol
            const markerDiv = marker.getElement();
            markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
            markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
            // Fin d'affichage

            marker.setLngLat([equipment?.longitude, equipment?.latitude]); //coordinate of marker
            const minPopup = new mapboxgl.Popup({closeButton: true, closeOnClick: false}); //

            minPopup.setHTML(
                '<div>' +
                '<div> ' +
                '<div> <strong> Nom : </strong> ' + equipment?.name + '<div> ' +
                '<div> <strong> Type : </strong> ' + equipment?.type + '<div> ' +
                '<div> <strong> Longitude : </strong> ' + equipment?.longitude + '<div> ' +
                '<div> <strong> Latitude : </strong> ' + equipment?.latitude + '<div> ' +
                // '<div> <strong> Marque : </strong> ' + equipment?.mark + '<div> ' +
                // '<div> <strong> Ports : </strong> ' + equipment?.ports + '<div> ' +
                '</div>' +
                '</div>');

            marker.setPopup(minPopup)
                .addTo(map);
        })






        /* ++++++++++++ Ajout d'une barre de recherche pour un lieu grâce a ses coordonnées ++++++++++++++ */

        const coordinatesGeocoder = function (query) {
            // Faire correspondre tout ce qui ressemble à une paire de coordonnées en degrés décimaux.

            const matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
            if (!matches) {
                return null;
            }

            function coordinateFeature(lng, lat) {
                return {
                    center: [lng, lat],
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                    place_type: ['coordinate'],
                    properties: {},
                    type: 'Feature'
                };
            }

            const coord1 = Number(matches[1]);
            const coord2 = Number(matches[2]);
            const geocodes = [];

            if (coord1 < -90 || coord1 > 90) {
                // must be lng, lat
                geocodes.push(coordinateFeature(coord1, coord2));
            }

            if (coord2 < -90 || coord2 > 90) {
                // must be lat, lng
                geocodes.push(coordinateFeature(coord2, coord1));
            }

            if (geocodes.length === 0) {
                // else could be either lng, lat or lat, lng
                geocodes.push(coordinateFeature(coord1, coord2));
                geocodes.push(coordinateFeature(coord2, coord1));
            }

            return geocodes;
        };

// Add the control to the map.
        map.addControl(
            new MapboxGeocoder({
                accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
                localGeocoder: coordinatesGeocoder,
                zoom: 16,
                placeholder: 'latitude, longitude',
                mapboxgl: mapboxgl,
                reverseGeocode: true,
            })
        );
        /* +++++++++ Fin d'ajout +++++++++++ */

        /* ++++++++++++++++++++++++ DESSINER UN ITINERAIRE ++++++++++++++++++++++++ */
        const draw = new MapboxDraw({
            // Instead of showing all the draw tools, show only the line string and delete tools.
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            // Set the draw mode to draw LineStrings by default.
            defaultMode: 'draw_line_string',
            styles: [
                // Set the line style for the user-input coordinates.
                {
                    id: 'gl-draw-line',
                    type: 'line',
                    filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    paint: {
                        'line-color': '#11eac2',
                        'line-dasharray': [0.2, 2],
                        'line-width': 6,
                        'line-opacity': 0.7
                    }
                },
                // Style the vertex point halos.
                {
                    id: 'gl-draw-polygon-and-line-vertex-halo-active',
                    type: 'circle',
                    filter: [
                        'all',
                        ['==', 'meta', 'vertex'],
                        ['==', '$type', 'Point'],
                        ['!=', 'mode', 'static']
                    ],
                    paint: {
                        'circle-radius': 12,
                        'circle-color': '#FFF'
                    }
                },
                // Style the vertex points.
                {
                    id: 'gl-draw-polygon-and-line-vertex-active',
                    type: 'circle',
                    filter: [
                        'all',
                        ['==', 'meta', 'vertex'],
                        ['==', '$type', 'Point'],
                        ['!=', 'mode', 'static']
                    ],
                    paint: {
                        'circle-radius': 8,
                        'circle-color': '#438EE4'
                    }
                }
            ]
        });
        // Add the draw tool to the map.
        map.addControl(draw);

        /* +++++++++++ FIN DE DESSIN D'UN ITINERAIRE +++++++++++++++ */

        // Add create, update, or delete actions
        map.on('draw.create', updateRoute);
        map.on('draw.update', updateRoute);
        map.on('draw.delete', removeRoute);

        /* +++ Ajout des fonctions pour creer, modifier et supprimer une route +++ */
        function updateRoute() {
            removeRoute(); // Overwrite any existing layers
            const profile = 'driving'; // Set the profile
            // Get the coordinates
            const data = draw.getAll();
            const lastFeature = data.features.length - 1;
            const coords = data.features[lastFeature].geometry.coordinates;
            // Format the coordinates
            const newCoords = coords.join(';');
            // Set the radius for each coordinate pair to 25 meters
            const radius = coords.map(() => 25);
            getMatch(newCoords, radius, profile);
        }

        async function getMatch(coordinates, radius, profile) {
            // Separate the radiuses with semicolons
            const radiuses = radius.join(';');
            // Create the query
            const query = await fetch(
                `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`,
                {method: 'GET'}
            );
            const response = await query.json();
            // Handle errors
            if (response.code !== 'Ok') {
                alert(
                    `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
                );
                return;
            }
            // Get the coordinates from the response
            const coords = response.matchings[0].geometry;
            //   console.log(coords);

            // Draw the route on the map
            addRoute(coords);
            getInstructions(response.matchings[0]);
        }

        // Fonction permettant d'afficher les instructions detaillées à propos de l'itineraire à suivre
        function getInstructions(data) {
            // Target the sidebar to add the instructions
            const directions = document.getElementById('directions');
            //let tripDirections = '';
            // Output the instructions for each step of each leg in the response object
            // for (const leg of data.legs) {
            //     const steps = leg.steps;
            //     for (const step of steps) {
            //      tripDirections += `<li>${step.maneuver.instruction}</li>`;
            //     }
            // }
            directions.innerHTML = `<p><strong> Distance de cable: ${data.distance} mètres </strong></p>`;
            //Durée du trajet : ${Math.floor(data.duration / 60)} min

        }

        // Dessinez l'itinéraire Map Matching en tant que nouvelle couche sur la carte
        function addRoute(coords) {
            // If a route is already loaded, remove it
            if (map.getSource('route')) {
                map.removeLayer('route');
                map.removeSource('route');
            } else {
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': coords
                        }
                    },
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#03AA46',
                        'line-width': 8,
                        'line-opacity': 0.8
                    }
                });
            }
        }

        // If the user clicks the delete draw button, remove the layer if it exists
        function removeRoute() {
            if (!map.getSource('route')) return;
            map.removeLayer('route');
            map.removeSource('route');
        }

        /* ++++ Fin ajout des fonctions ++++ */


        /* +++ CONTROL DE LA NAVIGUATION +++ */

        // Ajout des commandes de zoom et de rotation à la carte
        map.addControl(new mapboxgl.NavigationControl({visualizePitch: true}), 'top-right');

        // Ajout du bouton pour afficher ma position sur la carte
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true
        }));

        // Ajout du bouton pour mettre la carte en plein ecran
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');


        /* ++++ FIN DE CONTROL DE LA NAVIGUATION ++++ */

    }


    render() {
        return (
            <>
                <Box ref={element => this.mapContainer = element} style={{
                    height: "553px", marginLeft: "-120px",
                    marginRight: "-53px", marginTop: "-5px"
                }}>
                </Box>
                <Box class="info-box" style={{
                    position: "absolute",
                    margin: "20px",
                    width: "16%",
                    height: "200px",
                    top: "1",
                    left: "210px",
                    bottom: "330px",
                    padding: "20px",
                    backgroundColor: "#fff",
                    overflowY: "scroll"
                }}
                >
                    <p>
                        Dessiner un itinéraire !
                    </p>
                    <div id="directions"></div>
                </Box>
            </>
        );
    }
}

export default Map;