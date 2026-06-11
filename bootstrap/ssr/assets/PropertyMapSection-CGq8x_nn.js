import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "../ssr.js";
import axios from "axios";
import { Navigation } from "lucide-react";
import "@inertiajs/react";
import "react-select";
import "react-hot-toast";
import "sweetalert2";
import "react-select/async";
import "@mui/material";
import "@mui/icons-material/Person";
import "@mui/icons-material/Email";
import "@mui/icons-material/Phone";
import "@mui/icons-material/Business";
import "@mui/icons-material/LocationOn";
import "@mui/icons-material/Cake";
import "@mui/icons-material/Lock";
import "@mui/icons-material/Badge";
import "@mui/icons-material/ArrowBack";
import "@mui/icons-material/CalendarToday";
import "@mui/icons-material/Description";
import "@mui/icons-material/Home";
import "@mui/icons-material/RequestPage";
import "@mui/icons-material/ChevronLeft";
import "@mui/icons-material/ChevronRight";
import "@mui/icons-material/FilterList";
import "@mui/icons-material/SquareFoot";
import "@mui/icons-material/Bed";
import "@mui/icons-material/Bathtub";
import "@mui/icons-material/Balcony";
import "@mui/icons-material/Edit";
import "@mui/icons-material/Delete";
import "@mui/icons-material/RestoreFromTrash";
import "@mui/icons-material/DeleteForever";
import "@mui/icons-material/Verified";
import "@mui/icons-material/People";
import "@mui/icons-material/Search";
import "@mui/icons-material/Work";
import "@mui/icons-material/AttachMoney";
import "@mui/icons-material/Map";
import "@mui/icons-material/Language";
import "@mui/icons-material/Notifications";
import "react-phone-number-input";
import "react-datepicker";
import "@inertiajs/react/server";
import "react-dom/server";
const PLACE_TYPES = [
  { key: "school", label: "Shkolla", color: "#2563eb" },
  { key: "hospital", label: "Spitale", color: "#dc2626" },
  { key: "police", label: "Polici", color: "#0ea5e9" },
  { key: "fire_station", label: "Zjarrfikës", color: "#f59e42" },
  { key: "supermarket", label: "Supermarkete", color: "#22c55e" },
  { key: "bakery", label: "Furrë buke", color: "#eab308" },
  { key: "pharmacy", label: "Farmaci", color: "#a21caf" }
];
function DirectionsLayer({ userLocation, propertyLocation }) {
  const [route, setRoute] = useState(null);
  const map = useMap();
  useEffect(() => {
    if (!userLocation || !propertyLocation) return;
    const url = `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${propertyLocation[1]},${propertyLocation[0]}?overview=full&geometries=geojson`;
    axios.get(url).then((res) => {
      if (res.data.routes?.length > 0) {
        const coords = res.data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
        setRoute(coords);
        map.fitBounds(L.latLngBounds([userLocation, propertyLocation]), { padding: [50, 50] });
      }
    }).catch(() => {
    });
  }, [userLocation, propertyLocation, map]);
  if (!route) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Polyline, { positions: route, color: "#2563eb", weight: 4, opacity: 0.7 }),
    /* @__PURE__ */ jsx(Marker, { position: userLocation, children: /* @__PURE__ */ jsx(Popup, { children: "Vendndodhja juaj" }) })
  ] });
}
function NearbyPlaces({ lat, lng, selectedType }) {
  const [allPlaces, setAllPlaces] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!lat || !lng) return;
    setLoading(true);
    axios.get("/nearby-places", { params: { lat, lng, radius: 2e3 } }).then((res) => {
      const grouped = {};
      for (const place of res.data) {
        if (!grouped[place.type]) grouped[place.type] = [];
        grouped[place.type].push(place);
      }
      setAllPlaces(grouped);
      setLoading(false);
    }).catch(() => {
      setAllPlaces({});
      setLoading(false);
    });
  }, [lat, lng]);
  if (!selectedType) return null;
  const typeObj = PLACE_TYPES.find((t) => t.key === selectedType);
  const places = allPlaces[selectedType] || [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    loading && /* @__PURE__ */ jsx("div", { children: "Duke ngarkuar..." }),
    !loading && places.map((place) => /* @__PURE__ */ jsx(
      CircleMarker,
      {
        center: [place.latitude, place.longitude],
        radius: 12,
        pathOptions: { color: typeObj.color, fillColor: typeObj.color, fillOpacity: 0.7 },
        children: /* @__PURE__ */ jsxs(Popup, { children: [
          place.name || "Pa emër",
          /* @__PURE__ */ jsx("br", {}),
          typeObj.label
        ] })
      },
      place.id
    ))
  ] });
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
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-2", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleGetDirections,
        className: "flex items-center gap-2 px-4 py-2 rounded-lg transition bg-gray-700 text-white hover:bg-gray-800",
        children: [
          /* @__PURE__ */ jsx(Navigation, { size: 18 }),
          "Shfaq rrugën"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mb-2 border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 sm:flex sm:gap-0", children: PLACE_TYPES.map((type) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setSelectedType(type.key),
        className: `px-4 py-2 -mb-px font-medium transition border-b-2 ${selectedType === type.key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600"}`,
        style: { minWidth: 110 },
        children: type.label
      },
      type.key
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-[320px] rounded-2xl overflow-hidden shadow", children: /* @__PURE__ */ jsxs(
      MapContainer,
      {
        center: [lat, lng],
        zoom: 16,
        style: { height: "100%", width: "100%" },
        scrollWheelZoom: false,
        children: [
          /* @__PURE__ */ jsx(
            TileLayer,
            {
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              attribution: "© OpenStreetMap contributors"
            }
          ),
          /* @__PURE__ */ jsx(Marker, { position: [lat, lng], children: /* @__PURE__ */ jsx(Popup, { children: "Prona" }) }),
          /* @__PURE__ */ jsx(NearbyPlaces, { lat, lng, selectedType }),
          userLocation && /* @__PURE__ */ jsx(
            DirectionsLayer,
            {
              userLocation,
              propertyLocation
            }
          )
        ]
      }
    ) })
  ] });
};
export {
  PropertyMapSection as default
};
