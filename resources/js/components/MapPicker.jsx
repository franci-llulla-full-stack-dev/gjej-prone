import React, { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapPicker({ lat, lng, onSelect }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);

    // 1️⃣ Init map ONCE
    useEffect(() => {
        mapInstance.current = L.map(mapRef.current).setView(
            [lat || 41.3275, lng || 19.8187],
            13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(mapInstance.current);

        mapInstance.current.on("click", async (e) => {
            const { lat, lng } = e.latlng;

            setMarker(lat, lng);

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
        });

        return () => mapInstance.current.remove();
    }, []);

    // 2️⃣ Sync props → map
    useEffect(() => {
        if (!lat || !lng || !mapInstance.current) return;

        setMarker(lat, lng);
        mapInstance.current.setView([lat, lng], 16);
    }, [lat, lng]);

    // 3️⃣ Marker helper
    const setMarker = (lat, lng) => {
        if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
        } else {
            markerRef.current = L.marker([lat, lng]).addTo(
                mapInstance.current
            );
        }
    };

    return (
        <div
            ref={mapRef}
            style={{
                height: "350px",
                width: "100%",
                borderRadius: "10px",
            }}
        />
    );
}
