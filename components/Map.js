import MapGL from 'react-map-gl';
import {useContext, useEffect, useRef, useState} from "react";
import {MapDataContext} from "@/components/MapDataContext";
import mapboxgl from "mapbox-gl";
import {Box} from "@chakra-ui/react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {useAuth} from "@/lib/auth";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;


const Map = (props) => {
    const {authUser} = useAuth();
    const mapContainer = useRef(null)
    const map = useRef(null);
    const [lng, setLng] = useState(2.328328);
    const [lat, setLat] = useState(6.409846);
    const [zoom, setZoom] = useState(14);
    // const [viewport, setViewPort] = useState({
    //     width: "100%",
    //     height: "100%",
    //     latitude: 38.889726473242526,
    //     longitude: -77.00320124234425,
    //     zoom: 12.721197192553936
    // });

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

    //ffffffff

    function updateRoute() {
        removeRoute(); // Overwrite any existing layers
        const profile = 'driving'; // Set the profile
        // Get the coordinates
        const data = draw?.getAll();
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

    // Dessinez l'itinéraire MapBack Matching en tant que nouvelle couche sur la carte
    function addRoute(coords) {
        // If a route is already loaded, remove it
        if (map.current.getSource('route')) {
            map.current.removeLayer('route');
            map.current.removeSource('route');
        } else {
            map.current.addLayer({
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
        if (!map.current.getSource('route')) return;
        map.current.removeLayer('route');
        map.current.removeSource('route');
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/carl97/cky5rnaek6k3j15pcyi6phi2f",
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(
            new MapboxGeocoder({
                accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
                localGeocoder: coordinatesGeocoder,
                zoom: 16,
                placeholder: 'latitude, longitude',
                mapboxgl: mapboxgl,
                reverseGeocode: true,
            })
        );
        // Ajout des boutons de dessin sur la carte
        map.current.addControl(draw);
        map.current.on('draw.create', updateRoute);
        map.current.on('draw.update', updateRoute);
        map.current.on('draw.delete', removeRoute);

        // Ajout du bouton pour afficher ma position sur la carte
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true
        }));

        // Ajout des commandes de zoom et de rotation à la carte
        map.current.addControl(new mapboxgl.NavigationControl({visualizePitch: true}), 'top-right');

        // Ajout du bouton pour mettre la carte en plein ecran
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');


        props?.data?.map((equipment) => {

            // ==> CUSTOM IMAGE MARKER
            const markerDiv = document.createElement('div');
            markerDiv.className = 'my-custom-marker';
            markerDiv.style.backgroundSize = 'cover';
            markerDiv.style.width = '20px';
            markerDiv.style.height = '25px';
            markerDiv.style.backgroundImage = `url("${equipment?.logo}")`;
            // markerDiv.style.borderRadius = '3px';
            // markerDiv.style.borderColor = equipment?.color;
            // markerDiv.style.borderWidth = '3px';
            // markerDiv.style.padding = '10px';
            //  markerDiv.style.backgroundImage = `url("")`; // https://picsum.photos/20/30?random=${equipment.id}
            const marker = new mapboxgl.Marker(markerDiv, {draggable: false}); //Add marker

            // ==> DEFAULT MARKER
            // const marker = new mapboxgl.Marker({color: equipment?.color, draggable: false}); //Add marker

            // //Afficher le popup au survol
            //  const markerDiv = marker.getElement();
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
                .addTo(map.current);
        })
    }, [props?.data]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        props?.data?.map((equipment) => {

            // ==> CUSTOM IMAGE MARKER
            const markerDiv = document.createElement('div');
            markerDiv.style.backgroundSize = 'cover';
            markerDiv.className = 'my-custom-marker';
            markerDiv.style.width = '50px';
            markerDiv.style.height = '69px';
            markerDiv.style.backgroundImage = `url("${equipment?.logo}")`;
            // markerDiv.style.borderRadius = '3px';
            // markerDiv.style.borderColor = equipment?.color;
            // markerDiv.style.borderWidth = '3px';
            // markerDiv.style.padding = '6px';
            // // markerDiv.style.backgroundImage = `url("")`; // https://picsum.photos/20/30?random=${equipment.id}
            const marker = new mapboxgl.Marker(markerDiv, {draggable: false}); //Add marker
            // color: equipment?.color,

            // ==> DEFAULT MARKER
            // const marker = new mapboxgl.Marker({color: equipment?.color, draggable: false}); //Add marker

            // //Afficher le popup au survol
            //  const markerDiv = marker.getElement();
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
                .addTo(map.current);
        })

    }, [props?.data]);

    const _onViewportChange = viewport =>
        setViewPort({...viewport, transitionDuration: 20});

    return (
        <>
            <Box ref={mapContainer} style={{
                height: "553px", marginLeft: "-120px", position: "relative",
                marginRight: "-53px", marginTop: "-5px"
            }}>
                <Box className="info-box" style={{
                    position: "absolute",
                    margin: "20px",
                    width: "16%",
                    height: "200px",
                    top: "10px",
                    left: "10px",
                    zIndex: 10,
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
            </Box>
        </>
    );
};

export default Map;