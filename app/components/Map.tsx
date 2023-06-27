'use client';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

type MapProps = { center?: L.LatLngExpression };

// @ts-expect-error it should exist in the module though it's not detected in the project
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
});

const Map = ({ center = [51, -0.09] }: MapProps) => (
	<MapContainer
		center={center}
		zoom={center ? 4 : 2}
		scrollWheelZoom={false}
		className='h-[35vh] rounded-lg'
	>
		<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
		<Marker position={center} />
	</MapContainer>
);

export default Map;
