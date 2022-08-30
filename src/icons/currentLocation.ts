import L from 'leaflet';

const locationIcon = new L.Icon({
    iconUrl: require('./blue-circle.png'),
    iconRetinaUrl: require('./blue-circle.png'),
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});

export { locationIcon };