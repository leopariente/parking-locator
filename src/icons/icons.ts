import L from 'leaflet';

export const locationIcon = new L.Icon({
  iconUrl: require('./blue-circle.png'),
  iconSize: [30, 30],
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [3, -36]// point from which the popup should open relative to the iconAnchor
});

export const myParkingIcon = new L.Icon({
  iconUrl: require('./my-parking.png'),
  iconSize: [25, 40], // size of the icon
  popupAnchor: [1, -20]// point from which the popup should open relative to the iconAnchor
});

export const listParkingIcon = new L.Icon({
  iconUrl: require('./list-parking.png'),
  iconSize: [55, 60], // size of the icon
  iconAnchor: [22, 55], // point of the icon which will correspond to marker's location
  popupAnchor: [2, -45]// point from which the popup should open relative to the iconAnchor
});
