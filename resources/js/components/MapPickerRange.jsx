import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';

export default function MapPickerRange({ lat, lng, onSelect, zoneRadius }) {

    const MapClickHandler = () => {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                        {
                            headers: {
                                "User-Agent": "property-market/1.0 (contact@property-market.al)",
                                "Accept": "application/json",
                            },
                        }
                    );

                    const data = await res.json();
                    const address = data?.address || {};

                    const road =
                        address.road ||
                        address.pedestrian ||
                        address.footway ||
                        address.residential ||
                        address.neighbourhood ||
                        address.suburb ||
                        address.city_district ||
                        address.village ||
                        "";

                    onSelect({ lat, lng, road });
                } catch (err) {
                    console.error("Reverse geocoding failed", err);
                    onSelect({ lat, lng, road: "" });
                }
            },
        });

        return null;
    };

    return (
        <MapContainer center={[lat || 41.3275, lng || 19.8189]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {lat && lng && (
                <>
                    {/*<Marker position={[lat, lng]} />*/}
                    <Circle center={[lat, lng]} radius={zoneRadius} pathOptions={{ color: 'blue', fillOpacity: 0.2 }} />
                </>
            )}
            <MapClickHandler />
        </MapContainer>
    );
}
