import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Navigation } from 'lucide-react';

const PLACE_TYPES = [
    { key: 'school',       label: 'Shkolla',      color: '#2563eb' },
    { key: 'hospital',     label: 'Spitale',      color: '#dc2626' },
    { key: 'police',       label: 'Polici',        color: '#0ea5e9' },
    { key: 'fire_station', label: 'Zjarrfikës',    color: '#f59e42' },
    { key: 'supermarket',  label: 'Supermarkete', color: '#22c55e' },
    { key: 'bakery',       label: 'Furrë buke',   color: '#eab308' },
    { key: 'pharmacy',     label: 'Farmaci',       color: '#a21caf' },
];

function DirectionsLayer({ userLocation, propertyLocation }) {
    const [route, setRoute] = useState(null);
    const map = useMap();

    useEffect(() => {
        if (!userLocation || !propertyLocation) return;
        const url = `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${propertyLocation[1]},${propertyLocation[0]}?overview=full&geometries=geojson`;
        axios.get(url)
            .then(res => {
                if (res.data.routes?.length > 0) {
                    const coords = res.data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                    setRoute(coords);
                    map.fitBounds(L.latLngBounds([userLocation, propertyLocation]), { padding: [50, 50] });
                }
            })
            .catch(() => {});
    }, [userLocation, propertyLocation, map]);

    if (!route) return null;
    return (
        <>
            <Polyline positions={route} color="#2563eb" weight={4} opacity={0.7} />
            <Marker position={userLocation}>
                <Popup>Vendndodhja juaj</Popup>
            </Marker>
        </>
    );
}

function NearbyPlaces({ lat, lng, selectedType }) {
    const [allPlaces, setAllPlaces] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!lat || !lng) return;
        setLoading(true);
        axios.get('/nearby-places', { params: { lat, lng, radius: 2000 } })
            .then(res => {
                const grouped = {};
                for (const place of res.data) {
                    if (!grouped[place.type]) grouped[place.type] = [];
                    grouped[place.type].push(place);
                }
                setAllPlaces(grouped);
                setLoading(false);
            })
            .catch(() => {
                setAllPlaces({});
                setLoading(false);
            });
    }, [lat, lng]);

    if (!selectedType) return null;
    const typeObj = PLACE_TYPES.find(t => t.key === selectedType);
    const places = allPlaces[selectedType] || [];

    return (
        <>
            {loading && <div>Duke ngarkuar...</div>}
            {!loading && places.map(place => (
                <CircleMarker
                    key={place.id}
                    center={[place.latitude, place.longitude]}
                    radius={12}
                    pathOptions={{ color: typeObj.color, fillColor: typeObj.color, fillOpacity: 0.7 }}
                >
                    <Popup>{place.name || 'Pa emër'}<br />{typeObj.label}</Popup>
                </CircleMarker>
            ))}
        </>
    );
}

const PropertyMapSection = ({ lat, lng }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const propertyLocation = [lat, lng];

    const handleGetDirections = () => {
        const destination = `${lat},${lng}`;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = `maps://maps.apple.com/?daddr=${destination}`;
                setTimeout(() => {
                    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
                }, 500);
            } else {
                window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
            }
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
        }
    };

    return (
        <>
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleGetDirections}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition bg-gray-700 text-white hover:bg-gray-800"
                >
                    <Navigation size={18} />
                    Shfaq rrugën
                </button>
            </div>
            <div className="mb-2 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-0">
                    {PLACE_TYPES.map(type => (
                        <button
                            key={type.key}
                            type="button"
                            onClick={() => setSelectedType(type.key)}
                            className={`px-4 py-2 -mb-px font-medium transition border-b-2 ${
                                selectedType === type.key
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-blue-600'
                            }`}
                            style={{ minWidth: 110 }}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow">
                <MapContainer
                    center={[lat, lng]}
                    zoom={16}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <Marker position={[lat, lng]}>
                        <Popup>Prona</Popup>
                    </Marker>
                    <NearbyPlaces lat={lat} lng={lng} selectedType={selectedType} />
                    {userLocation && (
                        <DirectionsLayer
                            userLocation={userLocation}
                            propertyLocation={propertyLocation}
                        />
                    )}
                </MapContainer>
            </div>
        </>
    );
};

export default PropertyMapSection;