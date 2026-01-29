import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function PropertyMap({ lat, lng, radius }) {
    const center = [lat, lng];

    return (
        <MapContainer
            center={center}
            zoom={radius ? 13 : 15}
            className="h-[320px] w-full rounded-2xl"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/*<Marker position={center} />*/}

            {radius && (
                <Circle
                    center={center}
                    radius={radius} // meters
                    pathOptions={{
                        color: "#2563eb",
                        fillColor: "#3b82f6",
                        fillOpacity: 0.15,
                    }}
                />
            )}
        </MapContainer>
    );
}
