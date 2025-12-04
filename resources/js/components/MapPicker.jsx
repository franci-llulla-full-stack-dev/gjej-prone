import React, { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapPicker({ lat, lng, onSelect }) {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = L.map(mapRef.current).setView(
            [lat || 41.3275, lng || 19.8187],
            13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(map);

        let marker = null;

        async function setMarker(e) {
            const { lat, lng } = e.latlng;

            if (marker) map.removeLayer(marker);
            marker = L.marker([lat, lng]).addTo(map);

            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await res.json();

            const road =
                data?.address?.road ||
                data?.address?.neighbourhood ||
                data?.address?.suburb ||
                "";

            onSelect({ lat, lng, road });
        }

        map.on("click", setMarker);

        return () => map.remove();
    }, []);

    return (
        <div
            ref={mapRef}
            style={{ height: "350px", width: "100%", borderRadius: "10px" }}
        />
    );
}
