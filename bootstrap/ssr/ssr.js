import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useForm, router, Head, Link, usePage, createInertiaApp } from "@inertiajs/react";
import axios from "axios";
import Select from "react-select";
import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Eye, Tag, Bookmark, Bed, Bath, Home, Maximize2, Layers, Building2 } from "lucide-react";
import AsyncSelect from "react-select/async";
import { Box, Button, Card, CardContent, Typography, Chip, CardActions, useMediaQuery, Tabs, Tab, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BalconyIcon from "@mui/icons-material/Balcony";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VerifiedIcon from "@mui/icons-material/Verified";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MapIcon from "@mui/icons-material/Map";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
const cities = [{ "value": "Tiranë", "label": "Tiranë" }, { "value": "Durrës", "label": "Durrës" }, { "value": "Elbasan", "label": "Elbasan" }, { "value": "Berat", "label": "Berat" }, { "value": "Dimal", "label": "Dimal" }, { "value": "Kuçovë", "label": "Kuçovë" }, { "value": "Poliçan", "label": "Poliçan" }, { "value": "Skrapar", "label": "Skrapar" }, { "value": "Bulqizë", "label": "Bulqizë" }, { "value": "Dibër", "label": "Dibër" }, { "value": "Klos", "label": "Klos" }, { "value": "Mat", "label": "Mat" }, { "value": "Krujë", "label": "Krujë" }, { "value": "Shijak", "label": "Shijak" }, { "value": "Cërrik", "label": "Cërrik" }, { "value": "Belsh", "label": "Belsh" }, { "value": "Peqin", "label": "Peqin" }, { "value": "Gramsh", "label": "Gramsh" }, { "value": "Librazhd", "label": "Librazhd" }, { "value": "Prrenjas", "label": "Prrenjas" }, { "value": "Divjakë", "label": "Divjakë" }, { "value": "Fier", "label": "Fier" }, { "value": "Lushnjë", "label": "Lushnjë" }, { "value": "Mallakastër", "label": "Mallakastër" }, { "value": "Patos", "label": "Patos" }, { "value": "Roskovec", "label": "Roskovec" }, { "value": "Dropull", "label": "Dropull" }, { "value": "Gjirokastër", "label": "Gjirokastër" }, { "value": "Këlcyrë", "label": "Këlcyrë" }, { "value": "Libohovë", "label": "Libohovë" }, { "value": "Memaliaj", "label": "Memaliaj" }, { "value": "Përmet", "label": "Përmet" }, { "value": "Tepelenë", "label": "Tepelenë" }, { "value": "Devoll", "label": "Devoll" }, { "value": "Kolonjë", "label": "Kolonjë" }, { "value": "Korçë", "label": "Korçë" }, { "value": "Maliq", "label": "Maliq" }, { "value": "Pogradec", "label": "Pogradec" }, { "value": "Pustec", "label": "Pustec" }, { "value": "Kukës", "label": "Kukës" }, { "value": "Has", "label": "Has" }, { "value": "Tropojë", "label": "Tropojë" }, { "value": "Lezhë", "label": "Lezhë" }, { "value": "Mirditë", "label": "Mirditë" }, { "value": "Kurbin", "label": "Kurbin" }, { "value": "Shkodër", "label": "Shkodër" }, { "value": "Malësi e Madhe", "label": "Malësi e Madhe" }, { "value": "Pukë", "label": "Pukë" }, { "value": "Kashar", "label": "Kashar" }, { "value": "Dajt", "label": "Dajt" }, { "value": "Pezë", "label": "Pezë" }, { "value": "Vaqarr", "label": "Vaqarr" }, { "value": "Vlorë", "label": "Vlorë" }, { "value": "Delvinë", "label": "Delvinë" }, { "value": "Sarandë", "label": "Sarandë" }, { "value": "Selenicë", "label": "Selenicë" }, { "value": "Himarë", "label": "Himarë" }, { "value": "Konispol", "label": "Konispol" }, { "value": "Finiq", "label": "Finiq" }];
const locations = {
  cities
};
function MapPicker({ lat, lng, onSelect }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  useEffect(() => {
    mapInstance.current = L.map(mapRef.current).setView(
      [lat || 41.3275, lng || 19.8187],
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(mapInstance.current);
    mapInstance.current.on("click", async (e) => {
      const { lat: lat2, lng: lng2 } = e.latlng;
      setMarker(lat2, lng2);
      try {
        const res = await fetch(
          `/api/reverse-geocode?lat=${lat2}&lng=${lng2}`
        );
        const data = await res.json();
        const road = data?.address?.road || data?.address?.neighbourhood || data?.address?.suburb || "";
        onSelect({ lat: lat2, lng: lng2, road });
      } catch (error) {
        console.error("Geocoding error:", error);
        onSelect({ lat: lat2, lng: lng2, road: "" });
      }
    });
    return () => mapInstance.current.remove();
  }, []);
  useEffect(() => {
    if (!lat || !lng || !mapInstance.current) return;
    setMarker(lat, lng);
    mapInstance.current.setView([lat, lng], 16);
  }, [lat, lng]);
  const setMarker = (lat2, lng2) => {
    if (markerRef.current) {
      markerRef.current.setLatLng([lat2, lng2]);
    } else {
      markerRef.current = L.marker([lat2, lng2]).addTo(
        mapInstance.current
      );
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: mapRef,
      style: {
        height: "350px",
        width: "100%",
        borderRadius: "10px"
      }
    }
  );
}
const ErrorText = ({ field, errors }) => {
  const err = errors?.[field];
  if (!err) return null;
  const text = Array.isArray(err) ? err.join(" ") : err;
  return /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: text });
};
const inputBase$5 = "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all placeholder-gray-400";
const labelBase$5 = "block text-sm font-medium text-gray-700 mb-1";
const errorBase$3 = "text-sm text-red-500 mt-1";
function EditProperty$1({ property, propertyImages, floorPlan, hipotekeFile }) {
  const { data, setData, put, processing, errors } = useForm({
    type_of_sale: property.type_of_sale,
    property_type: property.property_type,
    property_category: property.property_category,
    city: property.city,
    street: property.street,
    surface: property.surface,
    price: property.price,
    ashensor: property.ashensor,
    hipoteke: property.hipoteke,
    floor_plan: floorPlan,
    currency: property.currency,
    description: property.description,
    total_rooms: property.total_rooms,
    total_bathrooms: property.total_bathrooms,
    total_balconies: property.total_balconies,
    floor_number: property.floor_number,
    total_floors: property.total_floors,
    year_built: property.year_built,
    latitude: property.latitude,
    longitude: property.longitude,
    virtual_tour_link: property.virtual_tour_link,
    images: propertyImages,
    virtual_tour: property.virtual_tour,
    rivleresim: property.rivleresim,
    combo_package: property.combo_package,
    hipoteke_file: hipotekeFile,
    mobilim: property.mobilim,
    parkim: property.parkim,
    price_negotiable: property.price_negotiable
  });
  const [coords, setCoords] = useState({ lat: property.latitude, lng: property.longitude });
  const [images, setImages] = useState(
    () => propertyImages.map((img) => ({
      id: img.id,
      url: `/storage/${img.path}`,
      isNew: false
    }))
  );
  const [hipotekaFile, setHipotekaFile] = useState(
    () => hipotekeFile.map((hipo) => ({
      id: hipo.id,
      file_name: hipo.file_name,
      url: `/storage/${hipo.path}`,
      isNew: false
    }))
  );
  const [planFile, setplanFile] = useState(
    () => floorPlan.map((pl) => ({
      id: pl.id,
      file_name: pl.file_name,
      url: `/storage/${pl.path}`,
      isNew: false
    }))
  );
  const MAX_FILES = 10;
  const MAX_SIZE_MB = 5;
  const saleOptions = [
    { value: "", label: "Zgjidh Llojin e Transaksionit" },
    { value: "sale", label: "Shitje" },
    { value: "rent", label: "Qira" }
  ];
  function handleImages(files) {
    const arr = Array.from(files);
    const newImages = [];
    arr.forEach((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`Foto "${file.name}" është më e madhe se ${MAX_SIZE_MB}MB`);
        return;
      }
      newImages.push({
        file,
        url: URL.createObjectURL(file),
        isNew: true
      });
    });
    const combined = [...images, ...newImages];
    if (combined.length > MAX_FILES) {
      toast.error(`Maksimumi lejohet ${MAX_FILES} foto`);
      return;
    }
    setImages(combined);
    const formData = new FormData();
    newImages.forEach((img) => formData.append("images[]", img.file));
    axios.post(`/property/${property.id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      const uploaded = res.data.uploadedImages.map((img) => ({ ...img, isNew: false }));
      setImages((prev) => {
        const existing = prev.filter((img) => !img.isNew);
        return [...existing, ...uploaded];
      });
      toast.success(res.data.message || "Fotot u ngarkuan me sukses");
    }).catch((err) => {
      toast.error("Ngarkimi i fotos dështoi");
      console.error(err);
      setImages((prev) => prev.filter((img) => !img.isNew));
    });
  }
  function removeImage(index) {
    const img = images[index];
    Swal.fire({
      title: "A jeni i sigurt?",
      text: "Kjo foto do të fshihet përgjithmonë.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, fshije",
      cancelButtonText: "Anullo",
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;
      if (img.isNew) {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setData(
          "images",
          updated.filter((i) => i.isNew).map((i) => i.file)
        );
        Swal.fire({
          icon: "success",
          title: "Foto u hoq",
          timer: 1200,
          showConfirmButton: false
        });
        return;
      }
      router.delete(`/property/${property.id}/images/${img.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setImages((prev) => prev.filter((_, i) => i !== index));
          Swal.fire({
            icon: "success",
            title: "Foto u fshi",
            timer: 1200,
            showConfirmButton: false
          });
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Gabim",
            text: "Ndodhi një problem gjatë fshirjes."
          });
        }
      });
    });
  }
  function handleHipotek(file) {
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Dokumenti "${file.name}" është më i madh se ${MAX_SIZE_MB}MB`);
      return;
    }
    const newFile = {
      file,
      file_name: file.name,
      url: URL.createObjectURL(file),
      isNew: true
    };
    setHipotekaFile([newFile]);
    const formData = new FormData();
    formData.append("file", file);
    axios.post(`/property/${property.id}/document/hipoteke`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      const uploaded = { ...res.data.document, isNew: false };
      setHipotekaFile([uploaded]);
      toast.success(res.data.message || "Dokumenti u ngarkua me sukses");
    }).catch((err) => {
      toast.error("Ngarkimi i dokumentit dështoi");
      console.error(err);
      setHipotekaFile([]);
    });
  }
  function removeHipotek() {
    if (!hipotekaFile[0]) return;
    const img = hipotekaFile[0];
    Swal.fire({
      title: "A jeni i sigurt?",
      text: "Ky dokument do të fshihet përgjithmonë.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, fshije",
      cancelButtonText: "Anullo"
    }).then((result) => {
      if (!result.isConfirmed) return;
      if (img.isNew) {
        setHipotekaFile([]);
        Swal.fire({ icon: "success", title: "Dokumenti u hoq", timer: 1200, showConfirmButton: false });
        return;
      }
      router.delete(`/property/${property.id}/document/hipoteke/${img.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setHipotekaFile([]);
          Swal.fire({ icon: "success", title: "Dokumenti u hoq", timer: 1200, showConfirmButton: false });
        },
        onError: () => Swal.fire({ icon: "error", title: "Gabim", text: "Ndodhi një problem gjatë fshirjes." })
      });
    });
  }
  function handlePlan(file) {
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Dokumenti "${file.name}" është më i madh se ${MAX_SIZE_MB}MB`);
      return;
    }
    const newFile = {
      file,
      file_name: file.name,
      url: URL.createObjectURL(file),
      isNew: true
    };
    setplanFile([newFile]);
    const formData = new FormData();
    formData.append("file", file);
    axios.post(`/property/${property.id}/document/plan`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      const uploaded = { ...res.data.document, isNew: false };
      setplanFile([uploaded]);
      toast.success(res.data.message || "Planimetria u ngarkua me sukses");
    }).catch((err) => {
      toast.error("Ngarkimi i planimetrise dështoi");
      console.error(err);
      setplanFile([]);
    });
  }
  function removePlan() {
    if (!planFile[0]) return;
    const img = planFile[0];
    Swal.fire({
      title: "A jeni i sigurt?",
      text: "Ky dokument do të fshihet përgjithmonë.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, fshije",
      cancelButtonText: "Anullo"
    }).then((result) => {
      if (!result.isConfirmed) return;
      if (img.isNew) {
        setplanFile([]);
        Swal.fire({ icon: "success", title: "Dokumenti u hoq", timer: 1200, showConfirmButton: false });
        return;
      }
      router.delete(`/property/${property.id}/document/plan/${img.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setplanFile([]);
          Swal.fire({ icon: "success", title: "Dokumenti u hoq", timer: 1200, showConfirmButton: false });
        },
        onError: () => Swal.fire({ icon: "error", title: "Gabim", text: "Ndodhi një problem gjatë fshirjes." })
      });
    });
  }
  const typeOfProperties = [
    { value: "residential", label: "Rezidenciale" },
    { value: "commercial", label: "Komerciale" },
    { value: "land", label: "Tokë" },
    { value: "others", label: "Të tjera" }
  ];
  const subTypeProperties2 = {
    residential: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    commercial: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    land: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    others: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const dynamicFieldsMap = {
    apartment: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 3" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 1" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 2" },
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 5" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 2008" }
    ],
    house: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 5" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 2" },
      { value: "total_floors", type: "number", label: "Numri i Kateve të Ndërtimit", placeholder: "p.sh. 3" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 1995" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 1" }
    ],
    office: [
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 2" }
    ]
  };
  const renderDynamicFields = (selectedSubtype, data2, setData2) => {
    if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
      return null;
    }
    return dynamicFieldsMap[selectedSubtype].map((field) => {
      const isYearBuilt = field.value === "year_built";
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$5, children: field.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: field.type,
            value: data2[field.value] || "",
            placeholder: field.placeholder || "",
            onChange: (e) => setData2(field.value, e.target.value),
            ...isYearBuilt ? { min: 1900, max: 2050 } : {},
            className: inputBase$5
          }
        ),
        /* @__PURE__ */ jsx(ErrorText, { field: field.value, errors })
      ] }, field.value);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/properties/${property.id}`);
  };
  return /* @__PURE__ */ jsx("div", { className: "pt-20 bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-1 pb-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-5 pt-4 text-gray-800 opacity-0 animate-fade-in-up", children: "Përditëso Pronën" }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 pb-3 border-b", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Lloji i Transaksionit \\*" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "type_of_sale",
                  value: saleOptions.find((o) => o.value === data.type_of_sale) || null,
                  onChange: (selected) => {
                    setData("type_of_sale", selected ? selected.value : "");
                  },
                  options: saleOptions,
                  placeholder: "Zgjidh llojin",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "type_of_sale", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Lloji i Pronës \\*" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "property_type",
                  value: typeOfProperties.find((o) => o.value === data.property_type) || null,
                  onChange: (selected) => {
                    setData("property_type", selected ? selected.value : "");
                    setData("property_category", "");
                  },
                  options: typeOfProperties,
                  placeholder: "Zgjidh llojin",
                  classNamePrefix: "react-select z-50",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "property_type", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Kategoria e Pronës \\*" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "property_category",
                  value: data.property_type ? subTypeProperties2[data.property_type].find((o) => o.value === data.property_category) || null : null,
                  onChange: (selected) => setData("property_category", selected ? selected.value : ""),
                  options: data.property_type ? subTypeProperties2[data.property_type] : [],
                  isDisabled: !data.property_type,
                  placeholder: "Zgjidh kategorinë",
                  classNamePrefix: "react-select z-50",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "property_category", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Qyteti \\*" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  value: locations.cities.find(
                    (city) => city.label === data.city
                  ) || null,
                  onChange: (selected) => {
                    setData("city", selected ? selected.label : "");
                  },
                  menuPortalTarget: document.body,
                  options: locations.cities,
                  placeholder: "Zgjidh Bashkinë",
                  classNamePrefix: "react-select z-50",
                  isDisabled: !locations.cities.length
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "city", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Vendndodhja në hartë \\*" }),
              /* @__PURE__ */ jsx(
                MapPicker,
                {
                  lat: coords.lat,
                  lng: coords.lng,
                  className: "relative z-0",
                  style: { zIndex: 0 },
                  onSelect: (location) => {
                    const lat = Number(location.lat);
                    const lng = Number(location.lng);
                    setCoords({ lat, lng });
                    setData("latitude", lat);
                    setData("longitude", lng);
                    setData("street", location.road);
                  }
                }
              ),
              errors.latitude && /* @__PURE__ */ jsx("p", { className: errorBase$3, children: errors.latitude })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Sipërfaqja \\*" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputBase$5,
                  name: "surface",
                  type: "number",
                  value: data.surface,
                  onChange: (e) => setData("surface", e.target.value),
                  placeholder: "Sipërfaqja në m²",
                  autoComplete: "off"
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "surface", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Çmimi \\*" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: inputBase$5,
                    type: "number",
                    value: data.price,
                    onChange: (e) => setData("price", e.target.value),
                    placeholder: "Çmimi",
                    autoComplete: "off"
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    name: "currency",
                    className: "mt-1 min-w-24",
                    value: data.currency ? { value: data.currency, label: data.currency } : { value: "EUR", label: "EUR" },
                    onChange: (selected) => {
                      setData("currency", selected ? selected.value : "");
                    },
                    options: [
                      { value: "EUR", label: "EUR" },
                      { value: "USD", label: "USD" },
                      { value: "ALL", label: "ALL" }
                    ],
                    classNamePrefix: "react-select",
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "transparent",
                        borderColor: "#d1d5db"
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "white"
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "#111827"
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#6b7280"
                      })
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ErrorText, { field: "price", errors })
            ] }),
            renderDynamicFields(data.property_category, data, setData),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Imazhe \\*" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  multiple: true,
                  accept: "image/*",
                  onChange: (e) => handleImages(e.target.files)
                }
              ),
              images.length < 2 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "Duhet të ngarkoni të paktën 2 foto." }),
              /* @__PURE__ */ jsx(ErrorText, { field: "images", errors }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: images.map((img, index) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: img.url,
                    className: "w-full h-24 object-cover rounded-lg border"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeImage(index),
                    className: "absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs text-center opacity-80 hover:opacity-100",
                    children: "✕"
                  }
                )
              ] }, index)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "my-5 pb-2 border-b", children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Planimetria *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: ".pdf,image/*",
                onChange: (e) => handlePlan(e.target.files[0]),
                className: "mt-1"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Lejohet PDF ose foto \\(maks 5MB\\)" }),
            /* @__PURE__ */ jsx(ErrorText, { field: "floor_plan", errors }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: planFile[0] && /* @__PURE__ */ jsxs("div", { className: "relative mt-2", children: [
              /* @__PURE__ */ jsx("h1", { children: planFile[0].file_name }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: removePlan,
                  className: "absolute top-0 right-0 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center",
                  children: "✕"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "my-5 pb-2 border-b", children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Hipotekë \\(opsional\\)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: ".pdf,image/*",
                onChange: (e) => handleHipotek(e.target.files[0]),
                className: "mt-1"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Lejohet maks 5MB" }),
            /* @__PURE__ */ jsx(ErrorText, { field: "hipoteke_file", errors }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: hipotekaFile[0] && /* @__PURE__ */ jsxs("div", { className: "relative mt-2", children: [
              /* @__PURE__ */ jsx("h1", { children: hipotekaFile[0].file_name }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: removeHipotek,
                  className: "absolute top-0 right-0 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center",
                  children: "✕"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 opacity-0 animate-fade-in-up", style: { animationDelay: "0.8s" }, children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$5, children: "Përshkrimi" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: inputBase$5 + " h-32 resize-none",
                placeholder: "Shkruani detaje të pronës..."
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: errorBase$3, children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Detaje Teknike" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.ashensor,
                  onChange: (e) => setData("ashensor", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka ashensor" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.hipoteke,
                  onChange: (e) => setData("hipoteke", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka hipotekë" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.mobilim,
                  onChange: (e) => setData("mobilim", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë mobilimi" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.parkim,
                  onChange: (e) => setData("parkim", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë vendi i parkimit" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.price_negotiable,
                  onChange: (e) => setData("price_negotiable", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Çmimi i negociueshëm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gray-50 p-4 rounded-xl border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Shërbime Ekstra" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.virtual_tour,
                  onChange: (e) => {
                    setData("virtual_tour", e.target.checked);
                    if (e.target.checked) setData("combo_package", false);
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
                "Dëshiroj Virtual Tour – ",
                /* @__PURE__ */ jsx("strong", { children: "150€" }),
                " \\(Rankim Gold\\)"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.rivleresim,
                  onChange: (e) => {
                    setData("rivleresim", e.target.checked);
                    if (e.target.checked) setData("combo_package", false);
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
                "Dëshiroj Rivlerësim – ",
                /* @__PURE__ */ jsx("strong", { children: "150€" }),
                " \\(Rankim Silver\\)"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.combo_package,
                  onChange: (e) => {
                    setData("combo_package", e.target.checked);
                    if (e.target.checked) {
                      setData("virtual_tour", false);
                      setData("rivleresim", false);
                    }
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
                "Dëshiroj të dyja bashkë – ",
                /* @__PURE__ */ jsx("strong", { children: "250€" }),
                " \\(Rankim Platinum\\)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl opacity-0 animate-fade-in-up",
              style: { animationDelay: "1s" },
              children: "Përditëso Pronën"
            }
          )
        ]
      }
    )
  ] }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditProperty$1
}, Symbol.toStringTag, { value: "Module" }));
const backgroundImage = "/build/assets/background-WQX73kXx.jpeg";
const Landing = () => {
  const [animate, setAnimate] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      setImageLoaded(true);
      setTimeout(() => setAnimate(true), 100);
    };
    const fallbackTimer = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true);
        setAnimate(true);
      }
    }, 3e3);
    return () => clearTimeout(fallbackTimer);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Gjej pronën perfekte në Shqipëri | Gjej-Prone" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Platforma më e mirë për të gjetur, blerë, ose dhënë me qira prona në Shqipëri. Publiko pronën tënde lehtësisht dhe shiko ofertat më të fundit." }),
      /* @__PURE__ */ jsx("link", { rel: "preload", as: "image", href: backgroundImage })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative pb-25", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${imageLoaded ? "opacity-100 bg-gray-200" : "opacity-0 bg-gray-300 animate-pulse"}`,
          style: { backgroundImage: imageLoaded ? `url(${backgroundImage})` : "none" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" }),
            " "
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center", children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: `text-2xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 ease-out ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
            children: "Tregu i Pronave ne Shqiperi, i Organizuar nga Kërkesa tek Oferta"
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: `mt-2 text-lg md:text-xl text-white/90 mb-6 max-w-4xl transform transition-all duration-1000 delay-200 ease-out ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
            children: "Publiko falas kërkesën ose pronën tënde. Lidhje direkte mes blerësit dhe shitësit, me verifikim profesional, shërbime arkitekturore dhe prezantim premium për një proces të sigurt dhe efikas."
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transform transition-all duration-1000 delay-400 ease-out ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
            children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/listed-properties",
                  className: "px-6 py-3 bg-blue-400 text-white rounded hover:bg-blue-600 transition",
                  children: "Shiko Pronat"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/property/requests/all",
                  className: "px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-blue-600 transition",
                  children: "Shiko Kerkesat"
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative z-20 bg-white/90 rounded-lg shadow-lg max-w-6xl mx-auto my-10 p-8 text-gray-900", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3 text-blue-700", children: "Platformë Digjitale për Kërkesë & Ofertë Pronash në Shqipëri" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Platforma jonë është një hapësirë e dedikuar për tregun imobiliar në Shqipëri, ku blerësit mund të publikojnë falas kërkesat e tyre për pronën që dëshirojnë të blejnë, ndërsa shitësit mund të listojnë falas pronat që kanë në shitje." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-blue-600", children: "Si funksionon?" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-6 space-y-2 list-disc list-inside", children: [
        /* @__PURE__ */ jsx("li", { children: "Blerësit publikojnë kriteret e tyre (zonë, buxhet, tipologji, sipërfaqe, etj.)." }),
        /* @__PURE__ */ jsx("li", { children: "Shitësit listojnë pronën me detaje dhe dokumentacion përkatës." }),
        /* @__PURE__ */ jsx("li", { children: "Platforma ofron filtra të avancuar për kërkim të shpejtë dhe të saktë." }),
        /* @__PURE__ */ jsx("li", { children: "Çdo pronë verifikohet nëpërmjet certifikatës së pronësisë, me qëllim shmangien e postimeve nga agjenci dhe garantimin e transparencës." })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-blue-600", children: "Shërbime për Blerësit" }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Përtej lidhjes direkte me shitësin, ne ofrojmë shërbime profesionale shtesë:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-6 space-y-2 list-disc list-inside", children: [
        /* @__PURE__ */ jsx("li", { children: "Interior Design – Propozime për mobilimin dhe optimizimin e hapësirës së pronës që planifikoni të blini." }),
        /* @__PURE__ */ jsx("li", { children: "Shërbime Arkitekturore & Verifikim Teknik – Kontroll i sipërfaqes reale, planimetrisë dhe përputhshmërisë me dokumentacionin ekzistues, përpara finalizimit të blerjes." })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-blue-600", children: "Shërbime për Shitësit" }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Për të rritur vlerën dhe potencialin e shitjes së pronës suaj, ofrojmë:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-6 space-y-2 list-disc list-inside", children: [
        /* @__PURE__ */ jsx("li", { children: "Rivlerësim nga vlerësues të licencuar, me qëllim optimizimin fiskal dhe mundësinë e uljes së tatimit nga 15% në 5%, sipas legjislacionit në fuqi." }),
        /* @__PURE__ */ jsx("li", { children: "Virtual Tour & Prezantim Profesional, për t'i dhënë pronës një imazh më të avancuar dhe për të rritur interesin e blerësve." })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-blue-600", children: "Modeli i Platformës" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-6 space-y-2 list-disc list-inside", children: [
        /* @__PURE__ */ jsx("li", { children: "Listimi i pronës dhe publikimi i kërkesave është falas." }),
        /* @__PURE__ */ jsx("li", { children: "Shërbimet profesionale shtesë ofrohen me pagesë, sipas listës së çmimeve të VirtuNEX." }),
        /* @__PURE__ */ jsx("li", { children: "Në rast se një shitës kërkon kontaktin e drejtpërdrejtë të një blerësi, aplikohet një tarifë e vogël." }),
        /* @__PURE__ */ jsx("li", { children: "Brenda kësaj tarife përfshihet edhe koordinimi nga ana jonë: ne konfirmojmë paraprakisht nëse blerësi është ende i interesuar për pronën përkatëse, përpara se të realizohet kontakti." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6", children: "Platforma synon të krijojë një ekosistem transparent, profesional dhe të strukturuar, duke kombinuar teknologjinë me shërbime arkitekturore dhe vlerësuese, për ta bërë procesin e blerjes dhe shitjes së pronës më të sigurt dhe më efikas." })
    ] })
  ] });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Landing
}, Symbol.toStringTag, { value: "Module" }));
const inputBase$4 = "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all placeholder-gray-400";
const labelBase$4 = "block text-sm font-medium text-gray-700 mb-1";
const errorBase$2 = "text-sm text-red-500 mt-1";
function NewProperty() {
  const { data, setData, post, processing, errors } = useForm({
    type_of_sale: "",
    property_type: "",
    property_category: "",
    city: "",
    street: "",
    surface: "",
    price: "",
    ashensor: false,
    hipoteke: false,
    floor_plan: [],
    currency: "EUR",
    description: "",
    total_rooms: "",
    total_bathrooms: "",
    total_balconies: "",
    floor_number: "",
    total_floors: "",
    year_built: "",
    latitude: "",
    longitude: "",
    virtual_tour_link: "",
    images: [],
    virtual_tour: false,
    rivleresim: false,
    combo_package: false,
    hipoteke_file: [],
    mobilim: false,
    parkim: false,
    price_negotiable: false
  });
  const { auth } = usePage().props;
  const role = auth?.user?.role || "guest";
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [selectedBashki, setSelectedBashki] = useState(null);
  const [images, setImages] = useState([]);
  const MAX_FILES = 10;
  const MAX_SIZE_MB = 5;
  const saleOptions = [
    { value: "", label: "Zgjidh Llojin e Transaksionit" },
    { value: "sale", label: "Shitje" },
    { value: "rent", label: "Qira" }
  ];
  function handleImages(files) {
    const arr = Array.from(files);
    const newImages = [];
    arr.forEach((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        return toast.error(`Foto "${file.name}" është më e madhe se ${MAX_SIZE_MB}MB`);
      }
      newImages.push({
        file,
        preview: URL.createObjectURL(file)
      });
    });
    const combined = [...images, ...newImages];
    if (combined.length > MAX_FILES) {
      return toast.error(`Maksimumi lejohet ${MAX_FILES} foto`);
    }
    setImages(combined);
    setData("images", combined.map((item) => item.file));
    toast.success("Fotot u ngarkuan!");
  }
  function removeImage(index) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setData("images", updated.map((item) => item.file));
  }
  const typeOfProperties = [
    { value: "residential", label: "Rezidenciale" },
    { value: "commercial", label: "Komerciale" },
    { value: "land", label: "Tokë" },
    { value: "others", label: "Të tjera" }
  ];
  const subTypeProperties2 = {
    residential: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    commercial: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    land: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    others: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const dynamicFieldsMap = {
    apartment: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 3" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 1" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 2" },
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 5" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 2008" }
    ],
    house: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 5" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 2" },
      { value: "total_floors", type: "number", label: "Numri i Kateve të Ndërtimit", placeholder: "p.sh. 3" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 1995" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 1" }
    ],
    office: [{ value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 2" }]
  };
  const renderDynamicFields = (selectedSubtype, data2, setData2) => {
    if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
      return null;
    }
    return dynamicFieldsMap[selectedSubtype].map((field) => {
      const isYearBuilt = field.value === "year_built";
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$4, children: field.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: field.type,
            value: data2[field.value] || "",
            placeholder: field.placeholder || "",
            onChange: (e) => setData2(field.value, e.target.value),
            ...isYearBuilt ? { min: 1900, max: 2050 } : {},
            className: inputBase$4
          }
        ),
        /* @__PURE__ */ jsx(ErrorText, { field: field.value, errors })
      ] }, field.value);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "individual" && !(data.hipoteke_file instanceof File)) {
      toast.error("Hipoteka është e detyrueshme.");
      return;
    }
    post("/properties", {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "pt-20 bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-4 pb-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-5 pt-4 text-gray-800 opacity-0 animate-fade-in-up", children: "Shto Pronë të Re" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Lloji i Transaksionit \\*" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              name: "type_of_sale",
              value: saleOptions.find((o) => o.value === data.type_of_sale) || null,
              onChange: (selected) => setData("type_of_sale", selected ? selected.value : ""),
              options: saleOptions,
              placeholder: "Zgjidh llojin",
              classNamePrefix: "react-select",
              styles: {
                control: (provided) => ({ ...provided, backgroundColor: "transparent", borderColor: "#d1d5db" }),
                menu: (provided) => ({ ...provided, backgroundColor: "white" }),
                singleValue: (provided) => ({ ...provided, color: "#111827" }),
                placeholder: (provided) => ({ ...provided, color: "#6b7280" })
              }
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "type_of_sale", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Lloji i Pronës \\*" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              name: "property_type",
              value: typeOfProperties.find((o) => o.value === data.property_type) || null,
              onChange: (selected) => {
                setData("property_type", selected ? selected.value : "");
                setData("property_category", "");
              },
              options: typeOfProperties,
              placeholder: "Zgjidh llojin",
              classNamePrefix: "react-select z-50",
              styles: {
                control: (provided) => ({ ...provided, backgroundColor: "transparent", borderColor: "#d1d5db" }),
                menu: (provided) => ({ ...provided, backgroundColor: "white" }),
                singleValue: (provided) => ({ ...provided, color: "#111827" }),
                placeholder: (provided) => ({ ...provided, color: "#6b7280" })
              }
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "property_type", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Kategoria e Pronës \\*" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              name: "property_category",
              value: data.property_type ? subTypeProperties2[data.property_type].find((o) => o.value === data.property_category) || null : null,
              onChange: (selected) => setData("property_category", selected ? selected.value : ""),
              options: data.property_type ? subTypeProperties2[data.property_type] : [],
              isDisabled: !data.property_type,
              placeholder: "Zgjidh kategorinë",
              classNamePrefix: "react-select z-50",
              styles: {
                control: (provided) => ({ ...provided, backgroundColor: "transparent", borderColor: "#d1d5db" }),
                menu: (provided) => ({ ...provided, backgroundColor: "white" }),
                singleValue: (provided) => ({ ...provided, color: "#111827" }),
                placeholder: (provided) => ({ ...provided, color: "#6b7280" })
              }
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "property_category", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Qyteti \\*" }),
          /* @__PURE__ */ jsx(
            Select,
            {
              value: selectedBashki,
              onChange: (selected) => {
                setSelectedBashki(selected);
                setData("city", selected ? selected.label : "");
              },
              menuPortalTarget: document.body,
              options: locations.cities,
              placeholder: "Zgjidh Bashkinë",
              classNamePrefix: "react-select z-50",
              isDisabled: !locations.cities.length
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "city", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Vendndodhja në hartë \\*" }),
          /* @__PURE__ */ jsx(
            MapPicker,
            {
              lat: coords.lat,
              lng: coords.lng,
              className: "relative z-0",
              style: { zIndex: 0 },
              onSelect: (location) => {
                setCoords({ lat: location.lat, lng: location.lng });
                setData("latitude", location.lat);
                setData("longitude", location.lng);
                setData("street", location.road);
              }
            }
          ),
          errors.latitude && /* @__PURE__ */ jsx("p", { className: errorBase$2, children: errors.latitude })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Sipërfaqja \\*" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: inputBase$4,
              name: "surface",
              type: "number",
              value: data.surface,
              onChange: (e) => setData("surface", e.target.value),
              placeholder: "Sipërfaqja në m²",
              autoComplete: "off"
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "surface", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Çmimi \\*" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: inputBase$4,
                type: "number",
                value: data.price,
                onChange: (e) => setData("price", e.target.value),
                placeholder: "Çmimi",
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "currency",
                className: "mt-1 min-w-24",
                value: data.currency ? { value: data.currency, label: data.currency } : { value: "EUR", label: "EUR" },
                onChange: (selected) => setData("currency", selected ? selected.value : ""),
                options: [
                  { value: "EUR", label: "EUR" },
                  { value: "USD", label: "USD" },
                  { value: "ALL", label: "ALL" }
                ],
                classNamePrefix: "react-select",
                styles: {
                  control: (provided) => ({ ...provided, backgroundColor: "transparent", borderColor: "#d1d5db" }),
                  menu: (provided) => ({ ...provided, backgroundColor: "white" }),
                  singleValue: (provided) => ({ ...provided, color: "#111827" }),
                  placeholder: (provided) => ({ ...provided, color: "#6b7280" })
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ErrorText, { field: "price", errors }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.price_negotiable,
                onChange: (e) => setData("price_negotiable", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Çmimi i negociueshëm" })
          ] })
        ] }),
        renderDynamicFields(data.property_category, data, setData),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Imazhe \\*" }),
          /* @__PURE__ */ jsx("input", { type: "file", multiple: true, accept: "image/*", onChange: (e) => handleImages(e.target.files) }),
          images.length < 2 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "Duhet të ngarkoni të paktën 2 foto." }),
          /* @__PURE__ */ jsx(ErrorText, { field: "images", errors }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: images.map((img, index) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx("img", { src: img.preview, className: "w-full h-24 object-cover rounded-lg border" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeImage(index),
                className: "absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100",
                children: "✕"
              }
            )
          ] }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Planimetria *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: ".pdf,image/*",
            onChange: (e) => setData("floor_plan", e.target.files[0]),
            className: "mt-1"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Lejohet PDF ose foto \\(maks 5MB\\)" }),
        /* @__PURE__ */ jsx(ErrorText, { field: "floor_plan", errors })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("label", { className: labelBase$4, children: [
          "Hipotekë \\",
          role === "individual" ? "*" : "(opsional)"
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: ".pdf,image/*",
            onChange: (e) => setData("hipoteke_file", e.target.files[0]),
            className: "mt-1"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Lejohet maks 5MB" }),
        /* @__PURE__ */ jsx(ErrorText, { field: "hipoteke_file", errors })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 opacity-0 animate-fade-in-up", style: { animationDelay: "0.8s" }, children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$4, children: "Përshkrimi" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            className: inputBase$4 + " h-32 resize-none",
            placeholder: "Shkruani detaje të pronës..."
          }
        ),
        errors.description && /* @__PURE__ */ jsx("p", { className: errorBase$2, children: errors.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Detaje Ekstra" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.ashensor,
              onChange: (e) => setData("ashensor", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka ashensor" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.hipoteke,
              onChange: (e) => setData("hipoteke", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka hipotekë" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.mobilim,
              onChange: (e) => setData("mobilim", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë mobilimi" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.parkim,
              onChange: (e) => setData("parkim", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë vendi i parkimit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gray-50 p-4 rounded-xl border", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Shërbime Ekstra" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.virtual_tour,
              onChange: (e) => {
                setData("virtual_tour", e.target.checked);
                if (e.target.checked) setData("combo_package", false);
              }
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
            "Dëshiroj Virtual Tour –  ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://linktr.ee/VirtuNEX?utm_source=linktree_profile_share&ltsid=7e78dae2-3f91-43bc-a0eb-9ebd00ee835d",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 underline hover:text-blue-800",
                children: "Cmimi"
              }
            ),
            " \\(Rankim Gold\\)"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.rivleresim,
              onChange: (e) => {
                setData("rivleresim", e.target.checked);
                if (e.target.checked) setData("combo_package", false);
              }
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
            "Dëshiroj Rivlerësim –",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://linktr.ee/VirtuNEX?utm_source=linktree_profile_share&ltsid=7e78dae2-3f91-43bc-a0eb-9ebd00ee835d",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 underline hover:text-blue-800",
                children: "Cmimi"
              }
            ),
            "\\(Rankim Silver\\)"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.combo_package,
              onChange: (e) => {
                setData("combo_package", e.target.checked);
                if (e.target.checked) {
                  setData("virtual_tour", false);
                  setData("rivleresim", false);
                }
              }
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
            "Dëshiroj të dyja bashkë –  ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://linktr.ee/VirtuNEX?utm_source=linktree_profile_share&ltsid=7e78dae2-3f91-43bc-a0eb-9ebd00ee835d",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 underline hover:text-blue-800",
                children: "Cmimi"
              }
            ),
            "\\(Rankim Platinum\\)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl opacity-0 animate-fade-in-up",
          style: { animationDelay: "1s" },
          children: "Shto Pronën"
        }
      )
    ] })
  ] }) });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewProperty
}, Symbol.toStringTag, { value: "Module" }));
const Privacy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6", children: "Politika e Privatësisë" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ne respektojmë privatësinë tuaj dhe jemi të përkushtuar për të mbrojtur informacionin që na siguroni gjatë përdorimit të platformës tonë për shërbime auto." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "1. Informacioni që mbledhim" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "Mund të mbledhim informacionin tuaj personal si:",
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside ml-5", children: [
        /* @__PURE__ */ jsx("li", { children: "Email dhe numër telefoni" }),
        /* @__PURE__ */ jsx("li", { children: "Emri dhe mbiemri" }),
        /* @__PURE__ */ jsx("li", { children: "Detaje të përdorimit të platformës" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "2. Si përdorim informacionin tuaj" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "Të dhënat tuaja përdoren për:",
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside ml-5", children: [
        /* @__PURE__ */ jsx("li", { children: "Ofrimin dhe menaxhimin e shërbimeve të rezervuara" }),
        /* @__PURE__ */ jsx("li", { children: "Komunikimin me ju për konfirmime, njoftime ose mesazhe të rëndësishme" }),
        /* @__PURE__ */ jsx("li", { children: "Analizimin dhe përmirësimin e shërbimeve tona" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "3. Si ruajmë informacionin" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Të dhënat ruhen në mënyrë të sigurt dhe të koduar. Vetëm punonjësit e autorizuar ose sistemet e sigurisë kanë qasje. Nuk i ndajmë të dhënat tuaja me palë të treta pa miratimin tuaj, përveç rasteve të ligjshme." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "4. Të drejtat e përdoruesve" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "Ju keni të drejtë të:",
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside ml-5", children: [
        /* @__PURE__ */ jsx("li", { children: "Shikoni dhe përditësoni informacionin tuaj personal" }),
        /* @__PURE__ */ jsx("li", { children: "Kërkoni fshirjen ose eksportimin e të dhënave tuaja" }),
        /* @__PURE__ */ jsx("li", { children: "Tërhiqni pëlqimin për përdorimin e informacionit tuaj për marketing" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "5. Cookies dhe teknologji të ngjashme" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Përdorim cookies dhe teknologji të tjera për të përmirësuar funksionimin e platformës dhe për të analizuar trafikun. Ju mund të refuzoni cookies përveç atyre thelbësore." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "6. Siguria e informacionit" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ne përdorim masat më të mira të industrisë për të mbrojtur informacionin tuaj, përfshirë enkriptimin, kontrollet e aksesit dhe monitorimin e sistemeve." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "7. Ndryshimet në politikë" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ne mund të përditësojmë këtë Politikë të Privatësisë në çdo kohë. Ndryshimet do të publikohen në këtë faqe dhe është përgjegjësi e përdoruesit të kontrollojë ndryshimet periodikisht." }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-gray-600", children: "Kjo politikë hyn në fuqi që nga data e publikimit dhe zbatohet për të gjitha të dhënat që mbledhim nga përdoruesit e platformës." })
  ] });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Privacy
}, Symbol.toStringTag, { value: "Module" }));
const Header = ({ breadcrumbItems }) => {
  const { auth } = usePage().props;
  const role = auth?.user?.role || "guest";
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (role === "guest") {
      setMenuOpen(false);
    }
  }, [role]);
  useEffect(() => {
    router.on("navigate", () => setMenuOpen(false));
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: "bg-white/90 backdrop-blur shadow-sm fixed top-0 w-full z-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-2 py-4 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center", children: [
        /* @__PURE__ */ jsx("img", { src: "/logo-2.png", alt: "Logo", className: "h-10 w-auto md:mr-2" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-sm sm:text-2xl font-extrabold tracking-tight text-gray-900", children: [
          "Gjej-",
          /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "Prone" }),
          ".com"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden sm:flex items-center gap-4 text-sm sm:text-base", children: [
        role === "guest" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/login",
              className: "px-2 py-1.5 text-gray-700 hover:text-blue-400 transition",
              children: "Hyr"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/register",
              className: "px-4 py-1.5 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition shadow-sm",
              children: "Regjistrohu"
            }
          )
        ] }),
        role === "admin" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/dashboard",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Paneli"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/properties",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Pronat"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/property/requests",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Kërkesat e blerësve"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/users",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Përdoruesit"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/logs",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Gjurmim"
            }
          )
        ] }),
        (role === "agency" || role === "bank" || role === "individual" || role === "developer") && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/properties",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Pronat e mia"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/property/requests/all",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Kërkesat e blerësve"
            }
          )
        ] }),
        (role === "user" || role === "investor" || role === "business") && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/listed-properties",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Kërko pronë"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/property/requests",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Kërkesat e pronave"
            }
          )
        ] }),
        role !== "guest" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/profile",
              className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
              children: "Profili"
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: "/logout", method: "post", as: "button", children: "Dil" })
        ] })
      ] }),
      role === "guest" && /* @__PURE__ */ jsxs("div", { className: "sm:hidden", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/login",
            className: "px-1 py-1.5 text-gray-700 text-sm hover:text-blue-400 transition",
            children: "Hyr"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/register",
            className: "px-4 py-1.5 bg-blue-400 text-sm text-white rounded-md hover:bg-blue-600 transition shadow-sm",
            children: "Regjistrohu"
          }
        )
      ] }),
      role !== "guest" && /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-blue-400 hover:border-blue-400",
          onClick: () => setMenuOpen(!menuOpen),
          children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "data-slot": "icon", "aria-hidden": "true", className: "size-6 in-aria-expanded:hidden", children: menuOpen ? /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            }
          ) : /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              d: "M3 5h14M3 10h14M3 15h14",
              clipRule: "evenodd"
            }
          ) })
        }
      )
    ] }),
    menuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-white shadow-lg border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1", children: [
      role === "admin" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/dashboard",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Paneli"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/admin/properties",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Pronat"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/property/requests",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Kërkesat e blerësve"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/admin/users",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Përdoruesit"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/admin/logs",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Gjurmim"
          }
        )
      ] }),
      (role === "agency" || role === "bank" || role === "individual" || role === "developer") && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/properties",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Pronat e mia"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/property/requests/all",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Kërkesat e blerësve"
          }
        )
      ] }),
      (role === "user" || role === "investor" || role === "business") && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/listed-properties",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Kërko pronë"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/property/requests",
            className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
            children: "Kërkesat e pronave"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/profile",
          className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
          children: "Profili"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/logout",
          method: "post",
          as: "button",
          className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50",
          children: "Dil"
        }
      )
    ] }) })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-white border-t border-gray-200 mt-auto", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Kontakt" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "✉️ gjejprone@gmail.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Na Ndiqni" }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-4 text-gray-600", children: /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/virtu.nex/", className: "hover:text-blue-600 transition", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z"
                }
              ),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3.5", strokeWidth: "1.5", stroke: "currentColor", fill: "none" })
            ]
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 mt-8 pt-4 text-center text-gray-500 text-sm", children: [
      /* @__PURE__ */ jsx("p", { children: "© 2025 gjej-prone.com — Të gjitha të drejtat e rezervuara." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/terms", children: "Termat dhe Kushtet" }),
        /* @__PURE__ */ jsx(Link, { href: "/privacy", children: "Politika e Privatësisë" })
      ] })
    ] })
  ] }) });
};
const Profile = ({ user }) => {
  const profileForm = useForm({
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    company_name: user.company_name || "",
    birth_date: user.birth_date || "",
    address: user.address || "",
    notifications: user.notifications ?? true,
    // Company/Agency fields
    nipt: user.nipt || "",
    company_phone_number: user.company_phone_number || "",
    years_experience: user.years_experience || "",
    company_description: user.company_description || "",
    logo_path: user.logo_path || "",
    // Developer fields
    finished_projects: user.finished_projects || 0,
    website: user.website || "",
    // Investor/Business fields
    year_budget: user.year_budget || "",
    preferred_locations: user.preferred_locations || "",
    logo: null
    // for file upload
  });
  const profileData = profileForm.data;
  const handleChangeProfile = (e) => {
    const { name, type, checked, value } = e.target;
    profileForm.setData(name, type === "checkbox" ? checked : value);
  };
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    profileForm.post("/profile/update", {
      forceFormData: true,
      _method: "put"
    });
  };
  const passwordForm = useForm({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });
  const passwordData = passwordForm.data;
  const handleChangePassword = (e) => {
    const { name, type, checked, value } = e.target;
    passwordForm.setData(name, type === "checkbox" ? checked : value);
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    passwordForm.put("/profile/password/update", {
      onFinish: () => {
        passwordForm.reset(
          "current_password",
          "new_password",
          "new_password_confirmation"
        );
      }
    });
  };
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Jeni i sigurt?",
      text: "Fshirja e llogarisë tuaj mund të zgjasë deri në 7 ditë. Ky veprim nuk mund të zhbëhet!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Po, fshije llogarinë!",
      cancelButtonText: "Anulo"
    }).then((result) => {
      if (result.isConfirmed) {
        profileForm.delete("/delete-account", {
          onSuccess: () => {
            Swal.fire(
              "Fshirë!",
              "Llogaria juaj është shënuar për fshirje.",
              "success"
            );
          }
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-6", children: "Profili im" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitProfile, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Emri" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "name",
              value: profileData.name,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Mbiemri" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "surname",
              value: profileData.surname,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.surname && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.surname })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "email",
              value: profileData.email,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Numri i telefonit" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              name: "phone_number",
              value: profileData.phone_number,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.phone_number && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.phone_number })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Data e lindjes" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              name: "birth_date",
              value: profileData.birth_date,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.birth_date && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.birth_date })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Adresa" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "address",
              value: profileData.address,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.address && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Emri i kompanisë (opsionale)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "company_name",
              value: profileData.company_name,
              onChange: handleChangeProfile,
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.company_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.company_name })
        ] }),
        ["agency", "developer", "bank"].includes(user.role?.name) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "NIPT" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "nipt",
                value: profileData.nipt,
                onChange: handleChangeProfile,
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.nipt && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.nipt })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Numri i Kompanisë/Agjencisë" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "company_phone_number",
                value: profileData.company_phone_number,
                onChange: handleChangeProfile,
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.company_phone_number && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.company_phone_number })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Vitet e Përvojës" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "years_experience",
                value: profileData.years_experience,
                onChange: handleChangeProfile,
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.years_experience && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.years_experience })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Logo e Kompanisë" }),
            profileData.logo_path && /* @__PURE__ */ jsx("div", { className: "mt-2 mb-2", children: /* @__PURE__ */ jsx("img", { src: `/storage/${profileData.logo_path}`, alt: "Logo", className: "h-20 w-20 object-cover rounded border" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    profileForm.setData("logo", file);
                  }
                },
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.logo && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.logo })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Përshkrim i Kompanisë" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                name: "company_description",
                value: profileData.company_description,
                onChange: handleChangeProfile,
                rows: "3",
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.company_description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.company_description })
          ] })
        ] }),
        user.role?.name === "developer" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Numri i Projekteve të Përfunduara" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "finished_projects",
                value: profileData.finished_projects,
                onChange: handleChangeProfile,
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.finished_projects && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.finished_projects })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Faqja Zyrtare (Website)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                name: "website",
                value: profileData.website,
                onChange: handleChangeProfile,
                placeholder: "https://example.com",
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.website && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.website })
          ] })
        ] }),
        user.role?.name === "investor" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Buxheti i Përafërt Vjetor (€)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "year_budget",
                value: profileData.year_budget,
                onChange: handleChangeProfile,
                placeholder: "100000",
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.year_budget && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.year_budget })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Zonat e Preferuara" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "preferred_locations",
                value: profileData.preferred_locations,
                onChange: handleChangeProfile,
                placeholder: "Tiranë, Durrës, Vlorë",
                className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            profileForm.errors.preferred_locations && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.preferred_locations })
          ] })
        ] }),
        user.role?.name === "business" && /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Zonat e Preferuara për Hapësira Komerciale" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "preferred_locations",
              value: profileData.preferred_locations,
              onChange: handleChangeProfile,
              placeholder: "Tiranë, Durrës, Vlorë",
              className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }
          ),
          profileForm.errors.preferred_locations && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: profileForm.errors.preferred_locations })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            name: "notifications",
            checked: profileData.notifications,
            onChange: handleChangeProfile,
            className: "h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
          }
        ),
        /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-700", children: "Dua të marr njoftime me email" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: profileForm.processing,
          className: "mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition",
          children: "Ruaj Ndryshimet"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitPassword, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t pt-4 space-y-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Ndrysho fjalëkalimin" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "current_password",
            value: passwordData.current_password,
            onChange: handleChangePassword,
            placeholder: "Fjalëkalimi aktual",
            className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          }
        ),
        passwordForm.errors.current_password && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: passwordForm.errors.current_password }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "new_password",
            value: passwordData.new_password,
            onChange: handleChangePassword,
            placeholder: "Fjalëkalimi i ri",
            className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          }
        ),
        passwordForm.errors.new_password && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: passwordForm.errors.new_password }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "new_password_confirmation",
            value: passwordData.new_password_confirmation,
            onChange: handleChangePassword,
            placeholder: "Konfirmo fjalëkalimin e ri",
            className: "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: passwordForm.processing,
          className: "mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition",
          children: "Ruaj Ndryshimet"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: handleDeleteAccount,
        className: "mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition",
        children: "Fshij Llogarinë"
      }
    )
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
const PropertyItem$1 = ({
  id,
  city,
  street,
  surface,
  total_rooms,
  total_bathrooms,
  total_balconies,
  verified,
  total_floors,
  saved,
  views,
  floor_number,
  year_built,
  description,
  price,
  currency,
  type_of_sale,
  virtual_tour,
  rivleresim,
  combo_package,
  property_type,
  image_paths = [],
  canEdit = false,
  canDelete = false,
  onEdit = null,
  onDelete = null,
  sold,
  onToggleSold = null
}) => {
  const [isSaved, setIsSaved] = React.useState(saved);
  const PROPERTY_TYPE_LABELS2 = {
    residential: "Rezidenciale",
    commercial: "Komerciale",
    land: "Tokë",
    others: "Të tjera"
  };
  const image = image_paths.length > 0 ? `/storage/${image_paths[0].path}` : "/placeholder/property.jpg";
  let badge = null;
  const handleSave = (id2) => {
    router.post(`/properties/${id2}/toggleSave`, {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setIsSaved(!isSaved);
      },
      onError: () => {
        toast.error("Diçka shkoi keq!");
      }
    });
  };
  if (combo_package || virtual_tour && rivleresim) badge = { text: "Platinum", bg: "bg-purple-600", textColor: "text-white" };
  else if (virtual_tour) badge = { text: "Gold", bg: "bg-yellow-500", textColor: "text-black" };
  else if (rivleresim) badge = { text: "Silver", bg: "bg-gray-400", textColor: "text-white" };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: image,
          alt: "Pronë",
          className: "w-full h-56 object-cover"
        }
      ),
      /* @__PURE__ */ jsxs(
        "span",
        {
          className: "absolute top-3 left-3 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg",
          children: [
            price.toLocaleString(),
            " ",
            currency
          ]
        }
      ),
      canEdit && /* @__PURE__ */ jsx("span", { className: `absolute top-15 left-3 ${verified ? "bg-green-600" : "bg-red-700"} backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg`, children: verified ? "E verifikuar" : "Jo e verifikuar" }),
      badge && /* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 overflow-hidden w-24 h-24`, children: /* @__PURE__ */ jsx("span", { className: `${badge.bg} ${badge.textColor} text-md font-bold rotate-45 absolute -left-8 w-40 ps-15 text-center shadow-lg`, children: badge.text }) }),
      sold === true && /* @__PURE__ */ jsx("span", { className: "absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg z-10", children: "E Shitur" }),
      views > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 right-0 flex items-center gap-2 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg", children: [
        /* @__PURE__ */ jsx("span", { children: views }),
        /* @__PURE__ */ jsx(Eye, { size: 16 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 p-5 space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(Tag, { size: 16, className: "text-gray-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm uppercase text-gray-600", children: type_of_sale === "sale" ? "Per Shitje" : "Per Qira" })
        ] }),
        !canEdit && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleSave(id),
            className: "hidden md:block text-gray-400 hover:text-yellow-400 transition-colors p-1",
            children: /* @__PURE__ */ jsx(Bookmark, { size: 36, fill: isSaved ? "#facc15" : "none" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 line-clamp-1", children: PROPERTY_TYPE_LABELS2[property_type] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm line-clamp-1", children: [
          street,
          ", ",
          city
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-gray-600 text-sm mt-2", children: [
        total_rooms > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Bed, { size: 16 }),
          " ",
          total_rooms,
          " dhoma"
        ] }),
        total_bathrooms > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Bath, { size: 16 }),
          " ",
          total_bathrooms,
          " banjo"
        ] }),
        total_balconies > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Home, { size: 16 }),
          " ",
          total_balconies,
          " ballkone"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Maximize2, { size: 16 }),
          " ",
          surface,
          " m²"
        ] }),
        floor_number != null && floor_number !== 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Layers, { size: 16 }),
          " Kati ",
          floor_number,
          "/",
          total_floors
        ] }),
        year_built && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Building2, { size: 16 }),
          " Ndërtuar: ",
          year_built
        ] })
      ] }),
      description && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm line-clamp-3", children: description }),
      (canEdit || canDelete) && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
        canEdit && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onEdit?.(id),
            className: "flex-1 text-sm border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition",
            children: "Ndrysho"
          }
        ),
        canDelete && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onDelete?.(id),
            className: "flex-1 text-sm border border-red-300 text-red-600 rounded-lg py-2 hover:bg-red-50 transition",
            children: "Fshi"
          }
        ),
        canEdit && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onToggleSold?.(id, !sold),
            className: `flex-1 text-sm border ${sold ? "border-green-300 text-green-600 rounded-lg py-2 hover:bg-green-50 transition" : "border-blue-300 text-blue-600 rounded-lg py-2 hover:bg-blue-50 transition"}`,
            children: sold ? "Shëno si e Disponueshme" : "Shëno si e Shitur"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: `/properties/${id}`,
          className: "block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition",
          children: "Shiko detajet"
        }
      ) })
    ] })
  ] });
};
const PropertyFilter = ({
  filters,
  setFilters,
  onApply,
  users = []
}) => {
  const [open, setOpen] = useState(false);
  const update = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const subTypeProperties2 = {
    Rezidenciale: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    Komerciale: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    Tokë: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    Tjera: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const toggleArray = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      };
    });
  };
  const loadUserOptions = (inputValue, callback) => {
    const filteredUsers = users.filter(
      (user) => `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
    ).map((user) => ({
      value: user.id,
      label: `${user.name} ${user.surname}`
    }));
    callback(filteredUsers);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow px-4 pb-4 rounded-xl mb-4", children: [
    /* @__PURE__ */ jsx("h4", { className: "pb-4 text-2xl font-bold", children: "Kërko" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Qytet, zonë, rrugë...",
          value: filters.search,
          onChange: (e) => update("search", e.target.value),
          className: "flex-grow border rounded-lg p-3"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onApply,
          className: "px-5 bg-blue-500 text-white rounded-lg",
          children: "Kërko"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(true),
        className: "mt-3 underline text-sm",
        children: "Më shumë filtra"
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-4", children: "Filtra të Avancuar" }),
      users.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold", children: "Zgjidh Përdoruesin" }),
        /* @__PURE__ */ jsx(
          AsyncSelect,
          {
            cacheOptions: true,
            loadOptions: loadUserOptions,
            defaultOptions: users.map((user) => ({
              value: user.id,
              label: `${user.name} ${user.surname}`
            })),
            value: filters.user_id ? users.find((user) => user.id === filters.user_id) ? { value: filters.user_id, label: `${users.find((user) => user.id === filters.user_id).name} ${users.find((user) => user.id === filters.user_id).surname}` } : null : null,
            onChange: (e) => update("user_id", e.target.value),
            placeholder: "Kërko përdoruesin...",
            classNamePrefix: "react-select"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold", children: "Intervali i Çmimit" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Min",
              value: filters.min_price,
              onChange: (e) => update("min_price", e.target.value),
              className: "border rounded-lg p-2 w-full"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Max",
              value: filters.max_price,
              onChange: (e) => update("max_price", e.target.value),
              className: "border rounded-lg p-2 w-full"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold", children: "Monedha" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.currency,
            onChange: (e) => update("currency", e.target.value),
            className: "w-full border rounded-lg p-2 mt-1",
            children: [
              /* @__PURE__ */ jsx("option", { value: "EUR", children: "EUR" }),
              /* @__PURE__ */ jsx("option", { value: "ALL", children: "ALL" }),
              /* @__PURE__ */ jsx("option", { value: "USD", children: "USD" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold", children: "Lloji" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.sale_type,
            onChange: (e) => update("sale_type", e.target.value),
            className: "w-full border rounded-lg p-2 mt-1",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Çdo" }),
              /* @__PURE__ */ jsx("option", { value: "sale", children: "Shitje" }),
              /* @__PURE__ */ jsx("option", { value: "rent", children: "Qira" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold", children: "Lloji i Pronës" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 mt-2", children: Object.entries(subTypeProperties2).map(([category, subTypes]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-bold capitalize", children: category }),
          subTypes.map((subType) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.types?.includes(subType.value),
                onChange: () => toggleArray("types", subType.value)
              }
            ),
            subType.label
          ] }, subType.value))
        ] }, category)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold", children: "Karakteristika" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.elevator,
                onChange: (e) => update("elevator", e.target.checked)
              }
            ),
            "Ashensor"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.mortgage,
                onChange: (e) => update("mortgage", e.target.checked)
              }
            ),
            "Hipotekë"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.mobilim,
                onChange: (e) => update("mobilim", e.target.checked)
              }
            ),
            "Mobilim"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.parkim,
                onChange: (e) => update("parkim", e.target.checked)
              }
            ),
            "Parkim"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min dhoma",
            value: filters.rooms_min,
            onChange: (e) => update("rooms_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max dhoma",
            value: filters.rooms_max,
            onChange: (e) => update("rooms_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min banjo",
            value: filters.bathrooms_min,
            onChange: (e) => update("bathrooms_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max banjo",
            value: filters.bathrooms_max,
            onChange: (e) => update("bathrooms_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min sipërfaqe m²",
            value: filters.surface_min,
            onChange: (e) => update("surface_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max sipërfaqe m²",
            value: filters.surface_max,
            onChange: (e) => update("surface_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min ballkone",
            value: filters.balconies_min,
            onChange: (e) => update("balconies_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max ballkone",
            value: filters.balconies_max,
            onChange: (e) => update("balconies_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(false),
            className: "border px-4 py-2 rounded-lg",
            children: "Mbyll"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setOpen(false);
              onApply();
            },
            className: "bg-blue-600 text-white px-4 py-2 rounded-lg",
            children: "Apliko filtrat"
          }
        )
      ] })
    ] }) })
  ] });
};
const Pagination = ({ links }) => {
  if (!links || links.length === 0) return null;
  const renderPageLinks = () => {
    const visibleLinks = [];
    const totalLinks = links.length;
    const currentPage = links.findIndex((link) => link.active);
    links.forEach((link, index) => {
      if (index === 0 || // First page
      index === totalLinks - 1 || // Last page
      index >= currentPage - 2 && index <= currentPage + 2) {
        visibleLinks.push(
          /* @__PURE__ */ jsx("li", { children: link.url ? /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              className: `px-4 py-2 border rounded ${link.active ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            }
          ) : /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-4 py-2 border rounded text-gray-400",
              dangerouslySetInnerHTML: { __html: link.label }
            }
          ) }, index)
        );
      } else if ((index === currentPage - 3 || index === currentPage + 3) && !visibleLinks.some((item) => item.key === `ellipsis-${index}`)) {
        visibleLinks.push(
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "px-4 py-2 border rounded text-gray-400", children: "..." }) }, `ellipsis-${index}`)
        );
      }
    });
    return visibleLinks;
  };
  return /* @__PURE__ */ jsx("nav", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsx("ul", { className: "inline-flex items-center space-x-2", children: renderPageLinks() }) });
};
const Properties$1 = ({ properties }) => {
  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    currency: "EUR",
    sale_type: "",
    types: [],
    elevator: false,
    mortgage: false,
    rooms_min: "",
    rooms_max: "",
    bathrooms_min: "",
    bathrooms_max: "",
    surface_min: "",
    surface_max: "",
    balconies_min: "",
    balconies_max: ""
  });
  const reload = () => {
    router.get("/properties", filters, {
      preserveState: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1", children: [
    /* @__PURE__ */ jsx(
      PropertyFilter,
      {
        filters,
        setFilters,
        onApply: reload
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid justify-items-center p-4", children: /* @__PURE__ */ jsx(
      Link,
      {
        href: "/properties/create",
        className: "px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600",
        children: "Shto një pronë"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Pronat e listuara aktualisht" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: properties.data.map((p) => /* @__PURE__ */ jsx(
        PropertyItem$1,
        {
          ...p,
          image_paths: p.images,
          canEdit: true,
          canDelete: true,
          onEdit: () => router.get(`/properties/${p.id}/edit`),
          onDelete: () => {
            Swal.fire({
              title: "A jeni i sigurt?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#dc2626"
            }).then((r) => {
              if (!r.isConfirmed) return;
              router.post(`/properties/${p.id}/delete`);
            });
          },
          onToggleSold: () => {
            router.put(`/properties/${p.id}/toggle-sold`);
          }
        },
        p.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Pagination, { links: properties.links }) })
    ] })
  ] });
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Properties$1
}, Symbol.toStringTag, { value: "Module" }));
const PROPERTY_TYPE_LABELS$1 = {
  residential: "Rezidenciale",
  commercial: "Komerciale",
  land: "Tokë",
  others: "Të tjera"
};
const TRANSACTION_TYPE_LABELS$1 = {
  sale: "Shitje",
  rent: "Qira"
};
const subTypeProperties$1 = {
  residential: [
    { value: "apartment", label: "Apartament" },
    { value: "house", label: "Shtëpi Private" },
    { value: "kategori te tjera", label: "Kategori të tjera" }
  ],
  commercial: [
    { value: "office", label: "Zyrë" },
    { value: "warehouse", label: "Magazinë" }
  ],
  land: [
    { value: "agricultural", label: "Tokë Bujqësore" },
    { value: "truall", label: "Truall" }
  ],
  others: [
    { value: "parkim", label: "Parkim" },
    { value: "kategori_te_tjera", label: "Kategori të tjera" }
  ]
};
const PropertyDetails = ({ property, isAdmin }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [MapSection, setMapSection] = useState(null);
  const [pageUrl, setPageUrl] = useState("");
  useEffect(() => {
    import("./assets/PropertyMapSection-CGq8x_nn.js").then((mod) => {
      setMapSection(() => mod.default);
    });
    setPageUrl(window.location.href);
  }, []);
  useEffect(() => {
    const allImages = [
      ...property.images ?? [],
      ...property.documents?.filter((doc) => doc.file_type === "floor_plan")?.map((doc) => ({
        id: doc.id,
        path: doc.path,
        isFloorPlan: true
      })) ?? []
    ];
    setPreviewImages(allImages);
  }, [property.images, property.documents]);
  const floorPlans = property.documents?.filter((doc) => doc.file_type === "floor_plan") ?? [];
  const hipotekeFile = property.documents?.filter((doc) => doc.file_type === "hipoteka") ?? [];
  const images = property.images ?? [];
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, [images.length]);
  const typeLabel = PROPERTY_TYPE_LABELS$1[property.property_type] ?? property.property_type;
  const ogTitle = `${typeLabel} në ${property.city} — ${Number(property.price).toLocaleString()} ${property.currency}`;
  const ogDesc = property.description ? property.description.substring(0, 200) : `${typeLabel} për ${TRANSACTION_TYPE_LABELS$1[property.type_of_sale] ?? ""} në ${property.city}.`;
  const ogImage = images[0] ? `/storage/${images[0].path}` : "/logo-2.png";
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-10 space-y-12", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${ogTitle} | Gjej-Prone` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: ogDesc }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: ogTitle }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogDesc }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: ogTitle }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: ogDesc }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative w-full h-[480px] overflow-hidden rounded-2xl shadow-lg cursor-pointer",
          onClick: () => setLightbox(true),
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${images[current]?.path}`,
                className: "w-full h-full object-cover",
                alt: "Property"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "absolute top-4 left-4 bg-black/70 text-white px-4 py-1 rounded-full text-sm uppercase tracking-wide", children: PROPERTY_TYPE_LABELS$1[property.property_type] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3 overflow-x-auto", children: images.map((img, index) => /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${img.path}`,
          onClick: () => setCurrent(index),
          className: `w-24 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${index === current ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`,
          alt: "Thumbnail"
        },
        img.id
      )) }),
      property.virtual_tour_link && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Vizitë Virtuale" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-[600px] rounded-2xl overflow-hidden shadow", children: /* @__PURE__ */ jsx("iframe", { src: property.virtual_tour_link, className: "w-full h-full", allowFullScreen: true }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: PROPERTY_TYPE_LABELS$1[property.property_type] }),
          (property.street || property.city) && /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mt-1", children: [
            property.street,
            property.street && property.city ? ", " : "",
            property.city
          ] })
        ] }),
        isAdmin && (property.tracking_phone || property.tracking_email) && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-2xl p-6 border border-blue-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Të Dhëna për Gjurmim (Vetëm Admin)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            property.tracking_phone && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Telefon për Gjurmim:" }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-medium", children: property.tracking_phone })
            ] }),
            property.tracking_email && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Email për Gjurmim:" }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-medium", children: property.tracking_email })
            ] })
          ] })
        ] }),
        property.description && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Përshkrimi" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: property.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsx(
            Detail$1,
            {
              label: "Lloji i pronës",
              value: subTypeProperties$1[property.property_type]?.find(
                (o) => o.value === property.property_category
              )?.label
            }
          ),
          /* @__PURE__ */ jsx(
            Detail$1,
            {
              label: "Hipotekë",
              value: /* @__PURE__ */ jsxs(Fragment, { children: [
                `${property.hipoteke ? "Po" : "Jo"} ${hipotekeFile.length > 0 ? "(Dokumenti i ngarkuar)" : "(Dokumenti i pa ngarkuar)"}`,
                isAdmin && hipotekeFile.length > 0 && /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/admin/property/download-hipoteka/${hipotekeFile[0].id}`,
                    className: "ml-2 text-blue-600 underline",
                    download: true,
                    children: "Shkarko"
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsx(Detail$1, { label: "Ashensor", value: property.ashensor ? "Po" : "Jo" }),
          /* @__PURE__ */ jsx(Detail$1, { label: "Parkim", value: property.parkim ? "Po" : "Jo" }),
          /* @__PURE__ */ jsx(Detail$1, { label: "Mobiluar", value: property.mobilim ? "Po" : "Jo" }),
          /* @__PURE__ */ jsx(Detail$1, { label: "Sipërfaqe", value: property.surface ? `${property.surface} m²` : null }),
          property.total_rooms > 0 && /* @__PURE__ */ jsx(Detail$1, { label: "Dhoma", value: property.total_rooms }),
          property.total_bathrooms > 0 && /* @__PURE__ */ jsx(Detail$1, { label: "Banjo", value: property.total_bathrooms }),
          property.total_balconies > 0 && /* @__PURE__ */ jsx(Detail$1, { label: "Ballkone", value: property.total_balconies }),
          property.floor_number != null && property.floor_number !== 0 && /* @__PURE__ */ jsx(Detail$1, { label: "Kati", value: property.floor_number }),
          property.total_floors > 0 && /* @__PURE__ */ jsx(Detail$1, { label: "Kate totale", value: property.total_floors }),
          property.year_built && /* @__PURE__ */ jsx(Detail$1, { label: "Viti ndërtimit", value: property.year_built }),
          /* @__PURE__ */ jsx(Detail$1, { label: "Transaksioni", value: TRANSACTION_TYPE_LABELS$1[property.type_of_sale] })
        ] }),
        floorPlans.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Planimetria" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: floorPlans.map((plan) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "group bg-white rounded-xl shadow overflow-hidden cursor-pointer",
              onClick: () => {
                const index = previewImages.findIndex(
                  (img) => img.id === plan.id && img.isFloorPlan
                );
                if (index >= 0) {
                  setPreviewIndex(index);
                  setShowPreview(true);
                }
              },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${plan.path}`,
                    alt: "Plani i katit",
                    className: "w-full h-64 object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "p-3 text-center text-sm text-gray-600", children: "Shiko planin" })
              ]
            },
            plan.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Çmimi" }),
        /* @__PURE__ */ jsxs("p", { className: "text-4xl font-bold text-blue-600", children: [
          Number(property.price).toLocaleString(),
          " ",
          property.currency,
          property.price_negotiable && /* @__PURE__ */ jsx("span", { className: "text-lg", children: " (i negociueshëm)" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Vendndodhja" }),
      MapSection ? /* @__PURE__ */ jsx(MapSection, { lat: property.latitude, lng: property.longitude }) : /* @__PURE__ */ jsx("div", { className: "w-full h-[320px] bg-gray-100 rounded-2xl animate-pulse" })
    ] }),
    property.owner?.phone_number && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-2xl p-6 space-y-4 max-w-md", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Kontakto Shitësin" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://wa.me/${property.owner.phone_number}?text=${encodeURIComponent(
            `Përshëndetje, jam i interesuar për pronën tuaj.

${pageUrl}`
          )}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex-1 text-center bg-green-600 text-white py-2 rounded-lg",
          children: "WhatsApp"
        }
      ) })
    ] }),
    lightbox && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 bg-black/90 z-50 flex items-center justify-center",
        onClick: () => setLightbox(false),
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${images[current]?.path}`,
              className: "max-h-[90vh] max-w-[90vw] object-contain",
              alt: "Fullscreen"
            }
          ),
          images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "absolute left-7 text-white text-7xl font-bold",
                onClick: (e) => {
                  e.stopPropagation();
                  setCurrent((current - 1 + images.length) % images.length);
                },
                children: "‹"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "absolute right-7 text-white text-7xl font-bold",
                onClick: (e) => {
                  e.stopPropagation();
                  setCurrent((current + 1) % images.length);
                },
                children: "›"
              }
            )
          ] })
        ]
      }
    ),
    showPreview && previewImages.length > 0 && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50",
        onClick: () => setShowPreview(false),
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${previewImages[previewIndex].path}`,
              alt: "",
              className: "max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-lg"
            }
          ),
          previewImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "absolute left-4 text-white text-3xl font-bold",
                onClick: (e) => {
                  e.stopPropagation();
                  setPreviewIndex((previewIndex - 1 + previewImages.length) % previewImages.length);
                },
                children: "‹"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "absolute right-4 text-white text-3xl font-bold",
                onClick: (e) => {
                  e.stopPropagation();
                  setPreviewIndex((previewIndex + 1) % previewImages.length);
                },
                children: "›"
              }
            )
          ] })
        ]
      }
    )
  ] });
};
const Detail$1 = ({ label, value }) => {
  if (!value && value !== 0) return null;
  if (value === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-xl text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-gray-500", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: value })
  ] });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PropertyDetails
}, Symbol.toStringTag, { value: "Module" }));
const Terms = () => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6", children: "Termat dhe Kushtet" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Mirësevini në platformën tonë për shërbime auto. Duke përdorur këtë platformë, ju pranoni këto Terma dhe Kushtet e përdorimit." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "1. Llogaria e Përdoruesit" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ju duhet të jeni të moshës së ligjshme për të krijuar një llogari. Ju pranoni të siguroni informacione të sakta dhe të përditësuara gjatë regjistrimit." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "2. Siguria e Llogarisë" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ju jeni përgjegjës për mbajtjen e fjalëkalimit tuaj të sigurt dhe për çdo aktivitet të kryer në llogarinë tuaj. Nuk jemi përgjegjës për përdorim të paautorizuar nëse informacioni juaj nuk mbahet i sigurt." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "3. Përdorimi i Platformës" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ju pranoni të përdorni platformën vetëm për qëllime ligjore dhe të shmangni çdo veprim të paligjshëm, përfshirë spamming, piraterinë, ose sulmet ndaj sistemit." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "4. Privatësia dhe të Dhënat" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "Të dhënat tuaja personale përdoren vetëm për ofrimin e shërbimeve tona. Ju mund të lexoni më shumë në ",
      /* @__PURE__ */ jsx(Link, { href: "/privacy", className: "text-blue-600 underline", children: "Politikën e Privatësisë" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "5. Pronësia Intelektuale" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Të gjitha të drejtat mbi markat, logot dhe materialet e platformës janë pronë e kompanisë sonë. Nuk lejohet kopjimi ose shpërndarja pa leje." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "6. Përgjegjësia" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'Platforma ofrohet "as is". Nuk jemi përgjegjës për dëme të drejtpërdrejta apo indirekte që mund të ndodhin nga përdorimi i saj.' }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "7. Ndërprerja e Llogarisë" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ne mund të pezullojmë ose fshijmë llogaritë që shkelin këto Terma dhe Kushtet pa paralajmërim paraprak." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "8. Ndryshimet në Termat dhe Kushtet" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ne mund të ndryshojmë këto Terma dhe Kushtet në çdo kohë. Përdoruesit duhet të kontrollojnë këtë faqe periodikisht për ndryshime." }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "9. Ligji dhe Juridiksioni" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Këto Terma dhe Kushtet rregullohen nga ligjet e Republikës së Shqipërisë. Çdo mosmarrëveshje do të zgjidhet në gjykatat përkatëse në Shqipëri." })
  ] });
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Terms
}, Symbol.toStringTag, { value: "Module" }));
const inputBase$3 = "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all placeholder-gray-400";
const labelBase$3 = "block text-sm font-medium text-gray-700 mb-1";
function AddProperty({ users = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: "",
    type_of_sale: "",
    property_type: "",
    property_category: "",
    city: "",
    street: "",
    surface: "",
    price: "",
    ashensor: false,
    hipoteke: false,
    floor_plan: [],
    currency: "EUR",
    description: "",
    total_rooms: "",
    total_bathrooms: "",
    total_balconies: "",
    floor_number: "",
    total_floors: "",
    year_built: "",
    latitude: "",
    longitude: "",
    virtual_tour_link: "",
    images: [],
    virtual_tour: false,
    rivleresim: false,
    combo_package: false,
    virtual_tour_done: false,
    rivleresim_done: false,
    hipoteke_file: [],
    verified: false,
    mobilim: false,
    parkim: false,
    price_negotiable: false,
    tracking_phone: "",
    tracking_email: ""
  });
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [selectedBashki, setSelectedBashki] = useState(null);
  const [images, setImages] = useState([]);
  const MAX_FILES = 10;
  const MAX_SIZE_MB = 5;
  const saleOptions = [
    { value: "", label: "Zgjidh Llojin e Transaksionit" },
    { value: "sale", label: "Shitje" },
    { value: "rent", label: "Qira" }
  ];
  function handleImages(files) {
    const arr = Array.from(files);
    const newImages = [];
    arr.forEach((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        return toast.error(`Foto "${file.name}" është më e madhe se ${MAX_SIZE_MB}MB`);
      }
      newImages.push({
        file,
        preview: URL.createObjectURL(file)
      });
    });
    const combined = [...images, ...newImages];
    if (combined.length > MAX_FILES) {
      return toast.error(`Maksimumi lejohet ${MAX_FILES} foto`);
    }
    setImages(combined);
    setData("images", combined.map((item) => item.file));
    toast.success("Fotot u ngarkuan!");
  }
  function removeImage(index) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setData("images", updated.map((item) => item.file));
  }
  const typeOfProperties = [
    { value: "residential", label: "Rezidenciale" },
    { value: "commercial", label: "Komerciale" },
    { value: "land", label: "Tokë" },
    { value: "others", label: "Të tjera" }
  ];
  const subTypeProperties2 = {
    residential: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    commercial: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    land: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    others: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const dynamicFieldsMap = {
    apartment: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 3" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 1" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 2" },
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 5" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 2008" }
    ],
    house: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 5" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 2" },
      { value: "total_floors", type: "number", label: "Numri i Kateve të Ndërtimit", placeholder: "p.sh. 3" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 1995" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 1" }
    ],
    office: [{ value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 2" }]
  };
  const renderDynamicFields = (selectedSubtype, data2, setData2) => {
    if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
      return null;
    }
    return dynamicFieldsMap[selectedSubtype].map((field) => {
      const isYearBuilt = field.value === "year_built";
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$3, children: field.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: field.type,
            value: data2[field.value] || "",
            placeholder: field.placeholder || "",
            onChange: (e) => setData2(field.value, e.target.value),
            ...isYearBuilt ? { min: 1900, max: 2050 } : {},
            className: inputBase$3
          }
        ),
        /* @__PURE__ */ jsx(ErrorText, { field: field.value, errors })
      ] }, field.value);
    });
  };
  const loadUserOptions = (inputValue, callback) => {
    const filteredUsers = users.filter(
      (user) => `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
    ).map((user) => ({
      value: user.id,
      label: `${user.name} ${user.surname}`
    }));
    callback(filteredUsers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/properties", {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "pt-5 bg-gray-50 min-h-screen", children: [
    /* @__PURE__ */ jsx(Box, { sx: { mx: { xs: 2, sm: 10, md: 20 }, mt: 2, mb: 3 }, children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outlined",
        onClick: () => router.get("/admin/properties"),
        children: "← Kthehu tek Pronat"
      }
    ) }),
    /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-1 pb-20", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-5 pt-4 text-gray-800", children: "Shto Pronë të Re (Admin)" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-8 rounded-2xl shadow-lg border border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Zgjidh Përdoruesin (Pronari) *" }),
          /* @__PURE__ */ jsx(
            AsyncSelect,
            {
              cacheOptions: true,
              loadOptions: loadUserOptions,
              defaultOptions: users.map((user) => ({
                value: user.id,
                label: `${user.name} ${user.surname}`
              })),
              value: data.user_id ? users.find((user) => user.id === data.user_id) ? {
                value: data.user_id,
                label: `${users.find((user) => user.id === data.user_id).name} ${users.find((user) => user.id === data.user_id).surname}`
              } : null : null,
              onChange: (option) => setData("user_id", option ? option.value : ""),
              placeholder: "Kërko përdoruesin...",
              classNamePrefix: "react-select",
              isClearable: true
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "user_id", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Lloji i Transaksionit *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "type_of_sale",
                value: saleOptions.find((o) => o.value === data.type_of_sale) || null,
                onChange: (selected) => setData("type_of_sale", selected ? selected.value : ""),
                options: saleOptions,
                placeholder: "Zgjidh llojin",
                classNamePrefix: "react-select"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "type_of_sale", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Lloji i Pronës *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "property_type",
                value: typeOfProperties.find((o) => o.value === data.property_type) || null,
                onChange: (selected) => {
                  setData("property_type", selected ? selected.value : "");
                  setData("property_category", "");
                },
                options: typeOfProperties,
                placeholder: "Zgjidh llojin",
                classNamePrefix: "react-select"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "property_type", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Kategoria e Pronës *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "property_category",
                value: data.property_type ? subTypeProperties2[data.property_type].find((o) => o.value === data.property_category) || null : null,
                onChange: (selected) => setData("property_category", selected ? selected.value : ""),
                options: data.property_type ? subTypeProperties2[data.property_type] : [],
                isDisabled: !data.property_type,
                placeholder: "Zgjidh kategorinë",
                classNamePrefix: "react-select"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "property_category", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Qyteti *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                value: selectedBashki,
                onChange: (selected) => {
                  setSelectedBashki(selected);
                  setData("city", selected ? selected.label : "");
                },
                menuPortalTarget: document.body,
                options: locations.cities,
                placeholder: "Zgjidh Bashkinë",
                classNamePrefix: "react-select",
                isDisabled: !locations.cities.length
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "city", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Vendndodhja në hartë *" }),
            /* @__PURE__ */ jsx(
              MapPicker,
              {
                lat: coords.lat,
                lng: coords.lng,
                onSelect: (location) => {
                  console.log("Selected location:", location);
                  setCoords({ lat: location.lat, lng: location.lng });
                  setData("latitude", location.lat);
                  setData("longitude", location.lng);
                  setData("street", location.road);
                }
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "latitude", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Sipërfaqja *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: inputBase$3,
                name: "surface",
                type: "number",
                value: data.surface,
                onChange: (e) => setData("surface", e.target.value),
                placeholder: "Sipërfaqja në m²",
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "surface", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Çmimi *" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputBase$3,
                  type: "number",
                  value: data.price,
                  onChange: (e) => setData("price", e.target.value),
                  placeholder: "Çmimi",
                  autoComplete: "off"
                }
              ),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "currency",
                  className: "mt-1 min-w-24",
                  value: data.currency ? { value: data.currency, label: data.currency } : { value: "EUR", label: "EUR" },
                  onChange: (selected) => setData("currency", selected ? selected.value : ""),
                  options: [
                    { value: "EUR", label: "EUR" },
                    { value: "USD", label: "USD" },
                    { value: "ALL", label: "ALL" }
                  ],
                  classNamePrefix: "react-select"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(ErrorText, { field: "price", errors }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.price_negotiable,
                  onChange: (e) => setData("price_negotiable", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Çmimi i negociueshëm" })
            ] })
          ] }),
          renderDynamicFields(data.property_category, data, setData),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Imazhe *" }),
            /* @__PURE__ */ jsx("input", { type: "file", multiple: true, accept: "image/*", onChange: (e) => handleImages(e.target.files) }),
            images.length < 2 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "Duhet të ngarkoni të paktën 2 foto." }),
            /* @__PURE__ */ jsx(ErrorText, { field: "images", errors }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: images.map((img, index) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("img", { src: img.preview, className: "w-full h-24 object-cover rounded-lg border" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeImage(index),
                  className: "absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100",
                  children: "✕"
                }
              )
            ] }, index)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Virtual Tour Link (opsional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: inputBase$3,
              type: "url",
              value: data.virtual_tour_link,
              onChange: (e) => setData("virtual_tour_link", e.target.value),
              placeholder: "https://..."
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "virtual_tour_link", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Planimetria *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: ".pdf,image/*",
              onChange: (e) => setData("floor_plan", e.target.files[0]),
              className: "mt-1"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Lejohet PDF ose foto (maks 5MB)" }),
          /* @__PURE__ */ jsx(ErrorText, { field: "floor_plan", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Hipotekë (opsional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: ".pdf,image/*",
              onChange: (e) => setData("hipoteke_file", e.target.files[0]),
              className: "mt-1"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Lejohet maks 5MB" }),
          /* @__PURE__ */ jsx(ErrorText, { field: "hipoteke_file", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Përshkrimi" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              className: inputBase$3 + " h-32 resize-none",
              placeholder: "Shkruani detaje të pronës..."
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "description", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Detaje Ekstra" }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.ashensor,
                onChange: (e) => setData("ashensor", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka ashensor" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.hipoteke,
                onChange: (e) => setData("hipoteke", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka hipotekë" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.mobilim,
                onChange: (e) => setData("mobilim", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë mobilimi" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.parkim,
                onChange: (e) => setData("parkim", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë vendi i parkimit" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Shërbime Ekstra" }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.virtual_tour,
                onChange: (e) => setData("virtual_tour", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Kërkesë për Virtual Tour" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.virtual_tour_done,
                onChange: (e) => setData("virtual_tour_done", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Virtual Tour i Kryer" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.rivleresim,
                onChange: (e) => setData("rivleresim", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Kërkesë për Rivlerësim" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.rivleresim_done,
                onChange: (e) => setData("rivleresim_done", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Rivlerësimi i Kryer" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 bg-green-50 p-4 rounded-xl border border-green-200", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.verified,
              onChange: (e) => setData("verified", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-semibold", children: "Verifiko Pronën" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Të Dhëna për Gjurmim (Vetëm Admin)" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Numri i Telefonit për Gjurmim" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.tracking_phone,
                onChange: (e) => setData("tracking_phone", e.target.value),
                placeholder: "Numri i telefonit për gjurmim...",
                className: inputBase$3
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "tracking_phone", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$3, children: "Email për Gjurmim" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.tracking_email,
                onChange: (e) => setData("tracking_email", e.target.value),
                placeholder: "Email për gjurmim...",
                className: inputBase$3
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "tracking_email", errors })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl disabled:opacity-50",
            children: processing ? "Duke shtuar..." : "Shto Pronën"
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddProperty
}, Symbol.toStringTag, { value: "Module" }));
function CreateUser({ roles }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    company_name: "",
    address: "",
    birth_date: "",
    role_id: "2"
    // Default to regular user
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.post("/admin/users", formData, {
      onSuccess: () => {
        Swal.fire({
          title: "Sukses!",
          text: "Përdoruesi u krijua me sukses.",
          icon: "success",
          confirmButtonColor: "#2563eb",
          confirmButtonText: "OK"
        }).then(() => {
          router.get("/admin/users");
        });
      },
      onError: (errors2) => {
        setErrors(errors2);
        Swal.fire({
          title: "Gabim!",
          text: "Ju lutemi kontrolloni të dhënat dhe provoni përsëri.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          confirmButtonText: "OK"
        });
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };
  const handleCancel = () => {
    router.get("/admin/users");
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleCancel,
        className: "flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors",
        children: [
          /* @__PURE__ */ jsx(ArrowBackIcon, {}),
          /* @__PURE__ */ jsx("span", { children: "Kthehu" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Krijo Përdorues të Ri" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Emri *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(PersonIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  value: formData.name,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Shkruani emrin"
                }
              )
            ] }),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Mbiemri *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(PersonIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "surname",
                  value: formData.surname,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.surname ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Shkruani mbiemrin"
                }
              )
            ] }),
            errors.surname && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.surname })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(EmailIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani email"
              }
            )
          ] }),
          errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Fjalëkalimi *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(LockIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  name: "password",
                  value: formData.password,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Shkruani fjalëkalimin"
                }
              )
            ] }),
            errors.password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Konfirmo Fjalëkalimin *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(LockIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  name: "password_confirmation",
                  value: formData.password_confirmation,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Konfirmo fjalëkalimin"
                }
              )
            ] }),
            errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password_confirmation })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Numri i Telefonit" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(PhoneIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "phone_number",
                value: formData.phone_number,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone_number ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani numrin e telefonit"
              }
            )
          ] }),
          errors.phone_number && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.phone_number })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Emri i Kompanisë" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(BusinessIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "company_name",
                value: formData.company_name,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company_name ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani emrin e kompanisë"
              }
            )
          ] }),
          errors.company_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.company_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Adresa" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(LocationOnIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "address",
                value: formData.address,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani adresën"
              }
            )
          ] }),
          errors.address && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Data e Lindjes" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(CakeIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  name: "birth_date",
                  value: formData.birth_date,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.birth_date ? "border-red-500" : "border-gray-300"}`
                }
              )
            ] }),
            errors.birth_date && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.birth_date })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Roli *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(BadgeIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  name: "role_id",
                  value: formData.role_id,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${errors.role_id ? "border-red-500" : "border-gray-300"}`,
                  children: roles?.map((role) => /* @__PURE__ */ jsx("option", { value: role.id, children: role.name }, role.id))
                }
              )
            ] }),
            errors.role_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.role_id })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed",
              children: isSubmitting ? "Duke Krijuar..." : "Krijo Përdorues"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleCancel,
              disabled: isSubmitting,
              className: "px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium disabled:bg-gray-100 disabled:cursor-not-allowed",
              children: "Anulo"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateUser
}, Symbol.toStringTag, { value: "Module" }));
const Dashboard = ({ stats }) => {
  const [animatedStats, setAnimatedStats] = useState({});
  useEffect(() => {
    const initialStats = {};
    Object.keys(stats).forEach((key) => {
      initialStats[key] = 0;
    });
    setAnimatedStats(initialStats);
    const duration = 1e3;
    const steps = 50;
    const interval = duration / steps;
    const timer = setInterval(() => {
      setAnimatedStats((prev) => {
        const updated = { ...prev };
        let allDone = true;
        Object.keys(stats).forEach((key) => {
          if (updated[key] < stats[key]) {
            const increment = Math.ceil(stats[key] / steps);
            updated[key] = Math.min(updated[key] + increment, stats[key]);
            allDone = false;
          }
        });
        if (allDone) clearInterval(timer);
        return updated;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [stats]);
  const StatCard = ({ label, value, color = "blue", icon }) => /* @__PURE__ */ jsx("div", { className: "bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-1", children: label }),
      /* @__PURE__ */ jsx("p", { className: `text-3xl font-bold text-${color}-600`, children: (animatedStats[value] || 0).toLocaleString() })
    ] }),
    icon && /* @__PURE__ */ jsx("div", { className: "text-4xl", children: icon })
  ] }) });
  const SectionTitle = ({ children }) => /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-4 mt-8 border-b-2 border-blue-500 pb-2", children });
  return /* @__PURE__ */ jsx("div", { className: "pt-20 min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("main", { className: "pb-10 px-4 md:px-10 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8 text-gray-800", children: "Dashboard - Statistika" }),
    /* @__PURE__ */ jsx(SectionTitle, { children: "Përmbledhje" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Gjithsej Përdorues", value: "total_users", color: "blue", icon: "👥" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Gjithsej Prona", value: "total_properties", color: "green", icon: "🏠" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Gjithsej Kërkesa", value: "total_property_requests", color: "purple", icon: "📋" })
    ] }),
    /* @__PURE__ */ jsx(SectionTitle, { children: "Përdorues sipas Tipit" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Blerës", value: "users_buyers", color: "blue", icon: "🛒" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Investitorë", value: "users_investors", color: "green", icon: "💼" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Biznes", value: "users_business", color: "cyan", icon: "🏪" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Individë", value: "users_sellers_individual", color: "orange", icon: "👤" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Agjenci", value: "users_sellers_agency", color: "purple", icon: "🏢" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Banka", value: "users_sellers_bank", color: "red", icon: "🏦" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Zhvillues", value: "users_sellers_developer", color: "indigo", icon: "🏗️" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Të fundit (7 ditë)", value: "users_last_7_days", color: "teal", icon: "🆕" })
    ] }),
    /* @__PURE__ */ jsx(SectionTitle, { children: "Pronat - Statusi" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "E Verifikuara", value: "properties_verified", color: "green", icon: "✅" }),
      /* @__PURE__ */ jsx(StatCard, { label: "E Paverifikuara", value: "properties_unverified", color: "yellow", icon: "⏳" }),
      /* @__PURE__ */ jsx(StatCard, { label: "E Shitura", value: "properties_sold", color: "red", icon: "🔴" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Të Disponueshme", value: "properties_available", color: "blue", icon: "🟢" })
    ] }),
    /* @__PURE__ */ jsx(SectionTitle, { children: "Pronat - Lloji" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Për Shitje", value: "properties_for_sale", color: "green", icon: "💰" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Për Qira", value: "properties_for_rent", color: "blue", icon: "🔑" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Të fundit (7 ditë)", value: "properties_last_7_days", color: "teal", icon: "🆕" })
    ] }),
    /* @__PURE__ */ jsx(SectionTitle, { children: "Kërkesat e Pronave" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Aktive", value: "property_requests_active", color: "blue", icon: "🔵" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Të Perfunduara", value: "property_requests_completed", color: "green", icon: "✅" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Me Arkitekt", value: "property_requests_with_architect", color: "purple", icon: "🏛️" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Me Interior Dizajner", value: "property_requests_with_interior_design", color: "orange", icon: "🎨" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 mt-4", children: /* @__PURE__ */ jsx(StatCard, { label: "Kërkesa të fundit (7 ditë)", value: "property_requests_last_7_days", color: "teal", icon: "🆕" }) }),
    /* @__PURE__ */ jsx(SectionTitle, { children: "Shërbimet" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Tur Virtual (Kërkuar)", value: "properties_virtual_tour", color: "blue", icon: "📹" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Tur Virtual (Kryer)", value: "properties_virtual_tour_done", color: "green", icon: "✅" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Rivlerësim (Kërkuar)", value: "properties_rivleresim", color: "orange", icon: "📊" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Rivlerësim (Kryer)", value: "properties_rivleresim_done", color: "green", icon: "✅" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Paketat Kombinuara", value: "properties_combo_package", color: "purple", icon: "📦" })
    ] })
  ] }) });
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const inputBase$2 = "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all placeholder-gray-400";
const labelBase$2 = "block text-sm font-medium text-gray-700 mb-1";
function EditProperty({ property, users = [] }) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: property.user_id || "",
    type_of_sale: property.type_of_sale || "",
    property_type: property.property_type || "",
    property_category: property.property_category || "",
    city: property.city || "",
    street: property.street || "",
    surface: property.surface || "",
    price: property.price || "",
    ashensor: property.ashensor || false,
    hipoteke: property.hipoteke || false,
    currency: property.currency || "EUR",
    description: property.description || "",
    total_rooms: property.total_rooms || "",
    total_bathrooms: property.total_bathrooms || "",
    total_balconies: property.total_balconies || "",
    floor_number: property.floor_number || "",
    total_floors: property.total_floors || "",
    year_built: property.year_built || "",
    latitude: property.latitude || "",
    longitude: property.longitude || "",
    virtual_tour_link: property.virtual_tour_link || "",
    virtual_tour: property.virtual_tour || false,
    rivleresim: property.rivleresim || false,
    combo_package: property.combo_package || false,
    virtual_tour_done: property.virtual_tour_done || false,
    rivleresim_done: property.rivleresim_done || false,
    verified: property.verified || false,
    mobilim: property.mobilim,
    parkim: property.parkim,
    price_negotiable: property.price_negotiable,
    tracking_phone: property.tracking_phone || "",
    tracking_email: property.tracking_email || "",
    _method: "PUT"
  });
  const [coords, setCoords] = useState({
    lat: property.latitude || null,
    lng: property.longitude || null
  });
  const [selectedBashki, setSelectedBashki] = useState(
    property.city ? { value: property.city, label: property.city } : null
  );
  const saleOptions = [
    { value: "", label: "Zgjidh Llojin e Transaksionit" },
    { value: "sale", label: "Shitje" },
    { value: "rent", label: "Qira" }
  ];
  const typeOfProperties = [
    { value: "residential", label: "Rezidenciale" },
    { value: "commercial", label: "Komerciale" },
    { value: "land", label: "Tokë" },
    { value: "others", label: "Të tjera" }
  ];
  const subTypeProperties2 = {
    residential: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjere", label: "Kategori të tjera" }
    ],
    commercial: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    land: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    others: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const dynamicFieldsMap = {
    apartment: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 3" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 1" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 2" },
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 5" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 2008" }
    ],
    house: [
      { value: "total_rooms", type: "number", label: "Numri i Dhomave", placeholder: "p.sh. 5" },
      { value: "total_bathrooms", type: "number", label: "Numri i Banjove", placeholder: "p.sh. 2" },
      { value: "total_floors", type: "number", label: "Numri i Kateve të Ndërtimit", placeholder: "p.sh. 3" },
      { value: "year_built", type: "number", label: "Viti i Ndërtimit", placeholder: "p.sh. 1995" },
      { value: "total_balconies", type: "number", label: "Numri i Ballkoneve", placeholder: "p.sh. 1" }
    ],
    office: [{ value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 2" }]
  };
  const renderDynamicFields = (selectedSubtype, data2, setData2) => {
    if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
      return null;
    }
    return dynamicFieldsMap[selectedSubtype].map((field) => {
      const isYearBuilt = field.value === "year_built";
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$2, children: field.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: field.type,
            value: data2[field.value] || "",
            placeholder: field.placeholder || "",
            onChange: (e) => setData2(field.value, e.target.value),
            ...isYearBuilt ? { min: 1900, max: 2050 } : {},
            className: inputBase$2
          }
        ),
        /* @__PURE__ */ jsx(ErrorText, { field: field.value, errors })
      ] }, field.value);
    });
  };
  const loadUserOptions = (inputValue, callback) => {
    const filteredUsers = users.filter(
      (user) => `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
    ).map((user) => ({
      value: user.id,
      label: `${user.name} ${user.surname}`
    }));
    callback(filteredUsers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/admin/properties/${property.id}/update`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "pt-5 bg-gray-50 min-h-screen", children: [
    /* @__PURE__ */ jsx(Box, { sx: { mx: { xs: 2, sm: 10, md: 20 }, mt: 2, mb: 3 }, children: /* @__PURE__ */ jsx(Button, { variant: "outlined", onClick: () => router.get("/admin/properties"), children: "← Kthehu tek Pronat" }) }),
    /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-1 pb-20", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-5 pt-4 text-gray-800", children: "Ndrysho Pronën" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-8 rounded-2xl shadow-lg border border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Zgjidh Përdoruesin (Pronari) *" }),
          /* @__PURE__ */ jsx(
            AsyncSelect,
            {
              cacheOptions: true,
              loadOptions: loadUserOptions,
              defaultOptions: users.map((user) => ({
                value: user.id,
                label: `${user.name} ${user.surname}`
              })),
              value: data.user_id ? users.find((user) => user.id === data.user_id) ? {
                value: data.user_id,
                label: `${users.find((user) => user.id === data.user_id).name} ${users.find((user) => user.id === data.user_id).surname}`
              } : null : null,
              onChange: (option) => setData("user_id", option ? option.value : ""),
              placeholder: "Kërko përdoruesin...",
              classNamePrefix: "react-select",
              isClearable: true
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "user_id", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Lloji i Transaksionit *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "type_of_sale",
                value: saleOptions.find((o) => o.value === data.type_of_sale) || null,
                onChange: (selected) => setData("type_of_sale", selected ? selected.value : ""),
                options: saleOptions,
                placeholder: "Zgjidh llojin",
                classNamePrefix: "react-select"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "type_of_sale", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Lloji i Pronës *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "property_type",
                value: typeOfProperties.find((o) => o.value === data.property_type) || null,
                onChange: (selected) => {
                  setData("property_type", selected ? selected.value : "");
                  setData("property_category", "");
                },
                options: typeOfProperties,
                placeholder: "Zgjidh llojin",
                classNamePrefix: "react-select"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "property_type", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Kategoria e Pronës *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "property_category",
                value: data.property_type ? subTypeProperties2[data.property_type].find((o) => o.value === data.property_category) || null : null,
                onChange: (selected) => setData("property_category", selected ? selected.value : ""),
                options: data.property_type ? subTypeProperties2[data.property_type] : [],
                isDisabled: !data.property_type,
                placeholder: "Zgjidh kategorinë",
                classNamePrefix: "react-select"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "property_category", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Qyteti *" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                value: selectedBashki,
                onChange: (selected) => {
                  setSelectedBashki(selected);
                  setData("city", selected ? selected.label : "");
                },
                menuPortalTarget: document.body,
                options: locations.cities,
                placeholder: "Zgjidh Bashkinë",
                classNamePrefix: "react-select",
                isDisabled: !locations.cities.length
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "city", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Sipërfaqja *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: inputBase$2,
                name: "surface",
                type: "number",
                value: data.surface,
                onChange: (e) => setData("surface", e.target.value),
                placeholder: "Sipërfaqja në m²",
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "surface", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Çmimi *" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_auto] gap-2 items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputBase$2,
                  type: "number",
                  value: data.price,
                  onChange: (e) => setData("price", e.target.value),
                  placeholder: "Çmimi",
                  autoComplete: "off"
                }
              ),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "currency",
                  className: "mt-1 min-w-24",
                  value: { value: data.currency, label: data.currency },
                  onChange: (selected) => setData("currency", selected ? selected.value : ""),
                  options: [
                    { value: "EUR", label: "EUR" },
                    { value: "USD", label: "USD" },
                    { value: "ALL", label: "ALL" }
                  ],
                  classNamePrefix: "react-select"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(ErrorText, { field: "price", errors }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.price_negotiable,
                  onChange: (e) => setData("price_negotiable", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Çmimi i negociueshëm" })
            ] })
          ] }),
          renderDynamicFields(data.property_category, data, setData),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Vendndodhja në hartë *" }),
            /* @__PURE__ */ jsx(
              MapPicker,
              {
                lat: coords.lat,
                lng: coords.lng,
                onSelect: (location) => {
                  setCoords({ lat: location.lat, lng: location.lng });
                  setData("latitude", location.lat);
                  setData("longitude", location.lng);
                  setData("street", location.road);
                }
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "latitude", errors })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Virtual Tour Link (opsional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: inputBase$2,
              type: "url",
              value: data.virtual_tour_link,
              onChange: (e) => setData("virtual_tour_link", e.target.value),
              placeholder: "https://..."
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "virtual_tour_link", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Përshkrimi" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              className: inputBase$2 + " h-32 resize-none",
              placeholder: "Shkruani detaje të pronës..."
            }
          ),
          /* @__PURE__ */ jsx(ErrorText, { field: "description", errors })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Detaje Ekstra" }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.ashensor, onChange: (e) => setData("ashensor", e.target.checked) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka ashensor" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.hipoteke, onChange: (e) => setData("hipoteke", e.target.checked) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ka hipotekë" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.mobilim,
                onChange: (e) => setData("mobilim", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë mobilimi" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.parkim,
                onChange: (e) => setData("parkim", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Përfshirë vendi i parkimit" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Shërbime Ekstra" }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.virtual_tour, onChange: (e) => setData("virtual_tour", e.target.checked) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Kërkesë për Virtual Tour" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.virtual_tour_done, onChange: (e) => setData("virtual_tour_done", e.target.checked) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Virtual Tour i Kryer" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.rivleresim, onChange: (e) => setData("rivleresim", e.target.checked) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Kërkesë për Rivlerësim" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.rivleresim_done, onChange: (e) => setData("rivleresim_done", e.target.checked) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Rivlerësimi i Kryer" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 bg-green-50 p-4 rounded-xl border border-green-200", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.verified, onChange: (e) => setData("verified", e.target.checked) }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-semibold", children: "Verifiko Pronën" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Të Dhëna për Gjurmim (Vetëm Admin)" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Numri i Telefonit për Gjurmim" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.tracking_phone,
                onChange: (e) => setData("tracking_phone", e.target.value),
                placeholder: "Numri i telefonit për gjurmim...",
                className: inputBase$2
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "tracking_phone", errors })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$2, children: "Email për Gjurmim" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.tracking_email,
                onChange: (e) => setData("tracking_email", e.target.value),
                placeholder: "Email për gjurmim...",
                className: inputBase$2
              }
            ),
            /* @__PURE__ */ jsx(ErrorText, { field: "tracking_email", errors })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl disabled:opacity-50",
            children: processing ? "Duke përditësuar..." : "Përditëso Pronën"
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditProperty
}, Symbol.toStringTag, { value: "Module" }));
function EditUser({ user, roles }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    phone_number: user.phone_number || "",
    company_name: user.company_name || "",
    address: user.address || "",
    birth_date: user.birth_date || "",
    role_id: user.role_id || "2",
    notifications: user.notifications ?? true,
    // Extra fields
    nipt: user.nipt || "",
    company_phone_number: user.company_phone_number || "",
    years_experience: user.years_experience || "",
    company_description: user.company_description || "",
    finished_projects: user.finished_projects || "",
    website: user.website || "",
    year_budget: user.year_budget || "",
    preferred_locations: user.preferred_locations || ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = { ...formData };
    if (!dataToSend.password) {
      delete dataToSend.password;
      delete dataToSend.password_confirmation;
    }
    router.put(`/admin/users/${user.id}`, dataToSend, {
      onSuccess: () => {
        Swal.fire({
          title: "Sukses!",
          text: "Përdoruesi u përditësua me sukses.",
          icon: "success",
          confirmButtonColor: "#2563eb",
          confirmButtonText: "OK"
        }).then(() => {
          router.get("/admin/users");
        });
      },
      onError: (errors2) => {
        setErrors(errors2);
        Swal.fire({
          title: "Gabim!",
          text: "Ju lutemi kontrolloni të dhënat dhe provoni përsëri.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          confirmButtonText: "OK"
        });
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };
  const handleCancel = () => {
    router.get("/admin/users");
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleCancel,
        className: "flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors",
        children: [
          /* @__PURE__ */ jsx(ArrowBackIcon, {}),
          /* @__PURE__ */ jsx("span", { children: "Kthehu" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Ndrysho Përdoruesin" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Emri *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(PersonIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  value: formData.name,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Shkruani emrin"
                }
              )
            ] }),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Mbiemri *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(PersonIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "surname",
                  value: formData.surname,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.surname ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Shkruani mbiemrin"
                }
              )
            ] }),
            errors.surname && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.surname })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(EmailIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani email"
              }
            )
          ] }),
          errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Lëreni bosh nëse nuk dëshironi të ndryshoni fjalëkalimin" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Fjalëkalimi i Ri" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(LockIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    name: "password",
                    value: formData.password,
                    onChange: handleChange,
                    className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`,
                    placeholder: "Shkruani fjalëkalimin e ri"
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Konfirmo Fjalëkalimin" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(LockIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    name: "password_confirmation",
                    value: formData.password_confirmation,
                    onChange: handleChange,
                    className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? "border-red-500" : "border-gray-300"}`,
                    placeholder: "Konfirmo fjalëkalimin e ri"
                  }
                )
              ] }),
              errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password_confirmation })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Numri i Telefonit" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(PhoneIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "phone_number",
                value: formData.phone_number,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone_number ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani numrin e telefonit"
              }
            )
          ] }),
          errors.phone_number && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.phone_number })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Emri i Kompanisë" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(BusinessIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "company_name",
                value: formData.company_name,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company_name ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani emrin e kompanisë"
              }
            )
          ] }),
          errors.company_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.company_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Adresa" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(LocationOnIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "address",
                value: formData.address,
                onChange: handleChange,
                className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Shkruani adresën"
              }
            )
          ] }),
          errors.address && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Data e Lindjes" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(CakeIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  name: "birth_date",
                  value: formData.birth_date,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.birth_date ? "border-red-500" : "border-gray-300"}`
                }
              )
            ] }),
            errors.birth_date && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.birth_date })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Roli *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(BadgeIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", style: { fontSize: 20 } }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  name: "role_id",
                  value: formData.role_id,
                  onChange: handleChange,
                  className: `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${errors.role_id ? "border-red-500" : "border-gray-300"}`,
                  children: roles?.map((role) => /* @__PURE__ */ jsx("option", { value: role.id, children: role.name }, role.id))
                }
              )
            ] }),
            errors.role_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.role_id })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "notifications",
              checked: formData.notifications,
              onChange: (e) => setFormData((prev) => ({ ...prev, notifications: e.target.checked })),
              className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-700", children: "Dëshiron të marrë njoftime me email" })
        ] }),
        ["agency", "bank", "developer"].includes(user.role?.name) && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-4 space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: user.role?.name === "bank" ? "Informacione të Bankës" : user.role?.name === "agency" ? "Informacione të Agjencisë" : "Informacione të Kompanisë" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "NIPT" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "nipt",
                  value: formData.nipt,
                  onChange: handleChange,
                  className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                  placeholder: "Shkruani NIPT"
                }
              )
            ] }),
            user.role?.name === "agency" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Numri i Telefonit të Agjencisë" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "company_phone_number",
                    value: formData.company_phone_number,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                    placeholder: "Shkruani numrin e telefonit"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Faqja Zyrtare" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "url",
                    name: "website",
                    value: formData.website,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                    placeholder: "https://example.com"
                  }
                )
              ] })
            ] }),
            user.role?.name === "developer" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Vitet e Përvojës" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    name: "years_experience",
                    value: formData.years_experience,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                    placeholder: "Shkruani vitet e përvojës"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Projekte të Përfunduara" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    name: "finished_projects",
                    value: formData.finished_projects,
                    onChange: handleChange,
                    className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                    placeholder: "Numri i projekteve"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Përshkrimi" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                name: "company_description",
                value: formData.company_description,
                onChange: handleChange,
                rows: "4",
                className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                placeholder: "Shkruani përshkrimin e kompanisë"
              }
            )
          ] })
        ] }),
        user.role?.name === "investor" && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-4 space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Informacione të Investitorit" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Buxheti Vjetor (€)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "year_budget",
                  value: formData.year_budget,
                  onChange: handleChange,
                  className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                  placeholder: "Shkruani buxhetin vjetor"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Zonat e Preferuara" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "preferred_locations",
                  value: formData.preferred_locations,
                  onChange: handleChange,
                  className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                  placeholder: "Tiranë, Durrës, Vlorë"
                }
              )
            ] })
          ] })
        ] }),
        user.role?.name === "business" && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-4 space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Informacione të Biznesit" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Zonat e Preferuara për Hapësira Komerciale" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "preferred_locations",
                value: formData.preferred_locations,
                onChange: handleChange,
                className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300",
                placeholder: "Tiranë, Durrës, Vlorë"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed",
              children: isSubmitting ? "Duke Përditësuar..." : "Përditëso Përdoruesin"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleCancel,
              disabled: isSubmitting,
              className: "px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium disabled:bg-gray-100 disabled:cursor-not-allowed",
              children: "Anulo"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditUser
}, Symbol.toStringTag, { value: "Module" }));
function Logs({ logs, pagination, filters, users, action_types }) {
  const [perPage, setPerPage] = useState(filters.per_page || 10);
  const [selectedUser, setSelectedUser] = useState(filters.user_id || "");
  const [selectedAction, setSelectedAction] = useState(filters.action_type || "");
  const actionLabels = {
    "created": "Krijoi",
    "updated": "Përditësoi",
    "deleted": "Fshiu",
    "viewed": "Shikoi",
    "viewed_property": "Shikoi pronën",
    "viewed_property_listing": "Shikoi kërkesën e pronës",
    "created_property": "Krijoi pronë",
    "updated_property": "Përditësoi pronë",
    "deleted_property": "Fshiu pronë",
    "created_property_request": "Krijoi kërkesë prone",
    "updated_property_request": "Përditësoi kërkesë prone",
    "deleted_property_request": "Fshiu kërkesë prone",
    "deleted_user": "Fshiu përdorues",
    "force_deleted_user": "Fshiu përdorues përgjithmonë",
    "login": "Hyrje",
    "logout": "Dalje"
  };
  const handleFilter = (filterData) => {
    router.get("/admin/logs", filterData, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const handlePerPageChange = (e) => {
    const newPerPage = e.target.value;
    setPerPage(newPerPage);
    handleFilter({ ...filters, per_page: newPerPage });
  };
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    handleFilter({ ...filters, user_id: userId, page: 1 });
  };
  const handleActionChange = (e) => {
    const action = e.target.value;
    setSelectedAction(action);
    handleFilter({ ...filters, action_type: action, page: 1 });
  };
  const clearFilters = () => {
    setSelectedUser("");
    setSelectedAction("");
    router.get("/admin/logs");
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("sq-AL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const getActionColor = (action) => {
    const colors = {
      "created": "bg-green-100 text-green-800",
      "created_property": "bg-green-100 text-green-800",
      "created_property_request": "bg-green-100 text-green-800",
      "updated": "bg-blue-100 text-blue-800",
      "updated_property": "bg-blue-100 text-blue-800",
      "updated_property_request": "bg-blue-100 text-blue-800",
      "deleted": "bg-red-100 text-red-800",
      "deleted_property": "bg-red-100 text-red-800",
      "deleted_property_request": "bg-red-100 text-red-800",
      "deleted_user": "bg-red-100 text-red-800",
      "force_deleted_user": "bg-red-200 text-red-900",
      "viewed": "bg-gray-100 text-gray-800",
      "viewed_property": "bg-purple-100 text-purple-800",
      "viewed_property_request": "bg-purple-100 text-purple-800",
      "login": "bg-indigo-100 text-indigo-800",
      "logout": "bg-orange-100 text-orange-800"
    };
    return colors[action?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Historiku i Aktiviteteve" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Shikoni të gjitha aktivitetet e përdoruesve" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(FilterListIcon, { className: "text-gray-600" }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800", children: "Filtro" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Përdoruesi" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedUser,
              onChange: handleUserChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Të gjithë" }),
                users?.map((user) => /* @__PURE__ */ jsxs("option", { value: user.id, children: [
                  user.name,
                  " ",
                  user.surname
                ] }, user.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Lloji i Veprimit" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedAction,
              onChange: handleActionChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Të gjitha" }),
                action_types?.map((action) => /* @__PURE__ */ jsx("option", { value: action, children: actionLabels[action] || action }, action))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Rreshta për faqe" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: perPage,
              onChange: handlePerPageChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "10", children: "10" }),
                /* @__PURE__ */ jsx("option", { value: "25", children: "25" }),
                /* @__PURE__ */ jsx("option", { value: "50", children: "50" }),
                /* @__PURE__ */ jsx("option", { value: "100", children: "100" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearFilters,
            className: "w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors",
            children: "Pastro Filtrat"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-6", children: logs?.length === 0 ? /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Nuk ka aktivitete për të shfaqur" }) }) : logs?.map((log) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(PersonIcon, { className: "text-gray-600", style: { fontSize: 20 } }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-800", children: [
              log.user?.name,
              " ",
              log.user?.surname
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${getActionColor(log.action_type)}`, children: actionLabels[log.action_type] || log.action_type })
        ] }),
        log.description && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(DescriptionIcon, { className: "text-gray-500 mt-0.5", style: { fontSize: 18 } }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: log.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
          log.property && /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => router.get(`/properties/${log.property.id}`),
              className: "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors",
              children: [
                /* @__PURE__ */ jsx(HomeIcon, { style: { fontSize: 18 } }),
                /* @__PURE__ */ jsxs("span", { className: "underline", children: [
                  "Prona: ",
                  log.property.city
                ] })
              ]
            }
          ),
          log.property_request && /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => router.get(`/property/request/${log.property_request.id}`),
              className: "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors",
              children: [
                /* @__PURE__ */ jsx(RequestPageIcon, { style: { fontSize: 18 } }),
                /* @__PURE__ */ jsxs("span", { className: "underline", children: [
                  "Kërkesa: ",
                  log.property_request.city
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-500", children: [
        /* @__PURE__ */ jsx(CalendarTodayIcon, { style: { fontSize: 18 } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: formatDate(log.created_at) })
      ] })
    ] }) }, log.id)) }),
    pagination.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
        "Faqja ",
        pagination.current_page,
        " nga ",
        pagination.last_page,
        /* @__PURE__ */ jsxs("span", { className: "ml-2", children: [
          "(Totali: ",
          pagination.total,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleFilter({ ...filters, page: pagination.current_page - 1 }),
            disabled: !pagination.prev_page_url,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(ChevronLeftIcon, {}),
              "Prapa"
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: pagination.links?.filter((link) => !link.label.includes("Previous") && !link.label.includes("Next")).map((link, index) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => link.url && handleFilter({ ...filters, page: link.label }),
            className: `px-4 py-2 rounded-md transition-colors ${link.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
            disabled: !link.url || link.active,
            children: link.label
          },
          index
        )) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleFilter({ ...filters, page: pagination.current_page + 1 }),
            disabled: !pagination.next_page_url,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2",
            children: [
              "Para",
              /* @__PURE__ */ jsx(ChevronRightIcon, {})
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Logs
}, Symbol.toStringTag, { value: "Module" }));
const PropertyCard = ({ property, onEdit, onView, onDelete, onVerify, onRestore, onPermanentDelete, onToggleSold, isDeleted }) => {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      sx: {
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        height: "100%",
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
          transition: "all 0.3s ease"
        }
      },
      children: [
        /* @__PURE__ */ jsxs(CardContent, { sx: { display: "grid", gap: 1.5, pb: 1 }, children: [
          property.owner && /* @__PURE__ */ jsxs(Box, { sx: {
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1,
            bgcolor: "grey.100",
            borderRadius: 1
          }, children: [
            /* @__PURE__ */ jsx(PersonIcon, { sx: { fontSize: 18, color: "text.secondary" } }),
            /* @__PURE__ */ jsxs(Typography, { variant: "body2", fontWeight: "medium", noWrap: true, children: [
              property.owner.name,
              " ",
              property.owner.surname
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", flexWrap: "wrap", gap: 0.5, minHeight: 32 }, children: [
            /* @__PURE__ */ jsx(
              Chip,
              {
                label: property.type_of_sale === "sale" ? "Shitje" : "Qira",
                color: property.type_of_sale === "sale" ? "primary" : "secondary",
                size: "small"
              }
            ),
            Boolean(property.verified) ? /* @__PURE__ */ jsx(Chip, { label: "E Verifikuar", color: "success", size: "small" }) : /* @__PURE__ */ jsx(Chip, { label: "E Paverifikuar", color: "error", size: "small" }),
            Boolean(property.sold) && /* @__PURE__ */ jsx(Chip, { label: "E Shitur", color: "error", size: "small" }),
            Boolean(property.virtual_tour) && !Boolean(property.virtual_tour_done) && /* @__PURE__ */ jsx(Chip, { label: "Tur Virtual", color: "info", size: "small", variant: "outlined" }),
            Boolean(property.rivleresim) && !Boolean(property.rivleresim_done) && /* @__PURE__ */ jsx(Chip, { label: "Rivlerësim", color: "info", size: "small", variant: "outlined" }),
            Boolean(property.combo_package) && !(Boolean(property.rivleresim_done) && Boolean(property.virtual_tour_done)) && /* @__PURE__ */ jsx(Chip, { label: "Paketë Kombinuar", color: "info", size: "small", variant: "outlined" }),
            Boolean(property.virtual_tour) && Boolean(property.virtual_tour_done) && /* @__PURE__ */ jsx(Chip, { label: "✓ Tur Virtual", color: "success", size: "small" }),
            Boolean(property.rivleresim) && Boolean(property.rivleresim_done) && /* @__PURE__ */ jsx(Chip, { label: "✓ Rivlerësim", color: "success", size: "small" })
          ] }),
          /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
            /* @__PURE__ */ jsx(HomeIcon, { sx: { fontSize: 20, color: "primary.main" } }),
            /* @__PURE__ */ jsxs(Typography, { variant: "h6", component: "div", sx: { fontWeight: 600, lineHeight: 1.2 }, children: [
              property.property_type,
              " - ",
              property.property_category
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 0.5 }, children: [
            /* @__PURE__ */ jsx(LocationOnIcon, { sx: { fontSize: 18, color: "text.secondary" } }),
            /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "text.secondary", noWrap: true, children: [
              property.street,
              ", ",
              property.city
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "h5",
              color: "primary",
              sx: { fontWeight: 700 },
              children: property.price ? `${property.price} ${property.currency}` : "Çmimi N/A"
            }
          ),
          /* @__PURE__ */ jsxs(Box, { sx: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            bgcolor: "grey.50",
            p: 1.5,
            borderRadius: 1,
            minHeight: 80
          }, children: [
            property.surface && /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 0.5 }, children: [
              /* @__PURE__ */ jsx(SquareFootIcon, { sx: { fontSize: 16, color: "text.secondary" } }),
              /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
                property.surface,
                " m²"
              ] })
            ] }),
            property.total_rooms && /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 0.5 }, children: [
              /* @__PURE__ */ jsx(BedIcon, { sx: { fontSize: 16, color: "text.secondary" } }),
              /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
                property.total_rooms,
                " dhoma"
              ] })
            ] }),
            property.total_bathrooms && /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 0.5 }, children: [
              /* @__PURE__ */ jsx(BathtubIcon, { sx: { fontSize: 16, color: "text.secondary" } }),
              /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
                property.total_bathrooms,
                " banjo"
              ] })
            ] }),
            property.total_balconies && /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 0.5 }, children: [
              /* @__PURE__ */ jsx(BalconyIcon, { sx: { fontSize: 16, color: "text.secondary" } }),
              /* @__PURE__ */ jsxs(Typography, { variant: "body2", children: [
                property.total_balconies,
                " ballkone"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Box, { sx: { minHeight: 24, display: "flex", alignItems: "center" }, children: (property.floor_number || property.total_floors || property.year_built) && /* @__PURE__ */ jsxs(Typography, { variant: "caption", color: "text.secondary", children: [
            property.floor_number && `Kati ${property.floor_number}`,
            property.total_floors && `/${property.total_floors}`,
            property.year_built && ` • Ndërtuar: ${property.year_built}`
          ] }) }),
          /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(Typography, { children: [
            "Shikime: ",
            property.views || 0
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(CardActions, { sx: { px: 2, pt: 0, pb: 1 }, children: /* @__PURE__ */ jsx(
          Button,
          {
            fullWidth: true,
            size: "small",
            variant: "contained",
            onClick: () => onView(property),
            sx: { fontWeight: 600 },
            children: "Shiko Detajet"
          }
        ) }),
        /* @__PURE__ */ jsx(CardActions, { sx: { px: 2, pb: 2, pt: 0 }, children: !isDeleted ? /* @__PURE__ */ jsxs(Box, { sx: { display: "grid", gap: 1, width: "100%" }, children: [
          /* @__PURE__ */ jsxs(Box, { sx: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }, children: [
            /* @__PURE__ */ jsx(Button, { size: "small", variant: "outlined", onClick: () => onEdit(property), children: "Ndrysho" }),
            /* @__PURE__ */ jsx(Button, { size: "small", color: "error", variant: "outlined", onClick: () => onDelete(property), children: "Fshi" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "small",
                color: property.verified ? "warning" : "success",
                variant: "outlined",
                onClick: () => onVerify(property),
                children: property.verified ? "Hiq" : "Verifiko"
              }
            )
          ] }),
          onToggleSold && /* @__PURE__ */ jsx(
            Button,
            {
              fullWidth: true,
              size: "small",
              color: property.sold ? "success" : "warning",
              variant: "contained",
              onClick: () => onToggleSold(property),
              children: property.sold ? "Shëno si e Disponueshme" : "Shëno si e Shitur"
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Box, { sx: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, width: "100%" }, children: [
          /* @__PURE__ */ jsx(Button, { size: "small", color: "primary", variant: "outlined", onClick: () => onRestore(property), children: "Restauro" }),
          /* @__PURE__ */ jsx(Button, { size: "small", color: "error", variant: "outlined", onClick: () => onPermanentDelete(property), children: "Fshi Përgjithmonë" })
        ] }) })
      ]
    }
  );
};
const PropertyFilterModal = ({ filters, setFilters, onApply, users = [] }) => {
  const [open, setOpen] = useState(false);
  const update = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const subTypeProperties2 = {
    Rezidenciale: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    Komerciale: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    Tokë: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    Tjera: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const toggleArray = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      };
    });
  };
  const loadUserOptions = (inputValue, callback) => {
    const filteredUsers = users.filter(
      (user) => `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
    ).map((user) => ({
      value: user.id,
      label: `${user.name} ${user.surname}`
    }));
    callback(filteredUsers);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow px-4 pb-4 rounded-xl mb-4", children: [
    /* @__PURE__ */ jsx("h4", { className: "pb-4 text-2xl font-bold", children: "Kërko" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Qytet, zonë, rrugë...",
          value: filters.search || "",
          onChange: (e) => update("search", e.target.value),
          className: "border rounded-lg p-3 w-full"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onApply,
          className: "w-full bg-blue-500 text-white rounded-lg p-3",
          children: "Kërko"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(true),
        className: "mt-3 underline text-sm",
        children: "Më shumë filtra"
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 grid items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-4", children: "Filtra të Avancuar" }),
      users.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Zgjidh Përdoruesin" }),
        /* @__PURE__ */ jsx(
          AsyncSelect,
          {
            cacheOptions: true,
            loadOptions: loadUserOptions,
            defaultOptions: users.map((user) => ({
              value: user.id,
              label: `${user.name} ${user.surname}`
            })),
            value: filters.user_id ? users.find((user) => user.id === filters.user_id) ? {
              value: filters.user_id,
              label: `${users.find((user) => user.id === filters.user_id).name} ${users.find((user) => user.id === filters.user_id).surname}`
            } : null : null,
            onChange: (option) => update("user_id", option ? option.value : ""),
            placeholder: "Kërko përdoruesin...",
            classNamePrefix: "react-select",
            isClearable: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Statusi i Verifikimit" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.verified ?? "",
            onChange: (e) => update("verified", e.target.value),
            className: "w-full border rounded-lg p-2",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Të gjitha" }),
              /* @__PURE__ */ jsx("option", { value: "1", children: "E Verifikuar" }),
              /* @__PURE__ */ jsx("option", { value: "0", children: "E Paverifikuar" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Shërbimet e Kërkuara" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.virtual_tour || false,
                onChange: (e) => update("virtual_tour", e.target.checked)
              }
            ),
            "Ka kërkuar Tur Virtual"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.rivleresim || false,
                onChange: (e) => update("rivleresim", e.target.checked)
              }
            ),
            "Ka kërkuar Rivlerësim"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.combo_package || false,
                onChange: (e) => update("combo_package", e.target.checked)
              }
            ),
            "Ka kërkuar Paketë Kombinuar"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Statusi i Shërbimeve" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.virtual_tour_done || false,
                onChange: (e) => update("virtual_tour_done", e.target.checked)
              }
            ),
            "Tur Virtual i kryer"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.rivleresim_done || false,
                onChange: (e) => update("rivleresim_done", e.target.checked)
              }
            ),
            "Rivlerësimi i kryer"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Intervali i Çmimit" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Min",
              value: filters.min_price || "",
              onChange: (e) => update("min_price", e.target.value),
              className: "border rounded-lg p-2 w-full"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Max",
              value: filters.max_price || "",
              onChange: (e) => update("max_price", e.target.value),
              className: "border rounded-lg p-2 w-full"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Monedha" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.currency || "EUR",
            onChange: (e) => update("currency", e.target.value),
            className: "w-full border rounded-lg p-2",
            children: [
              /* @__PURE__ */ jsx("option", { value: "EUR", children: "EUR" }),
              /* @__PURE__ */ jsx("option", { value: "ALL", children: "ALL" }),
              /* @__PURE__ */ jsx("option", { value: "USD", children: "USD" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Lloji" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.sale_type || "",
            onChange: (e) => update("sale_type", e.target.value),
            className: "w-full border rounded-lg p-2",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Çdo" }),
              /* @__PURE__ */ jsx("option", { value: "sale", children: "Shitje" }),
              /* @__PURE__ */ jsx("option", { value: "rent", children: "Qira" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Lloji i Pronës" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: Object.entries(subTypeProperties2).map(([category, subTypes]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-bold mb-2", children: category }),
          subTypes.map((subType) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.types?.includes(subType.value) || false,
                onChange: () => toggleArray("types", subType.value)
              }
            ),
            subType.label
          ] }, subType.value))
        ] }, category)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-semibold block mb-2", children: "Karakteristika" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.elevator || false,
                onChange: (e) => update("elevator", e.target.checked)
              }
            ),
            "Ashensor"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.mortgage || false,
                onChange: (e) => update("mortgage", e.target.checked)
              }
            ),
            "Hipotekë"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.parkim || false,
                onChange: (e) => update("parkim", e.target.checked)
              }
            ),
            "Parkim"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: filters.mobilim || false,
                onChange: (e) => update("mobilim", e.target.checked)
              }
            ),
            "Mobilim"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min dhoma",
            value: filters.rooms_min || "",
            onChange: (e) => update("rooms_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max dhoma",
            value: filters.rooms_max || "",
            onChange: (e) => update("rooms_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min banjo",
            value: filters.bathrooms_min || "",
            onChange: (e) => update("bathrooms_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max banjo",
            value: filters.bathrooms_max || "",
            onChange: (e) => update("bathrooms_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min sipërfaqe m²",
            value: filters.surface_min || "",
            onChange: (e) => update("surface_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max sipërfaqe m²",
            value: filters.surface_max || "",
            onChange: (e) => update("surface_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Min ballkone",
            value: filters.balconies_min || "",
            onChange: (e) => update("balconies_min", e.target.value),
            className: "border rounded-lg p-2"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Max ballkone",
            value: filters.balconies_max || "",
            onChange: (e) => update("balconies_max", e.target.value),
            className: "border rounded-lg p-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(false),
            className: "border px-4 py-2 rounded-lg",
            children: "Mbyll"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setOpen(false);
              onApply();
            },
            className: "bg-blue-600 text-white px-4 py-2 rounded-lg",
            children: "Apliko filtrat"
          }
        )
      ] })
    ] }) })
  ] });
};
const Properties = ({ properties, pagination, filters, showDeleted, users = [] }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [viewMode, setViewMode] = useState(isMobile ? "card" : "grid");
  const [activeTab, setActiveTab] = useState(showDeleted ? 1 : 0);
  const [paginationModel, setPaginationModel] = useState({
    page: pagination.current_page - 1,
    pageSize: pagination.per_page
  });
  const [filterState, setFilterState] = useState({
    verified: filters.verified ?? "",
    sale_type: filters.sale_type ?? "",
    search: filters.search ?? "",
    user_id: filters.user_id ?? "",
    virtual_tour: false,
    rivleresim: false,
    combo_package: false,
    virtual_tour_done: false,
    rivleresim_done: false,
    min_price: filters.min_price ?? "",
    max_price: filters.max_price ?? "",
    currency: filters.currency ?? "EUR",
    types: filters.types ?? [],
    elevator: false,
    mortgage: false,
    parkim: false,
    mobiluar: false,
    rooms_min: filters.rooms_min ?? "",
    rooms_max: filters.rooms_max ?? "",
    bathrooms_min: filters.bathrooms_min ?? "",
    bathrooms_max: filters.bathrooms_max ?? "",
    surface_min: filters.surface_min ?? "",
    surface_max: filters.surface_max ?? "",
    balconies_min: filters.balconies_min ?? "",
    balconies_max: filters.balconies_max ?? ""
  });
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    router.get("/admin/properties", {
      ...filterState,
      show_deleted: newValue === 1 ? "1" : "0",
      page: 1,
      per_page: paginationModel.pageSize
    }, {
      preserveState: false,
      replace: true
    });
  };
  const handleEdit = (row) => {
    router.get(`/admin/properties/${row.id}/edit`);
  };
  const handleView = (row) => {
    router.get(`/properties/${row.id}`);
  };
  const handleDelete = (row) => {
    Swal.fire({
      title: "Je i sigurt?",
      text: "Kjo pronë do të fshihet përkohësisht!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Po, fshije!",
      cancelButtonText: "Anulo"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/properties/${row.id}`, {
          preserveScroll: true,
          onSuccess: () => {
            router.reload({ only: ["properties", "pagination"] });
          }
        });
        Swal.fire("U fshi!", "Prona u fshi me sukses.", "success");
      }
    });
  };
  const handleRestore = (row) => {
    Swal.fire({
      title: "Restauro pronën?",
      text: "Prona do të kthehet në listën aktive.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Po, restauroje!",
      cancelButtonText: "Anulo"
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(`/admin/properties/${row.id}/restore`, {}, {
          preserveScroll: true
        });
        Swal.fire("U restaurua!", "Prona u restaurua me sukses.", "success");
      }
    });
  };
  const handlePermanentDelete = (row) => {
    Swal.fire({
      title: "Fshirje përfundimtare?",
      text: "Kjo veprim NUK mund të zhbëhet!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Po, fshije përfundimisht!",
      cancelButtonText: "Anulo"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/properties/${row.id}/force-delete`, {
          preserveScroll: true,
          onSuccess: () => {
            router.reload({ only: ["properties", "pagination"] });
          }
        });
        Swal.fire("U fshi përfundimisht!", "Prona u fshi përgjithmonë.", "success");
      }
    });
  };
  const handleVerify = (row) => {
    router.post(`/admin/properties/${row.id}/verify`, {}, {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ["properties"] });
      }
    });
  };
  const handleToggleSold = (row) => {
    router.put(`/admin/properties/${row.id}/toggle-sold`, {}, {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ["properties"] });
      }
    });
  };
  const applyFilters = () => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    router.get("/admin/properties", {
      ...filterState,
      show_deleted: activeTab === 1 ? "1" : "0",
      page: 1,
      per_page: paginationModel.pageSize
    }, {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs(Box, { sx: { display: "grid", gap: 2 }, children: [
    /* @__PURE__ */ jsx(Box, { sx: {
      mx: { xs: 0, sm: 10, md: 20 },
      borderBottom: 1,
      borderColor: "grey.300"
    }, children: /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onChange: handleTabChange, children: [
      /* @__PURE__ */ jsx(Tab, { label: "Pronat Aktive" }),
      /* @__PURE__ */ jsx(Tab, { label: "Pronat e Fshira" })
    ] }) }),
    /* @__PURE__ */ jsx(Box, { sx: { mx: { xs: 2, sm: 10, md: 20 }, mt: 2 }, children: /* @__PURE__ */ jsx(
      PropertyFilterModal,
      {
        filters: filterState,
        setFilters: setFilterState,
        onApply: applyFilters,
        on: true,
        users
      }
    ) }),
    /* @__PURE__ */ jsx(Box, { sx: { p: { xs: 2, sm: 5 }, mx: { xs: 0, sm: 5, md: 10 } }, children: /* @__PURE__ */ jsxs(Box, { sx: { display: "grid", gap: 3 }, children: [
      /* @__PURE__ */ jsxs(Box, { sx: { fontWeight: "medium", fontSize: "1.1rem" }, children: [
        "Gjithsej: ",
        pagination.total,
        " ",
        pagination.total === 1 ? "pronë" : "prona"
      ] }),
      /* @__PURE__ */ jsx(Box, { sx: { fontWeight: "medium", fontSize: "1.1rem" }, children: /* @__PURE__ */ jsx(Link, { href: "/admin/properties/create", className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", children: "Shto Pronë të Re" }) }),
      /* @__PURE__ */ jsx(Grid, { container: true, spacing: { sm: 2, md: 5, lg: 7 }, justifyContent: "center", children: properties.map((property) => /* @__PURE__ */ jsx(Grid, { children: /* @__PURE__ */ jsx(
        PropertyCard,
        {
          property,
          onView: handleView,
          onEdit: handleEdit,
          onDelete: activeTab === 0 ? handleDelete : null,
          onVerify: activeTab === 0 ? handleVerify : null,
          onToggleSold: activeTab === 0 ? handleToggleSold : null,
          onRestore: activeTab === 1 ? handleRestore : null,
          onPermanentDelete: activeTab === 1 ? handlePermanentDelete : null,
          isDeleted: activeTab === 1
        }
      ) }, property.id)) }),
      /* @__PURE__ */ jsxs(Box, { sx: { display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 2, alignItems: "center", justifyContent: "center", mt: 3 }, children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: paginationModel.page === 0,
            onClick: () => {
              const newPage = paginationModel.page - 1;
              setPaginationModel((prev) => ({ ...prev, page: newPage }));
              router.get("/admin/properties", {
                ...filterState,
                show_deleted: activeTab === 1 ? "1" : "0",
                page: newPage + 1,
                per_page: paginationModel.pageSize
              }, { preserveState: true, preserveScroll: true, replace: true });
            },
            children: "Mëparshme"
          }
        ),
        /* @__PURE__ */ jsxs(Box, { sx: { textAlign: "center" }, children: [
          "Faqja ",
          paginationModel.page + 1,
          " nga ",
          Math.ceil(pagination.total / paginationModel.pageSize)
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: paginationModel.page + 1 >= Math.ceil(pagination.total / paginationModel.pageSize),
            onClick: () => {
              const newPage = paginationModel.page + 1;
              setPaginationModel((prev) => ({ ...prev, page: newPage }));
              router.get("/admin/properties", {
                ...filterState,
                show_deleted: activeTab === 1 ? "1" : "0",
                page: newPage + 1,
                per_page: paginationModel.pageSize
              }, { preserveState: true, preserveScroll: true, replace: true });
            },
            children: "Tjetra"
          }
        )
      ] })
    ] }) })
  ] });
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Properties
}, Symbol.toStringTag, { value: "Module" }));
function UserCard({ user }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const getInitials = (name, surname) => {
    return `${name?.charAt(0) || ""}${surname?.charAt(0) || ""}`.toUpperCase();
  };
  const getRoleColor = (roleId) => {
    const roleColors = {
      1: "bg-red-100 text-red-800",
      2: "bg-blue-100 text-blue-800",
      3: "bg-green-100 text-green-800"
    };
    return roleColors[roleId] || "bg-gray-100 text-gray-800";
  };
  const handleVerify = async () => {
    const result = await Swal.fire({
      title: "Verifiko Përdorues",
      text: "Jeni të sigurt që dëshironi të verifikoni këtë përdorues?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, verifiko",
      cancelButtonText: "Anulo"
    });
    if (result.isConfirmed) {
      router.put(`/admin/users/${user.id}/verify`);
    }
  };
  const handleEdit = () => {
    router.get(`/admin/users/${user.id}/edit`);
  };
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Fshij Përdorues",
      text: "Jeni të sigurt që dëshironi të fshini këtë përdorues?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, fshije",
      cancelButtonText: "Anulo"
    });
    if (result.isConfirmed) {
      setIsDeleting(true);
      router.delete(`/admin/users/${user.id}`, {
        onFinish: () => setIsDeleting(false)
      });
    }
  };
  const handleRestore = async () => {
    const result = await Swal.fire({
      title: "Rikthe Përdorues",
      text: "Jeni të sigurt që dëshironi të riktheni këtë përdorues?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, riktheje",
      cancelButtonText: "Anulo"
    });
    if (result.isConfirmed) {
      router.put(`/admin/users/${user.id}/restore`);
    }
  };
  const handlePermanentDelete = async () => {
    const result = await Swal.fire({
      title: "Fshij Përgjithmonë",
      text: "Jeni të sigurt që dëshironi të fshini përgjithmonë këtë përdorues? Ky veprim nuk mund të kthehet.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#991b1b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Po, fshije përgjithmonë",
      cancelButtonText: "Anulo"
    });
    if (result.isConfirmed) {
      setIsDeleting(true);
      router.delete(`/admin/users/${user.id}/force-delete`, {
        onFinish: () => setIsDeleting(false)
      });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "max-w-md bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-15 h-15 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold", children: getInitials(user.name, user.surname) }),
      /* @__PURE__ */ jsxs("div", { className: "ml-4 flex-1", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-800", children: [
          user.name,
          " ",
          user.surname
        ] }),
        user.role && /* @__PURE__ */ jsx("span", { className: `inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getRoleColor(user.role_id)}`, children: user.role.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      user.email && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(EmailIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: user.email })
      ] }),
      user.phone_number && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(PhoneIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: user.phone_number })
      ] }),
      user.company_name && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(BusinessIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: user.company_name })
      ] }),
      user.address && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(LocationOnIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: user.address })
      ] }),
      user.birth_date && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(CakeIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: new Date(user.birth_date).toLocaleDateString("sq-AL") })
      ] }),
      user.nipt && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(BusinessIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "NIPT: ",
          user.nipt
        ] })
      ] }),
      user.company_phone_number && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(PhoneIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "Tel Kompanie: ",
          user.company_phone_number
        ] })
      ] }),
      user.years_experience && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(BusinessIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "Përvojë: ",
          user.years_experience,
          " vite"
        ] })
      ] }),
      user.finished_projects !== null && user.finished_projects !== void 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(BusinessIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "Projekte: ",
          user.finished_projects
        ] })
      ] }),
      user.website && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(BusinessIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsx("a", { href: user.website, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-blue-600 hover:underline", children: user.website })
      ] }),
      user.year_budget && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(BusinessIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "Buxhet Vjetor: €",
          Number(user.year_budget).toLocaleString()
        ] })
      ] }),
      user.preferred_locations && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
        /* @__PURE__ */ jsx(LocationOnIcon, { className: "text-gray-400", style: { fontSize: 20 } }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
          "Zona: ",
          user.preferred_locations
        ] })
      ] }),
      user.company_description && /* @__PURE__ */ jsxs("div", { className: "mt-2 p-3 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Përshkrimi:" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 line-clamp-3", children: user.company_description })
      ] })
    ] }),
    user.email_verified_at && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 border border-green-300 text-green-700 rounded-full text-xs font-medium", children: [
      /* @__PURE__ */ jsx(VerifiedIcon, { style: { fontSize: 16 } }),
      "Email i Verifikuar"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-gray-200", children: !user.deleted_at ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => router.get(`/admin/users/${user.id}`),
          className: "w-full mb-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium",
          children: "Shiko Detaje"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: [
        !user.email_verified_at && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleVerify,
            className: "flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium",
            children: [
              /* @__PURE__ */ jsx(VerifiedIcon, { style: { fontSize: 18 } }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Verifiko" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleEdit,
            className: "flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium",
            children: [
              /* @__PURE__ */ jsx(EditIcon, { style: { fontSize: 18 } }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Ndrysho" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleDelete,
            disabled: isDeleting,
            className: "flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:bg-gray-400",
            children: [
              /* @__PURE__ */ jsx(DeleteIcon, { style: { fontSize: 18 } }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Fshij" })
            ]
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleRestore,
          className: "flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium",
          children: [
            /* @__PURE__ */ jsx(RestoreIcon, { style: { fontSize: 18 } }),
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Rikthe" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handlePermanentDelete,
          disabled: isDeleting,
          className: "flex items-center justify-center gap-1 px-3 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium disabled:bg-gray-400",
          children: [
            /* @__PURE__ */ jsx(DeleteForeverIcon, { style: { fontSize: 18 } }),
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Fshij Përgjithmonë" })
          ]
        }
      )
    ] }) })
  ] }) });
}
function Users({ users, pagination, filters, roles }) {
  const [activeTab, setActiveTab] = useState(filters.show_deleted || "active");
  const [selectedRole, setSelectedRole] = useState(filters.role_id || "");
  const [verificationStatus, setVerificationStatus] = useState(filters.verified || "");
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    router.get("/admin/users", {
      status: newValue,
      role_id: selectedRole,
      verified: verificationStatus,
      search: searchQuery
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const handleRoleChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);
    router.get("/admin/users", {
      status: activeTab,
      role_id: value,
      verified: verificationStatus,
      search: searchQuery
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const handleVerificationChange = (event) => {
    const value = event.target.value;
    setVerificationStatus(value);
    router.get("/admin/users", {
      status: activeTab,
      role_id: selectedRole,
      verified: value,
      search: searchQuery
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const timeoutId = setTimeout(() => {
      router.get("/admin/users", {
        status: activeTab,
        role_id: selectedRole,
        verified: verificationStatus,
        search: value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  };
  const handlePageChange = (url) => {
    if (url) {
      router.get(url, {}, {
        preserveState: true,
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-200", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleTabChange("active"),
            className: `flex items-center gap-2 px-6 py-4 text-base font-medium transition-colors ${activeTab === "active" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`,
            children: [
              /* @__PURE__ */ jsx(PeopleIcon, {}),
              /* @__PURE__ */ jsx("span", { children: "Aktivë" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleTabChange("deleted"),
            className: `flex items-center gap-2 px-6 py-4 text-base font-medium transition-colors ${activeTab === "deleted" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`,
            children: [
              /* @__PURE__ */ jsx(DeleteIcon, {}),
              /* @__PURE__ */ jsx("span", { children: "Përdorues të Fshirë" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(SearchIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Kërkoni përdorues...",
              value: searchQuery,
              onChange: handleSearchChange,
              className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: selectedRole,
            onChange: handleRoleChange,
            className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Të gjithë rolet" }),
              roles?.map((role) => /* @__PURE__ */ jsx("option", { value: role.id, children: role.name }, role.id))
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: verificationStatus,
            onChange: handleVerificationChange,
            className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Të gjithë" }),
              /* @__PURE__ */ jsx("option", { value: "verified", children: "Të Verifikuar" }),
              /* @__PURE__ */ jsx("option", { value: "unverified", children: "Të Paverifikuar" })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Link, { className: "bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded", href: "/admin/users/create", children: "Shto përdorues" }),
    pagination?.total > 0 && /* @__PURE__ */ jsx("div", { className: "my-4 text-gray-600", children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
      "Gjithsej: ",
      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: pagination.total }),
      " përdorues"
    ] }) }),
    users.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5", children: users.map((user) => /* @__PURE__ */ jsx(UserCard, { user }, user.id)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-600", children: "Nuk u gjetën përdorues" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Provoni të ndryshoni filtrat për të parë më shumë rezultate" })
    ] }),
    pagination?.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(pagination.prev_page_url),
          disabled: !pagination.prev_page_url,
          className: `flex items-center justify-center w-10 h-10 rounded-md border ${pagination.prev_page_url ? "border-gray-300 hover:bg-gray-50 text-gray-700" : "border-gray-200 text-gray-400 cursor-not-allowed"}`,
          children: /* @__PURE__ */ jsx(ChevronLeftIcon, {})
        }
      ),
      pagination.links?.slice(1, -1).map((link, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(link.url),
          className: `w-10 h-10 rounded-md border ${link.active ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 hover:bg-gray-50 text-gray-700"}`,
          children: link.label
        },
        index
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(pagination.next_page_url),
          disabled: !pagination.next_page_url,
          className: `flex items-center justify-center w-10 h-10 rounded-md border ${pagination.next_page_url ? "border-gray-300 hover:bg-gray-50 text-gray-700" : "border-gray-200 text-gray-400 cursor-not-allowed"}`,
          children: /* @__PURE__ */ jsx(ChevronRightIcon, {})
        }
      )
    ] })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users
}, Symbol.toStringTag, { value: "Module" }));
function ViewUser({ user }) {
  const getInitials = (name, surname) => {
    return `${name?.charAt(0) || ""}${surname?.charAt(0) || ""}`.toUpperCase();
  };
  const InfoRow = ({ icon: Icon, label, value, color = "text-gray-400" }) => {
    if (!value && value !== 0) return null;
    return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-gray-50 rounded-lg", children: [
      /* @__PURE__ */ jsx(Icon, { className: color, style: { fontSize: 24 } }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wide", children: label }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-gray-800 mt-1", children: value })
      ] })
    ] });
  };
  const Section = ({ title, children }) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-3 border-b pb-2", children: title }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children })
  ] });
  return /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto p-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg", children: getInitials(user.name, user.surname) }),
      /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold", children: [
          user.name,
          " ",
          user.surname
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
          user.role && /* @__PURE__ */ jsx("span", { className: "bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium", children: user.role.name }),
          user.email_verified_at && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 bg-green-500/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium", children: [
            /* @__PURE__ */ jsx(VerifiedIcon, { style: { fontSize: 16 } }),
            "E Verifikuar"
          ] }),
          user.notifications && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 bg-blue-500/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium", children: [
            /* @__PURE__ */ jsx(NotificationsIcon, { style: { fontSize: 16 } }),
            "Njoftime Aktive"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs(Section, { title: "Informacione Bazë", children: [
        /* @__PURE__ */ jsx(InfoRow, { icon: EmailIcon, label: "Email", value: user.email, color: "text-blue-500" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: PhoneIcon, label: "Numri i Telefonit", value: user.phone_number, color: "text-green-500" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: CakeIcon, label: "Datëlindja", value: user.birth_date, color: "text-pink-500" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: LocationOnIcon, label: "Adresa", value: user.address, color: "text-red-500" })
      ] }),
      ["agency", "bank", "developer"].includes(user.role?.name) && /* @__PURE__ */ jsxs(Section, { title: user.role?.name === "bank" ? "Informacione të Bankës" : user.role?.name === "agency" ? "Informacione të Agjencisë" : "Informacione të Kompanisë", children: [
        /* @__PURE__ */ jsx(InfoRow, { icon: BusinessIcon, label: user.role?.name === "bank" ? "Emri i Bankës" : user.role?.name === "agency" ? "Emri i Agjencisë" : "Emri i Kompanisë", value: user.company_name, color: "text-purple-500" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: BadgeIcon, label: "NIPT", value: user.nipt, color: "text-indigo-500" }),
        user.role?.name === "agency" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(InfoRow, { icon: PhoneIcon, label: "Numri i Telefonit të Agjencisë", value: user.company_phone_number, color: "text-teal-500" }),
          /* @__PURE__ */ jsx(InfoRow, { icon: LanguageIcon, label: "Faqja Zyrtare", value: user.website, color: "text-cyan-500" })
        ] }),
        user.role?.name === "developer" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(InfoRow, { icon: WorkIcon, label: "Vitet e Përvojës", value: user.years_experience, color: "text-orange-500" }),
          /* @__PURE__ */ jsx(InfoRow, { icon: BadgeIcon, label: "Projekte të Përfunduara", value: user.finished_projects, color: "text-amber-500" })
        ] }),
        user.company_description && /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(InfoRow, { icon: DescriptionIcon, label: "Përshkrimi", value: user.company_description, color: "text-gray-500" }) }),
        user.logo_path && /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wide", children: "Logo" }),
          /* @__PURE__ */ jsx("img", { src: `/storage/${user.logo_path}`, alt: "Logo", className: "h-20 w-20 object-cover rounded border shadow" })
        ] })
      ] }),
      user.role?.name === "investor" && /* @__PURE__ */ jsxs(Section, { title: "Informacione të Investitorit", children: [
        /* @__PURE__ */ jsx(InfoRow, { icon: AttachMoneyIcon, label: "Buxheti Vjetor (€)", value: user.year_budget ? `€${Number(user.year_budget).toLocaleString()}` : null, color: "text-green-600" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: MapIcon, label: "Zonat e Preferuara", value: user.preferred_locations, color: "text-blue-600" })
      ] }),
      user.role?.name === "business" && /* @__PURE__ */ jsxs(Section, { title: "Informacione të Biznesit", children: [
        /* @__PURE__ */ jsx(InfoRow, { icon: BusinessIcon, label: "Emri i Kompanisë", value: user.company_name, color: "text-purple-500" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: MapIcon, label: "Zonat e Preferuara për Hapësira Komerciale", value: user.preferred_locations, color: "text-blue-600" })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Statistika", children: [
        /* @__PURE__ */ jsx(InfoRow, { icon: PersonIcon, label: "ID", value: user.id, color: "text-gray-400" }),
        /* @__PURE__ */ jsx(InfoRow, { icon: CakeIcon, label: "Krijuar më", value: new Date(user.created_at).toLocaleDateString("sq-AL"), color: "text-gray-400" }),
        user.email_verified_at && /* @__PURE__ */ jsx(InfoRow, { icon: VerifiedIcon, label: "Verifikuar më", value: new Date(user.email_verified_at).toLocaleDateString("sq-AL"), color: "text-green-500" }),
        user.deleted_at && /* @__PURE__ */ jsx(InfoRow, { icon: PersonIcon, label: "Fshirë më", value: new Date(user.deleted_at).toLocaleDateString("sq-AL"), color: "text-red-500" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => router.get("/admin/users"),
            className: "px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition",
            children: "Kthehu Mbrapa"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => router.get(`/admin/users/${user.id}/edit`),
            className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
            children: "Ndrysho"
          }
        )
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ViewUser
}, Symbol.toStringTag, { value: "Module" }));
const ForgotPassword = () => {
  const { data, setData, post, errors } = useForm({
    email: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/forgot-password/mail");
  };
  const ErrorText2 = ({ field }) => {
    const err = errors?.[field];
    if (!err) return null;
    const text = Array.isArray(err) ? err.join(" ") : err;
    return /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: text });
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen grid ", children: /* @__PURE__ */ jsx("div", { className: "grid", children: /* @__PURE__ */ jsxs("main", { className: "", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center",
        style: { backgroundImage: `url(${backgroundImage})` },
        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-10 text-center overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/90 backdrop-blur-lg px-8 py-12 rounded-2xl shadow-lg w-full max-w-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Harrova fjalekalimin" }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-1", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "email",
              type: "email",
              placeholder: "Shkruaj email/nr.tel",
              value: data.email,
              onChange: handleChange,
              className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx(ErrorText2, { field: "email" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            onClick: handleSubmit,
            className: "w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition",
            children: "Dergo Link"
          }
        )
      ] })
    ] }) })
  ] }) }) }) });
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const Login = () => {
  const { data, setData, post, errors } = useForm({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/login");
  };
  const ErrorText2 = ({ field }) => {
    const err = errors?.[field];
    if (!err) return null;
    const text = Array.isArray(err) ? err.join(" ") : err;
    return /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: text });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Hyr | Gjej-Prone" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Identifikohu për të menaxhuar pronat dhe për të përfituar nga shërbimet tona." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen grid", children: /* @__PURE__ */ jsx("div", { className: "grid", children: /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(${backgroundImage})` },
          children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-10 text-center overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/90 backdrop-blur-lg px-8 py-12 rounded-2xl shadow-lg w-full max-w-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Identifikohu" }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-1", children: "Email/Nr.Tel" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "email",
                type: "email",
                placeholder: "Shkruaj email/nr.tel",
                value: data.email,
                onChange: handleChange,
                className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText2, { field: "email" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-left pb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-1", children: "Fjalëkalimi" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "password",
                type: "password",
                placeholder: "Shkruaj fjalëkalimin",
                value: data.password,
                onChange: handleChange,
                className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx(ErrorText2, { field: "password" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition",
              children: "Hyr"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Nuk ke llogari? " }),
            /* @__PURE__ */ jsx(Link, { href: "/register", className: "text-blue-600 underline font-semibold", children: "Krijo" })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/forgot-password", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 underline", children: "Harrova fjalekalimin" }) })
        ] })
      ] }) })
    ] }) }) })
  ] });
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const Register = () => {
  const [pranimiKushtet, setPranimiKushtet] = useState(false);
  const [gabimKushtet, setGabimKushtet] = useState("");
  const opsionetLlojiPerdoruesi = [
    { value: "individual", label: "Individ" },
    { value: "agency", label: "Agjenci" },
    { value: "bank", label: "Bankë" },
    { value: "developer", label: "Zhvillues/Ndërtues" }
  ];
  const opsionetLlojiPerdoruesiBuyer = [
    { value: "user", label: "Individ" },
    { value: "investor", label: "Investitor" },
    { value: "business", label: "Biznes" }
  ];
  const [opsionetFiltruara, setOpsionetFiltruara] = useState([]);
  const [opsioniZgjedhur, setOpsioniZgjedhur] = useState(null);
  const [hapi, setHapi] = useState(1);
  const [llojiPerdoruesi, setLlojiPerdoruesi] = useState(null);
  const [animacionHapi1, setAnimacionHapi1] = useState(false);
  useEffect(() => {
    if (hapi === 1) setAnimacionHapi1(true);
  }, [hapi]);
  useEffect(() => {
    if (!llojiPerdoruesi) return;
    if (llojiPerdoruesi.value === "buyer") {
      setOpsionetFiltruara(opsionetLlojiPerdoruesiBuyer);
      const opsion = opsionetLlojiPerdoruesiBuyer.find((opt) => opt.value === data.user_type) || null;
      setOpsioniZgjedhur(opsion);
    } else if (llojiPerdoruesi.value === "seller") {
      setOpsionetFiltruara(opsionetLlojiPerdoruesi);
      const opsion = opsionetLlojiPerdoruesi.find((opt) => opt.value === data.user_type) || null;
      setOpsioniZgjedhur(opsion);
    }
  }, [llojiPerdoruesi]);
  const { data, setData, post, errors } = useForm({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    birth_date: null,
    address: "",
    notifications: true,
    company_name: "",
    password: "",
    password_confirmation: "",
    user_type: "",
    // Extra fields
    nipt: "",
    company_phone_number: "",
    years_experience: "",
    company_description: "",
    finished_projects: "",
    website: "",
    year_budget: "",
    preferred_locations: ""
  });
  const [dataZgjedhur, setDataZgjedhur] = useState(null);
  const ndryshoDaten = (date) => {
    setDataZgjedhur(date);
    const formatuar = formatoDaten(date);
    setData("birth_date", formatuar);
  };
  const ndryshoTeDhenat = (e) => {
    setData(e.target.name, e.target.value);
  };
  const formatoDaten = (date) => {
    const viti = date.getFullYear();
    const muaji = String(date.getMonth() + 1).padStart(2, "0");
    const dita = String(date.getDate()).padStart(2, "0");
    return `${viti}-${muaji}-${dita}`;
  };
  const dergoFormen = (e) => {
    e.preventDefault();
    if (!pranimiKushtet) {
      setGabimKushtet("Ju duhet të pranoni Termat dhe Kushtet dhe Politikën e Privatësisë për të vazhduar.");
      return;
    }
    post("/register");
  };
  const zgjedhLlojin = (opsion) => {
    setLlojiPerdoruesi(opsion);
    setHapi(2);
  };
  const TekstGabimi = ({ fusha }) => {
    const gabim = errors?.[fusha];
    if (!gabim) return null;
    const tekst = Array.isArray(gabim) ? gabim.join(" ") : gabim;
    return /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: tekst });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Regjistrohu | Gjej-Prone" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Krijo një llogari të re për të publikuar ose gjetur prona në Shqipëri." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "min-h-screen grid", children: /* @__PURE__ */ jsxs("main", { className: "", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(${backgroundImage})` },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" }),
            " "
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 grid grid-cols-1 place-items-center min-h-[70vh] px-6 pt-10 text-center", children: /* @__PURE__ */ jsxs("div", { className: `bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 md:w-5/12 ${animacionHapi1 ? "translate-x-0 opacity-100" : "translate-x-50 opacity-0"}`, children: [
        hapi === 1 && /* @__PURE__ */ jsxs("div", { className: "p-8 grid grid-cols space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center", children: "Mirë se vini!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-center", children: "Zgjidhni llojin e përdoruesit për të filluar regjistrimin:" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: [
            { value: "seller", label: "Shitës/Dhënës me qira" },
            { value: "buyer", label: "Blerës/Marrës me qira" }
          ].map((opsion) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => zgjedhLlojin(opsion),
              className: `px-4 py-3 rounded-xl shadow-md font-medium transition
                                            ${llojiPerdoruesi && llojiPerdoruesi.value === opsion.value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-blue-400 hover:text-white"}`,
              children: opsion.label
            },
            opsion.value
          )) })
        ] }),
        hapi === 2 && /* @__PURE__ */ jsxs("div", { className: "p-8 flex flex-col space-y-4 transform transition-all duration-700 translate-x-0 opacity-100", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center", children: "Vazhdoni me regjistrimin" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-center mb-4", children: [
            "Ju keni zgjedhur: ",
            /* @__PURE__ */ jsx("strong", { children: llojiPerdoruesi.label })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                name: "user_type",
                value: opsioniZgjedhur,
                onChange: (zgjedhur) => {
                  setOpsioniZgjedhur(zgjedhur);
                  setData("user_type", zgjedhur.value);
                },
                options: opsionetFiltruara,
                placeholder: "Zgjidh Perdoruesin",
                classNamePrefix: "react-select",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    borderColor: "#d1d5db"
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "white"
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#111827"
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "#6b7280"
                  })
                }
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "user_type" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "name",
                placeholder: "Emri",
                value: data.name,
                onChange: ndryshoTeDhenat,
                className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "surname",
                value: data.surname,
                onChange: ndryshoTeDhenat,
                type: "text",
                placeholder: "Mbiemri",
                className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "surname" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "email",
                value: data.email,
                onChange: ndryshoTeDhenat,
                type: "text",
                placeholder: "Email",
                className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "email" }),
            /* @__PURE__ */ jsx(
              PhoneInput,
              {
                international: true,
                defaultCountry: "AL",
                value: data.phone_number,
                onChange: (vlera) => setData("phone_number", vlera),
                className: "phone-input px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "phone_number" }),
            /* @__PURE__ */ jsx(
              DatePicker,
              {
                selected: dataZgjedhur,
                onChange: ndryshoDaten,
                placeholderText: "Datëlindja",
                className: "w-full p-2 rounded-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500",
                dateFormat: "MM/dd/yyyy",
                showMonthDropdown: true,
                showYearDropdown: true,
                dropdownMode: "select"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "birth_date" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "address",
                type: "text",
                value: data.address,
                onChange: ndryshoTeDhenat,
                placeholder: "Adresa/Qyteti",
                className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "address" }),
            ["agency", "bank", "developer"].includes(data.user_type) && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "company_name",
                  type: "text",
                  value: data.company_name,
                  onChange: ndryshoTeDhenat,
                  placeholder: data.user_type === "bank" ? "Emri i Bankës" : data.user_type === "agency" ? "Emri i Agjencisë" : "Emri i Kompanisë",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "company_name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "nipt",
                  type: "text",
                  value: data.nipt,
                  onChange: ndryshoTeDhenat,
                  placeholder: "NIPT",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "nipt" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "company_description",
                  value: data.company_description,
                  onChange: ndryshoTeDhenat,
                  placeholder: data.user_type === "bank" ? "Përshkrimi i Bankës" : data.user_type === "agency" ? "Përshkrimi i Agjencisë" : "Përshkrimi i Kompanisë",
                  rows: "3",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "company_description" })
            ] }),
            data.user_type === "agency" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "company_phone_number",
                  type: "text",
                  value: data.company_phone_number,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Numri i Telefonit të Agjencisë",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "company_phone_number" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "website",
                  type: "url",
                  value: data.website,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Faqja Zyrtare (https://example.com)",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "website" })
            ] }),
            data.user_type === "developer" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "years_experience",
                  type: "number",
                  value: data.years_experience,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Vitet e Përvojës",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "years_experience" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "finished_projects",
                  type: "number",
                  value: data.finished_projects,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Numri i Projekteve të Përfunduara",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "finished_projects" })
            ] }),
            data.user_type === "investor" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "year_budget",
                  type: "number",
                  value: data.year_budget,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Buxheti i Përafërt Vjetor (€)",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "year_budget" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "preferred_locations",
                  type: "text",
                  value: data.preferred_locations,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Zonat e Preferuara (Tiranë, Durrës, Vlorë)",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "preferred_locations" })
            ] }),
            data.user_type === "business" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "preferred_locations",
                  type: "text",
                  value: data.preferred_locations,
                  onChange: ndryshoTeDhenat,
                  placeholder: "Zonat e Preferuara për Hapësira Komerciale",
                  className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                }
              ),
              /* @__PURE__ */ jsx(TekstGabimi, { fusha: "preferred_locations" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                name: "password",
                value: data.password,
                onChange: ndryshoTeDhenat,
                placeholder: "Fjalëkalimi",
                className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsx(TekstGabimi, { fusha: "password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                name: "password_confirmation",
                value: data.password_confirmation,
                onChange: ndryshoTeDhenat,
                placeholder: "Konfirmo Fjalëkalimin",
                className: "px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              }
            ),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.notifications,
                  onChange: (e) => setData("notifications", e.target.checked),
                  className: "h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Dëshiroj të marr njoftime për prona të reja" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: pranimiKushtet,
                  onChange: (e) => {
                    setPranimiKushtet(e.target.checked);
                    if (e.target.checked) setGabimKushtet("");
                  },
                  className: "mt-1 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
                  "Duke krijuar llogarinë, pranoj ",
                  /* @__PURE__ */ jsx(Link, { href: "/terms", children: "Termat dhe Kushtet" }),
                  "dhe ",
                  /* @__PURE__ */ jsx(Link, { href: "/privacy", children: "Politikën e Privatësisë" }),
                  "."
                ] }),
                gabimKushtet && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: gabimKushtet })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setHapi(1),
                className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition",
                children: "Kthehu Mbrapa"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                onClick: dergoFormen,
                className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition",
                children: "Vazhdo"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my-6 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Ke llogari? " }),
          /* @__PURE__ */ jsx(Link, { href: "/login", className: "text-blue-600 underline font-semibold", children: "Logohu" })
        ] })
      ] }) })
    ] }) }) })
  ] });
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const ResetPassword = ({ token, email }) => {
  const { data, setData, post, processing, errors } = useForm({
    token: token || "",
    email: email || "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    setData("email", email);
    setData("token", token);
  }, [email, token]);
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/reset-password", {
      onSuccess: () => setData("password", "", "password_confirmation", "")
    });
  };
  const ErrorText2 = ({ field }) => {
    const err = errors?.[field];
    if (!err) return null;
    const text = Array.isArray(err) ? err.join(" ") : err;
    return /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: text });
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen grid", children: /* @__PURE__ */ jsx("div", { className: "grid", children: /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center",
        style: { backgroundImage: `url(${backgroundImage})` },
        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-10 text-center overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/90 backdrop-blur-lg px-8 py-12 rounded-2xl shadow-lg w-full max-w-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Rivendos fjalëkalimin" }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "email", value: data.email }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "token", value: data.token }),
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-1", children: "Fjalëkalimi i ri" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              name: "password",
              value: data.password,
              onChange: handleChange,
              placeholder: "Shkruaj fjalëkalimin e ri",
              className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx(ErrorText2, { field: "password" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-1", children: "Konfirmo fjalëkalimin" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              name: "password_confirmation",
              value: data.password_confirmation,
              onChange: handleChange,
              placeholder: "Konfirmo fjalëkalimin",
              className: "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx(ErrorText2, { field: "password_confirmation" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition",
            children: "Ndrysho fjalëkalimin"
          }
        )
      ] })
    ] }) })
  ] }) }) }) });
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifySent() {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-100 self py-20 px-4 grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 shadow-md rounded-lg max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Verifiko Email-in" }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-4", children: [
      "Ne kemi derguar nje link verifikimi ne ",
      /* @__PURE__ */ jsx("strong", { children: auth?.user?.email }),
      ". Ju lutem kontrolloni inbox-in tuaj."
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => router.post("/email/resend-verification"),
        className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
        children: "Dergo perseri link verifikimi"
      }
    )
  ] }) }) });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifySent
}, Symbol.toStringTag, { value: "Module" }));
function Forbidden() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-red-600", children: "403" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-4", children: "Akses i Ndaluar" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2 max-w-md", children: "Nuk keni leje për të aksesuar këtë faqe." }),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: "/",
        className: "mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition",
        children: "Kthehu Mbrapa"
      }
    )
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Forbidden
}, Symbol.toStringTag, { value: "Module" }));
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-blue-600", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-4", children: "Faqja nuk u gjet" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2 max-w-md", children: "Faqja që po kërkoni nuk ekziston ose është zhvendosur." }),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: "/",
        className: "mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition",
        children: "Kthehu Mprapa"
      }
    )
  ] });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
const PropertyItem = ({
  id,
  city,
  expires_at,
  created_at,
  street,
  surface,
  surface_2,
  total_rooms,
  total_rooms_2,
  total_bathrooms,
  total_bathrooms_2,
  total_balconies,
  total_balconies_2,
  completed,
  total_floors,
  floor_number,
  year_built,
  description,
  price,
  price_2,
  currency,
  type_of_sale,
  property_type,
  views,
  saved,
  funds,
  architect,
  interior_design,
  onToggleCompleted = null,
  canEdit = false,
  canDelete = false,
  onEdit = null,
  onDelete = null,
  onUpload = null
}) => {
  const [isSaved, setIsSaved] = React.useState(saved);
  const PROPERTY_TYPE_LABELS2 = {
    residential: "Rezidenciale",
    commercial: "Komerciale",
    land: "Tokë",
    others: "Të tjera"
  };
  function isExpired(created_at2, expires_at2) {
    const intervals = {
      "1m": 1,
      "3m": 3,
      "6m": 6,
      "1y": 12
    };
    if (!created_at2 || !expires_at2 || !intervals[expires_at2]) return false;
    const created = new Date(created_at2);
    const expiry = new Date(created.setMonth(created.getMonth() + intervals[expires_at2]));
    return expiry < /* @__PURE__ */ new Date();
  }
  const handleSave = (id2) => {
    router.post(`/property/request/${id2}/toggleSave`, {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setIsSaved(!isSaved);
      },
      onError: () => {
        toast.error("Diçka shkoi keq!");
      }
    });
  };
  const expired = isExpired(created_at, expires_at);
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 relative", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 p-5 space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 grid grid-cols-2 md:grid-cols-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[auto_1fr] items-center gap-1", children: [
          /* @__PURE__ */ jsx(Tag, { size: 16, className: "text-gray-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm uppercase text-gray-600 font-medium", children: type_of_sale === "sale" ? "Per Blerje" : "Per Qira" })
        ] }),
        !canEdit && /* @__PURE__ */ jsx("div", { className: "grid justify-items-end md:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleSave(id),
            className: "text-gray-400 hover:text-yellow-400 transition-colors p-1",
            children: /* @__PURE__ */ jsx(Bookmark, { size: 34, fill: isSaved ? "#facc15" : "none" })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-9 grid grid-cols-[1fr_auto_auto_auto] justify-items-end items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsxs("span", { className: "bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg whitespace-nowrap", children: [
          price.toLocaleString(),
          "-",
          price_2.toLocaleString(),
          " ",
          currency
        ] }),
        views > 0 && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[auto_auto] items-center gap-2 bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg", children: [
          /* @__PURE__ */ jsx("span", { children: views }),
          /* @__PURE__ */ jsx(Eye, { size: 16 })
        ] }),
        !canEdit && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleSave(id),
            className: "hidden md:block text-gray-400 hover:text-yellow-400 transition-colors p-1",
            children: /* @__PURE__ */ jsx(Bookmark, { size: 36, fill: isSaved ? "#facc15" : "none" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 line-clamp-1", children: PROPERTY_TYPE_LABELS2[property_type] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm line-clamp-1", children: [
        street,
        ", ",
        city
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-gray-600 text-sm mt-2", children: [
      total_rooms > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Bed, { size: 16 }),
        " ",
        total_rooms,
        "-",
        total_rooms_2,
        " dhoma"
      ] }),
      total_bathrooms > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Bath, { size: 16 }),
        " ",
        total_bathrooms,
        "-",
        total_bathrooms_2,
        " banjo"
      ] }),
      total_balconies > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Home, { size: 16 }),
        " ",
        total_balconies,
        "-",
        total_balconies_2,
        " ballkone"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Maximize2, { size: 16 }),
        " ",
        surface,
        "-",
        surface_2,
        " m²"
      ] }),
      floor_number != null && floor_number !== 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Layers, { size: 16 }),
        " Kati ",
        floor_number
      ] }),
      completed === true && /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold", children: "E Perfunduar" }),
      canEdit && architect === true && /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-semibold", children: "Kërkon Arkitekt" }),
      canEdit && interior_design === true && /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-semibold", children: "Kërkon Interior Dizajner" })
    ] }),
    description && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm line-clamp-3", children: description }),
    (canEdit || canDelete) && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
      canEdit && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onEdit?.(id),
          className: "flex-1 text-sm border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition",
          children: "Ndrysho"
        }
      ),
      canDelete && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onDelete?.(id),
          className: "flex-1 text-sm border border-red-300 text-red-600 rounded-lg py-2 hover:bg-red-50 transition",
          children: "Fshi"
        }
      ),
      expired && canEdit && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onUpload?.(id),
          className: "flex-1 text-sm border border-yellow-300 text-yellow-700 rounded-lg py-2 hover:bg-yellow-50 transition",
          children: "Aktivizo Përsëri"
        }
      ),
      canEdit && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onToggleCompleted?.(id, !completed),
          className: `flex-1 text-sm border ${completed ? "border-orange-300 text-orange-600 rounded-lg py-2 hover:bg-orange-50 transition" : "border-green-300 text-green-600 rounded-lg py-2 hover:bg-green-50 transition"}`,
          children: completed ? "Shëno si e Papërfunduar" : "Shëno si e Përfunduar"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
      Link,
      {
        href: `/property/request/${id}`,
        className: "block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition",
        children: "Shiko detajet"
      }
    ) })
  ] }) });
};
const PropertyRequests$1 = ({ propertyRequests }) => {
  const { auth } = usePage().props;
  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    currency: "EUR",
    sale_type: "",
    types: [],
    elevator: false,
    mortgage: false,
    rooms_min: "",
    rooms_max: "",
    bathrooms_min: "",
    bathrooms_max: "",
    surface_min: "",
    surface_max: "",
    balconies_min: "",
    balconies_max: "",
    user_id: "",
    parkim: false,
    mobilim: false,
    saved: false
  });
  const reloadProperties = () => {
    router.get("/property/requests/all", filters, {
      preserveState: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1", children: [
    /* @__PURE__ */ jsx(
      PropertyFilter,
      {
        filters,
        setFilters,
        onApply: reloadProperties
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Kërkesat e listuara" }),
        auth?.user && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              const newSavedValue = !filters.saved;
              setFilters({ ...filters, saved: newSavedValue });
              router.get("/property/requests/all", { ...filters, saved: newSavedValue }, {
                preserveState: true,
                replace: true
              });
            },
            className: `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${filters.saved ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
            children: [
              /* @__PURE__ */ jsx(Bookmark, { size: 20, fill: filters.saved ? "#000" : "none" }),
              filters.saved ? "Shfaq të gjitha" : "Vetëm të ruajtura"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: propertyRequests?.data?.length > 0 ? propertyRequests.data.map((p) => /* @__PURE__ */ jsx(PropertyItem, { ...p }, p.id)) : /* @__PURE__ */ jsx("div", { className: "col-span-3 text-center text-gray-500", children: "Nuk ka kërkesa të listuara." }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Pagination, { links: propertyRequests.links }) })
    ] })
  ] });
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PropertyRequests$1
}, Symbol.toStringTag, { value: "Module" }));
const AllProperties = ({ properties }) => {
  const { auth } = usePage().props;
  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    currency: "EUR",
    sale_type: "",
    types: [],
    elevator: false,
    mortgage: false,
    mobilim: false,
    parking: false,
    rooms_min: "",
    rooms_max: "",
    bathrooms_min: "",
    bathrooms_max: "",
    surface_min: "",
    surface_max: "",
    balconies_min: "",
    balconies_max: "",
    saved: false
  });
  const reload = () => {
    router.get("/listed-properties", filters, {
      preserveState: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Pronat e Listuara | Gjej-Prone" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Shiko të gjitha pronat e listuara për shitje ose qira në platformën tonë." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1", children: [
      /* @__PURE__ */ jsx(
        PropertyFilter,
        {
          filters,
          setFilters,
          onApply: reload
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Pronat e listuara" }),
          auth?.user && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                const newSavedValue = !filters.saved;
                setFilters({ ...filters, saved: newSavedValue });
                router.get("/listed-properties", { ...filters, saved: newSavedValue }, {
                  preserveState: true,
                  replace: true
                });
              },
              className: `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${filters.saved ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
              children: [
                /* @__PURE__ */ jsx(Bookmark, { size: 20, fill: filters.saved ? "#000" : "none" }),
                filters.saved ? "Shfaq të gjitha" : "Vetëm të ruajtura"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: properties?.data?.length > 0 ? properties.data.map((p) => /* @__PURE__ */ jsx(PropertyItem$1, { ...p, image_paths: p.images }, p.id)) : /* @__PURE__ */ jsx("div", { className: "col-span-3 text-center text-gray-500", children: "Nuk ka prona të listuara." }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Pagination, { links: properties.links }) })
      ] })
    ] })
  ] });
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AllProperties
}, Symbol.toStringTag, { value: "Module" }));
function MapPickerRange({ lat, lng, onSelect, zoneRadius }) {
  const MapClickHandler = () => {
    useMapEvents({
      async click(e) {
        const { lat: lat2, lng: lng2 } = e.latlng;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat2}&lon=${lng2}&zoom=18&addressdetails=1`,
            {
              headers: {
                "User-Agent": "property-market/1.0 (contact@property-market.al)",
                "Accept": "application/json"
              }
            }
          );
          const data = await res.json();
          const address = data?.address || {};
          const road = address.road || address.pedestrian || address.footway || address.residential || address.neighbourhood || address.suburb || address.city_district || address.village || "";
          onSelect({ lat: lat2, lng: lng2, road });
        } catch (err) {
          console.error("Reverse geocoding failed", err);
          onSelect({ lat: lat2, lng: lng2, road: "" });
        }
      }
    });
    return null;
  };
  return /* @__PURE__ */ jsxs(MapContainer, { center: [lat || 41.3275, lng || 19.8189], zoom: 13, style: { height: "400px", width: "100%" }, children: [
    /* @__PURE__ */ jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
    lat && lng && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Circle, { center: [lat, lng], radius: zoneRadius, pathOptions: { color: "blue", fillOpacity: 0.2 } }) }),
    /* @__PURE__ */ jsx(MapClickHandler, {})
  ] });
}
const inputBase$1 = "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all placeholder-gray-400";
const labelBase$1 = "block text-sm font-medium text-gray-700 mb-1";
const errorBase$1 = "text-sm text-red-500 mt-1";
function PropertyRequest({ isAdmin, users }) {
  const { data, setData, post, processing, errors } = useForm({
    type_of_sale: "",
    user_id: "",
    property_type: "",
    property_category: "",
    city: "",
    street: "",
    latitude: "",
    longitude: "",
    zone_radious: 500,
    surface: "",
    surface_2: "",
    price: "",
    price_2: "",
    currency: "EUR",
    description: "",
    total_rooms: "",
    total_rooms_2: "",
    total_bathrooms: "",
    total_bathrooms_2: "",
    total_balconies: "",
    total_balconies_2: "",
    floor_number: "",
    total_floors: "",
    year_built: "",
    ashensor: false,
    hipoteke: false,
    interior_design: false,
    architect: false,
    expires_at: "",
    parkim: false,
    funds: "",
    tracking_phone: "",
    tracking_email: ""
  });
  const [zoneRadius, setZoneRadius] = useState(500);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [selectedBashki, setSelectedBashki] = useState(null);
  const saleOptions = [
    { value: "", label: "Zgjidh Llojin e Transaksionit" },
    { value: "sale", label: "Blerje" },
    { value: "rent", label: "Qira" }
  ];
  const typeOfProperties = [
    { value: "residential", label: "Rezidenciale" },
    { value: "commercial", label: "Komerciale" },
    { value: "land", label: "Tokë" },
    { value: "others", label: "Të tjera" }
  ];
  const expiresAtOptions = [
    { value: "", label: "Zgjidh afatin" },
    { value: "1m", label: "Deri në 1 muaj" },
    { value: "3m", label: "Deri në 3 muaj" },
    { value: "6m", label: "Deri në 6 muaj" },
    { value: "1y", label: "Deri në 1 vit" }
  ];
  const fundingSourceOptions2 = [
    { value: "", label: "Zgjidh burimin e financimit" },
    { value: "kredi", label: "Kredi" },
    { value: "kursime", label: "Kursime" }
  ];
  const subTypeProperties2 = {
    residential: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    commercial: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    land: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    others: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const dynamicFieldsMap = {
    apartment: [
      { value: ["total_rooms", "total_rooms_2"], type: "minmax", label: "Numri i dhomave", placeholder: ["Min", "Max"] },
      { value: ["total_bathrooms", "total_bathrooms_2"], type: "minmax", label: "Numri i Banjove", placeholder: ["Min", "Max"] },
      { value: ["total_balconies", "total_balconies_2"], type: "minmax", label: "Numri i Ballkoneve", placeholder: ["Min", "Max"] },
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 5" }
    ],
    house: [
      { value: ["total_rooms", "total_rooms_2"], type: "minmax", label: "Numri i dhomave", placeholder: ["Min", "Max"] },
      { value: ["total_bathrooms", "total_bathrooms_2"], type: "minmax", label: "Numri i Banjove", placeholder: ["Min", "Max"] },
      { value: "total_floors", type: "number", label: "Numri i Kateve të Ndërtimit", placeholder: "p.sh. 3" },
      { value: ["total_balconies", "total_balconies_2"], type: "minmax", label: "Numri i Ballkoneve", placeholder: ["Min", "Max"] }
    ],
    office: [
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 2" }
    ]
  };
  const renderDynamicFields = (selectedSubtype, data2, setData2) => {
    if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
      return null;
    }
    return dynamicFieldsMap[selectedSubtype].map((field) => {
      const isYearBuilt = field.value === "year_built";
      if (field.type === "minmax") {
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase$1, children: field.label }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data2[field.value[0]] || "",
                placeholder: field.placeholder[0],
                onChange: (e) => setData2(field.value[0], e.target.value),
                className: inputBase$1
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data2[field.value[1]] || "",
                placeholder: field.placeholder[1],
                onChange: (e) => setData2(field.value[1], e.target.value),
                className: inputBase$1
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ErrorText, { field: field.value[0], errors }),
          /* @__PURE__ */ jsx(ErrorText, { field: field.value[1], errors })
        ] }, field.label);
      }
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelBase$1, children: field.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: field.type,
            value: data2[field.value] || "",
            placeholder: field.placeholder || "",
            onChange: (e) => setData2(field.value, e.target.value),
            ...isYearBuilt ? { min: 1900, max: 2050 } : {},
            className: inputBase$1
          }
        ),
        /* @__PURE__ */ jsx(ErrorText, { field: field.value, errors })
      ] }, field.value);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/property/request");
  };
  const loadUserOptions = (inputValue, callback) => {
    const filteredUsers = users.filter(
      (user) => `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
    ).map((user) => ({
      value: user.id,
      label: `${user.name} ${user.surname}`
    }));
    callback(filteredUsers);
  };
  return /* @__PURE__ */ jsx("div", { className: "pt-20 bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-4 pb-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-5 pt-4 text-gray-800 opacity-0 animate-fade-in-up", children: "Shto Kerkese të Re" }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            isAdmin && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Zgjidh Përdoruesin" }),
              /* @__PURE__ */ jsx(
                AsyncSelect,
                {
                  cacheOptions: true,
                  loadOptions: loadUserOptions,
                  defaultOptions: users.map((user) => ({
                    value: user.id,
                    label: `${user.name} ${user.surname}`
                  })),
                  onChange: (selected) => setData("user_id", selected ? selected.value : ""),
                  placeholder: "Kërko përdoruesin...",
                  classNamePrefix: "react-select"
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "user_id", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Lloji i Transaksionit *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "type_of_sale",
                  value: saleOptions.find((o) => o.value === data.type_of_sale) || null,
                  onChange: (selected) => {
                    setData("type_of_sale", selected ? selected.value : "");
                  },
                  options: saleOptions,
                  placeholder: "Zgjidh llojin",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "type_of_sale", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Lloji i Pronës *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "property_type",
                  value: typeOfProperties.find((o) => o.value === data.property_type) || null,
                  onChange: (selected) => {
                    setData("property_type", selected ? selected.value : "");
                    setData("property_category", "");
                  },
                  options: typeOfProperties,
                  placeholder: "Zgjidh llojin",
                  classNamePrefix: "react-select z-50",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "property_type", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Kategoria e Pronës *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "property_category",
                  value: data.property_type ? subTypeProperties2[data.property_type].find((o) => o.value === data.property_category) || null : null,
                  onChange: (selected) => setData("property_category", selected ? selected.value : ""),
                  options: data.property_type ? subTypeProperties2[data.property_type] : [],
                  isDisabled: !data.property_type,
                  placeholder: "Zgjidh kategorinë",
                  classNamePrefix: "react-select z-50",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "property_category", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Qyteti *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  value: selectedBashki,
                  onChange: (selected) => {
                    setSelectedBashki(selected);
                    setData("city", selected ? selected.label : "");
                  },
                  menuPortalTarget: document.body,
                  options: locations.cities,
                  placeholder: "Zgjidh Bashkinë",
                  classNamePrefix: "react-select z-50",
                  isDisabled: !locations.cities.length
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "city", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Afati *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "expires_at",
                  value: expiresAtOptions.find((o) => o.value === data.expires_at) || expiresAtOptions[0],
                  onChange: (selected) => setData("expires_at", selected ? selected.value : ""),
                  options: expiresAtOptions,
                  placeholder: "Zgjidh afatin",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "expires_at", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Burimi i Financimit *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "funds",
                  value: fundingSourceOptions2.find((o) => o.value === data.funds) || fundingSourceOptions2[0],
                  onChange: (selected) => setData("funds", selected ? selected.value : ""),
                  options: fundingSourceOptions2,
                  placeholder: "Zgjidh burimin e financimit",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "funds", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Sipërfaqja *" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.surface || "",
                    placeholder: "Min",
                    onChange: (e) => setData("surface", e.target.value),
                    className: inputBase$1
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.surface_2 || "",
                    placeholder: "Max",
                    onChange: (e) => setData("surface_2", e.target.value),
                    className: inputBase$1
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ErrorText, { field: "surface", errors }),
              /* @__PURE__ */ jsx(ErrorText, { field: "surface_2", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Çmimi *" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.price || "",
                    placeholder: "Min",
                    onChange: (e) => setData("price", e.target.value),
                    className: inputBase$1
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.price_2 || "",
                    placeholder: "Max",
                    onChange: (e) => setData("price_2", e.target.value),
                    className: inputBase$1
                  }
                ),
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    name: "currency",
                    className: "mt-1 min-w-24",
                    value: data.currency ? { value: data.currency, label: data.currency } : { value: "EUR", label: "EUR" },
                    onChange: (selected) => {
                      setData("currency", selected ? selected.value : "");
                    },
                    options: [
                      { value: "EUR", label: "EUR" },
                      { value: "USD", label: "USD" },
                      { value: "ALL", label: "ALL" }
                    ],
                    classNamePrefix: "react-select",
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "transparent",
                        borderColor: "#d1d5db"
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "white"
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "#111827"
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#6b7280"
                      })
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ErrorText, { field: "price", errors }),
              /* @__PURE__ */ jsx(ErrorText, { field: "price_2", errors })
            ] }),
            renderDynamicFields(data.property_category, data, setData),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Vendndodhja në hartë *" }),
              /* @__PURE__ */ jsx(
                MapPickerRange,
                {
                  lat: coords.lat,
                  lng: coords.lng,
                  zoneRadius,
                  className: "relative z-0",
                  style: { zIndex: 0 },
                  onSelect: (location) => {
                    setCoords({ lat: location.lat, lng: location.lng });
                    setData("latitude", location.lat);
                    setData("longitude", location.lng);
                    setData("street", location.road);
                  }
                }
              ),
              errors.latitude && /* @__PURE__ */ jsx("p", { className: errorBase$1, children: errors.latitude }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Zgjedh rrezen (m)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "range",
                    min: 100,
                    max: 5e3,
                    step: 50,
                    value: zoneRadius,
                    onChange: (e) => {
                      setZoneRadius(e.target.value);
                      setData("zone_radious", e.target.value);
                    },
                    className: "w-full"
                  }
                ),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                  "Rreze: ",
                  zoneRadius,
                  "m"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 opacity-0 animate-fade-in-up", style: { animationDelay: "0.8s" }, children: [
            /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Përshkrimi" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: inputBase$1 + " h-32 resize-none",
                placeholder: "Shkruani detaje të pronës..."
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: errorBase$1, children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Detaje Ekstra" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.ashensor,
                  onChange: (e) => setData("ashensor", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me Ashensor" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.hipoteke,
                  onChange: (e) => setData("hipoteke", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me Hipoteke" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.parkim,
                  onChange: (e) => setData("parkim", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me Post Parkimi" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gray-50 p-4 rounded-xl border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Shërbime Ekstra" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.interior_design,
                  onChange: (e) => {
                    setData("interior_design", e.target.checked);
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
                "Me nevojitet Interior Dezajner (per te me bere mobilimin) - ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://linktr.ee/VirtuNEX?utm_source=linktree_profile_share&ltsid=7e78dae2-3f91-43bc-a0eb-9ebd00ee835d",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-blue-600 underline hover:text-blue-800",
                    children: "Cmimi"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.architect,
                  onChange: (e) => {
                    setData("architect", e.target.checked);
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
                "Me nevojitet Arkitekt (per te me verifikuar siperfaqen) - ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://linktr.ee/VirtuNEX?utm_source=linktree_profile_share&ltsid=7e78dae2-3f91-43bc-a0eb-9ebd00ee835d",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-blue-600 underline hover:text-blue-800",
                    children: "Cmimi"
                  }
                )
              ] })
            ] })
          ] }),
          isAdmin && /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Të Dhëna për Gjurmim (Vetëm Admin)" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Numri i Telefonit për Gjurmim" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.tracking_phone,
                  onChange: (e) => setData("tracking_phone", e.target.value),
                  placeholder: "Numri i telefonit për gjurmim...",
                  className: inputBase$1
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "tracking_phone", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase$1, children: "Email për Gjurmim" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: data.tracking_email,
                  onChange: (e) => setData("tracking_email", e.target.value),
                  placeholder: "Email për gjurmim...",
                  className: inputBase$1
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "tracking_email", errors })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl opacity-0 animate-fade-in-up",
              style: { animationDelay: "1s" },
              children: "Shto Kerkesen"
            }
          )
        ]
      }
    )
  ] }) });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PropertyRequest
}, Symbol.toStringTag, { value: "Module" }));
const inputBase = "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all placeholder-gray-400";
const labelBase = "block text-sm font-medium text-gray-700 mb-1";
const errorBase = "text-sm text-red-500 mt-1";
function PropertyRequestEdit({ propertyRequest, isAdmin, users }) {
  const { data, setData, put, processing, errors } = useForm({
    type_of_sale: propertyRequest.type_of_sale,
    user_id: propertyRequest.user_id || "",
    property_type: propertyRequest.property_type,
    property_category: propertyRequest.property_category,
    city: propertyRequest.city,
    street: propertyRequest.street,
    latitude: propertyRequest.latitude,
    longitude: propertyRequest.longitude,
    zone_radious: propertyRequest.zone_radious || 500,
    surface: propertyRequest.surface,
    surface_2: propertyRequest.surface_2,
    price: propertyRequest.price,
    price_2: propertyRequest.price_2,
    currency: propertyRequest.currency,
    description: propertyRequest.description,
    total_rooms: propertyRequest.total_rooms,
    total_rooms_2: propertyRequest.total_rooms_2,
    total_bathrooms: propertyRequest.total_bathrooms,
    total_bathrooms_2: propertyRequest.total_bathrooms_2,
    total_balconies: propertyRequest.total_balconies,
    total_balconies_2: propertyRequest.total_balconies_2,
    floor_number: propertyRequest.floor_number,
    total_floors: propertyRequest.total_floors,
    year_built: propertyRequest.year_built,
    ashensor: propertyRequest.ashensor,
    hipoteke: propertyRequest.hipoteke,
    interior_design: propertyRequest.interior_design,
    architect: propertyRequest.architect,
    expires_at: propertyRequest.expires_at,
    parkim: propertyRequest.parkim,
    funds: propertyRequest.funds || "",
    tracking_phone: propertyRequest.tracking_phone || "",
    tracking_email: propertyRequest.tracking_email || ""
  });
  const [zoneRadius, setZoneRadius] = useState(data.zone_radious);
  const [coords, setCoords] = useState({ lat: data.latitude, lng: data.longitude });
  const saleOptions = [
    { value: "", label: "Zgjidh Llojin e Transaksionit" },
    { value: "sale", label: "Blerje" },
    { value: "rent", label: "Qira" }
  ];
  const typeOfProperties = [
    { value: "residential", label: "Rezidenciale" },
    { value: "commercial", label: "Komerciale" },
    { value: "land", label: "Tokë" },
    { value: "others", label: "Të tjera" }
  ];
  const subTypeProperties2 = {
    residential: [
      { value: "apartment", label: "Apartament" },
      { value: "house", label: "Shtëpi Private" },
      { value: "kategori te tjera", label: "Kategori të tjera" }
    ],
    commercial: [
      { value: "office", label: "Zyrë" },
      { value: "warehouse", label: "Magazinë" }
    ],
    land: [
      { value: "agricultural", label: "Tokë Bujqësore" },
      { value: "truall", label: "Truall" }
    ],
    others: [
      { value: "parkim", label: "Parkim" },
      { value: "kategori_te_tjera", label: "Kategori të tjera" }
    ]
  };
  const dynamicFieldsMap = {
    apartment: [
      { value: ["total_rooms", "total_rooms_2"], type: "minmax", label: "Numri i dhomave", placeholder: ["Min", "Max"] },
      { value: ["total_bathrooms", "total_bathrooms_2"], type: "minmax", label: "Numri i Banjove", placeholder: ["Min", "Max"] },
      { value: ["total_balconies", "total_balconies_2"], type: "minmax", label: "Numri i Ballkoneve", placeholder: ["Min", "Max"] },
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 5" }
    ],
    house: [
      { value: ["total_rooms", "total_rooms_2"], type: "minmax", label: "Numri i dhomave", placeholder: ["Min", "Max"] },
      { value: ["total_bathrooms", "total_bathrooms_2"], type: "minmax", label: "Numri i Banjove", placeholder: ["Min", "Max"] },
      { value: "total_floors", type: "number", label: "Numri i Kateve të Ndërtimit", placeholder: "p.sh. 3" },
      { value: ["total_balconies", "total_balconies_2"], type: "minmax", label: "Numri i Ballkoneve", placeholder: ["Min", "Max"] }
    ],
    office: [
      { value: "floor_number", type: "number", label: "Kati", placeholder: "p.sh. 2" }
    ]
  };
  const expiresAtOptions = [
    { value: "", label: "Zgjidh afatin" },
    { value: "1m", label: "Deri në 1 muaj" },
    { value: "3m", label: "Deri në 3 muaj" },
    { value: "6m", label: "Deri në 6 muaj" },
    { value: "1y", label: "Deri në 1 vit" }
  ];
  const renderDynamicFields = (selectedSubtype, data2, setData2) => {
    if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
      return null;
    }
    return dynamicFieldsMap[selectedSubtype].map((field) => {
      const isYearBuilt = field.value === "year_built";
      if (field.type === "minmax") {
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelBase, children: field.label }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data2[field.value[0]] || "",
                placeholder: field.placeholder[0],
                onChange: (e) => setData2(field.value[0], e.target.value),
                className: inputBase
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data2[field.value[1]] || "",
                placeholder: field.placeholder[1],
                onChange: (e) => setData2(field.value[1], e.target.value),
                className: inputBase
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ErrorText, { field: field.value[0], errors }),
          /* @__PURE__ */ jsx(ErrorText, { field: field.value[1], errors })
        ] }, field.label);
      }
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelBase, children: field.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: field.type,
            value: data2[field.value] || "",
            placeholder: field.placeholder || "",
            onChange: (e) => setData2(field.value, e.target.value),
            ...isYearBuilt ? { min: 1900, max: 2050 } : {},
            className: inputBase
          }
        ),
        /* @__PURE__ */ jsx(ErrorText, { field: field.value, errors })
      ] }, field.value);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/property/request/${propertyRequest.id}`);
  };
  const loadUserOptions = (inputValue, callback) => {
    const filteredUsers = users.filter(
      (user) => `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
    ).map((user) => ({
      value: user.id,
      label: `${user.name} ${user.surname}`
    }));
    callback(filteredUsers);
  };
  return /* @__PURE__ */ jsx("div", { className: "pt-20 bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-4 pb-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-5 pt-4 text-gray-800 opacity-0 animate-fade-in-up", children: "Perditeso Kerkesen" }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsx("div", { children: isAdmin && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Zgjidh Përdoruesin *" }),
              /* @__PURE__ */ jsx(
                AsyncSelect,
                {
                  cacheOptions: true,
                  loadOptions: loadUserOptions,
                  defaultOptions: users.map((user) => ({
                    value: user.id,
                    label: `${user.name} ${user.surname}`
                  })),
                  value: data.user_id ? users.find((user) => user.id === data.user_id) ? { value: data.user_id, label: `${users.find((user) => user.id === data.user_id).name} ${users.find((user) => user.id === data.user_id).surname}` } : null : null,
                  onChange: (selected) => setData("user_id", selected ? selected.value : ""),
                  placeholder: "Kërko përdoruesin...",
                  classNamePrefix: "react-select"
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "user_id", errors })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Lloji i Transaksionit *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "type_of_sale",
                  value: saleOptions.find((o) => o.value === data.type_of_sale) || null,
                  onChange: (selected) => {
                    setData("type_of_sale", selected ? selected.value : "");
                  },
                  options: saleOptions,
                  placeholder: "Zgjidh llojin",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "type_of_sale", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Lloji i Pronës *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "property_type",
                  value: typeOfProperties.find((o) => o.value === data.property_type) || null,
                  onChange: (selected) => {
                    setData("property_type", selected ? selected.value : "");
                    setData("property_category", "");
                  },
                  options: typeOfProperties,
                  placeholder: "Zgjidh llojin",
                  classNamePrefix: "react-select z-50",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "property_type", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Kategoria e Pronës *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "property_category",
                  value: data.property_type ? subTypeProperties2[data.property_type].find((o) => o.value === data.property_category) || null : null,
                  onChange: (selected) => setData("property_category", selected ? selected.value : ""),
                  options: data.property_type ? subTypeProperties2[data.property_type] : [],
                  isDisabled: !data.property_type,
                  placeholder: "Zgjidh kategorinë",
                  classNamePrefix: "react-select z-50",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "property_category", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Qyteti *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  value: locations.cities.find(
                    (city) => city.label === data.city
                  ) || null,
                  onChange: (selected) => {
                    setData("city", selected ? selected.label : "");
                  },
                  menuPortalTarget: document.body,
                  options: locations.cities,
                  placeholder: "Zgjidh Bashkinë",
                  classNamePrefix: "react-select z-50",
                  isDisabled: !locations.cities.length
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "city", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Afati *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "expires_at",
                  value: expiresAtOptions.find((o) => o.value === data.expires_at) || expiresAtOptions[0],
                  onChange: (selected) => setData("expires_at", selected ? selected.value : ""),
                  options: expiresAtOptions,
                  placeholder: "Zgjidh afatin",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "expires_at", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Burimi i Financimit *" }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  name: "funds",
                  value: fundingSourceOptions.find((o) => o.value === data.funds) || fundingSourceOptions[0],
                  onChange: (selected) => setData("funds", selected ? selected.value : ""),
                  options: fundingSourceOptions,
                  placeholder: "Zgjidh burimin e financimit",
                  classNamePrefix: "react-select",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor: "#d1d5db"
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280"
                    })
                  }
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "funds", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Sipërfaqja *" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.surface || "",
                    placeholder: "Min",
                    onChange: (e) => setData("surface", e.target.value),
                    className: inputBase
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.surface_2 || "",
                    placeholder: "Max",
                    onChange: (e) => setData("surface_2", e.target.value),
                    className: inputBase
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ErrorText, { field: "surface", errors }),
              /* @__PURE__ */ jsx(ErrorText, { field: "surface_2", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Çmimi *" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.price || "",
                    placeholder: "Min",
                    onChange: (e) => setData("price", e.target.value),
                    className: inputBase
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.price_2 || "",
                    placeholder: "Max",
                    onChange: (e) => setData("price_2", e.target.value),
                    className: inputBase
                  }
                ),
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    name: "currency",
                    className: "mt-1 min-w-24",
                    value: data.currency ? { value: data.currency, label: data.currency } : { value: "EUR", label: "EUR" },
                    onChange: (selected) => {
                      setData("currency", selected ? selected.value : "");
                    },
                    options: [
                      { value: "EUR", label: "EUR" },
                      { value: "USD", label: "USD" },
                      { value: "ALL", label: "ALL" }
                    ],
                    classNamePrefix: "react-select",
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "transparent",
                        borderColor: "#d1d5db"
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "white"
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "#111827"
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#6b7280"
                      })
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ErrorText, { field: "price", errors }),
              /* @__PURE__ */ jsx(ErrorText, { field: "price_2", errors })
            ] }),
            renderDynamicFields(data.property_category, data, setData),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Vendndodhja në hartë *" }),
              /* @__PURE__ */ jsx(
                MapPickerRange,
                {
                  lat: coords.lat,
                  lng: coords.lng,
                  zoneRadius,
                  className: "relative z-0",
                  style: { zIndex: 0 },
                  onSelect: (location) => {
                    setCoords({ lat: location.lat, lng: location.lng });
                    setData("latitude", location.lat);
                    setData("longitude", location.lng);
                    setData("street", location.road);
                  }
                }
              ),
              errors.latitude && /* @__PURE__ */ jsx("p", { className: errorBase, children: errors.latitude }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                /* @__PURE__ */ jsx("label", { className: labelBase, children: "Zgjedh rrezen (m)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "range",
                    min: 100,
                    max: 5e3,
                    step: 50,
                    value: zoneRadius,
                    onChange: (e) => {
                      setZoneRadius(e.target.value);
                      setData("zone_radious", e.target.value);
                    },
                    className: "w-full"
                  }
                ),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                  "Rreze: ",
                  zoneRadius,
                  "m"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 opacity-0 animate-fade-in-up", style: { animationDelay: "0.8s" }, children: [
            /* @__PURE__ */ jsx("label", { className: labelBase, children: "Përshkrimi" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: inputBase + " h-32 resize-none",
                placeholder: "Shkruani detaje të pronës..."
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: errorBase, children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-gray-50 p-4 rounded-xl border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Detaje Teknike" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.ashensor,
                  onChange: (e) => setData("ashensor", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me Ashensor" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.hipoteke,
                  onChange: (e) => setData("hipoteke", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me Hipoteke" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.parkim,
                  onChange: (e) => setData("parkim", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me Post Parkimi" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gray-50 p-4 rounded-xl border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Shërbime Ekstra" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.interior_design,
                  onChange: (e) => {
                    setData("interior_design", e.target.checked);
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me nevojitet Interior Design" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.architect,
                  onChange: (e) => {
                    setData("architect", e.target.checked);
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Me nevojitet Arkitekt" })
            ] })
          ] }),
          isAdmin && /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Të Dhëna për Gjurmim (Vetëm Admin)" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Numri i Telefonit për Gjurmim" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.tracking_phone,
                  onChange: (e) => setData("tracking_phone", e.target.value),
                  placeholder: "Numri i telefonit për gjurmim...",
                  className: inputBase
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "tracking_phone", errors })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelBase, children: "Email për Gjurmim" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: data.tracking_email,
                  onChange: (e) => setData("tracking_email", e.target.value),
                  placeholder: "Email për gjurmim...",
                  className: inputBase
                }
              ),
              /* @__PURE__ */ jsx(ErrorText, { field: "tracking_email", errors })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl opacity-0 animate-fade-in-up",
              style: { animationDelay: "1s" },
              children: "Perditeso Kerkesen"
            }
          )
        ]
      }
    )
  ] }) });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PropertyRequestEdit
}, Symbol.toStringTag, { value: "Module" }));
const PropertyRequests = ({ propertyRequests, users }) => {
  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    currency: "EUR",
    sale_type: "",
    types: [],
    elevator: false,
    mortgage: false,
    rooms_min: "",
    rooms_max: "",
    bathrooms_min: "",
    bathrooms_max: "",
    surface_min: "",
    surface_max: "",
    balconies_min: "",
    balconies_max: "",
    user_id: ""
  });
  const reloadProperties = () => {
    router.get("/property/requests", filters, {
      preserveState: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow px-4 pb-4 rounded-xl mb-4", children: [
    /* @__PURE__ */ jsx("h4", { className: "pb-4 text-2xl font-bold", children: "Kërkesat e Pronave" }),
    /* @__PURE__ */ jsx(
      PropertyFilter,
      {
        filters,
        setFilters,
        onApply: reloadProperties,
        users
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid justify-items-center p-4", children: /* @__PURE__ */ jsx(
      Link,
      {
        href: "/property/request/create",
        className: "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-400",
        children: "Shto një kërkesë të re"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Kërkesat e listuara" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: propertyRequests.data.map((p) => /* @__PURE__ */ jsx(
        PropertyItem,
        {
          ...p,
          canEdit: true,
          canDelete: true,
          onUpload: () => {
            router.put(`/property/request/${p.id}/re-upload`);
          },
          onEdit: () => {
            router.get(`/property/request/${p.id}/edit`);
          },
          onToggleCompleted: () => {
            router.put(`/property/request/${p.id}/toggle-completed`);
          },
          onDelete: () => {
            Swal.fire({
              title: "A jeni i sigurt?",
              text: "Kjo kërkesë do të fshihet përgjithmonë.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#dc2626",
              cancelButtonColor: "#6b7280",
              confirmButtonText: "Po, fshije",
              cancelButtonText: "Anullo",
              reverseButtons: true
            }).then((result) => {
              if (!result.isConfirmed) return;
              router.delete(`/property/request/${p.id}`, {
                id: p.id
              }, {
                onSuccess: () => {
                  Swal.fire({
                    icon: "success",
                    title: "Kërkesa u fshi",
                    timer: 1200,
                    showConfirmButton: false
                  });
                },
                onError: () => {
                  Swal.fire({
                    icon: "error",
                    title: "Gabim",
                    text: "Ndodhi një problem gjatë fshirjes."
                  });
                }
              });
            });
          }
        },
        p.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Pagination, { links: propertyRequests.links }) })
    ] })
  ] }) });
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PropertyRequests
}, Symbol.toStringTag, { value: "Module" }));
function PropertyMap({ lat, lng, radius }) {
  const center = [lat, lng];
  return /* @__PURE__ */ jsxs(
    MapContainer,
    {
      center,
      zoom: radius ? 13 : 15,
      className: "h-[320px] w-full rounded-2xl",
      children: [
        /* @__PURE__ */ jsx(
          TileLayer,
          {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        ),
        radius && /* @__PURE__ */ jsx(
          Circle,
          {
            center,
            radius,
            pathOptions: {
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.15
            }
          }
        )
      ]
    }
  );
}
const PROPERTY_TYPE_LABELS = {
  residential: "Rezidenciale",
  commercial: "Komerciale",
  land: "Toke",
  others: "Te tjera"
};
const TRANSACTION_TYPE_LABELS = {
  sale: "Blerje",
  rent: "Qira"
};
const FUNDING_SOURCE_LABELS = {
  kredi: "Kredi",
  kursime: "Kursime"
};
const subTypeProperties = {
  residential: [
    { value: "apartment", label: "Apartament" },
    { value: "house", label: "Shtëpi Private" },
    { value: "kategori te tjera", label: "Kategori të tjera" }
  ],
  commercial: [
    { value: "office", label: "Zyrë" },
    { value: "warehouse", label: "Magazinë" }
  ],
  land: [
    { value: "agricultural", label: "Tokë Bujqësore" },
    { value: "truall", label: "Truall" }
  ],
  others: [
    { value: "parkim", label: "Parkim" },
    { value: "kategori_te_tjera", label: "Kategori të tjera" }
  ]
};
const ViewPropertyRequest = ({ propertyRequest, actual_contact, isAdmin }) => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto mt-5 px-4 py-10 space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: PROPERTY_TYPE_LABELS[propertyRequest.property_type] }),
          (propertyRequest.street || propertyRequest.city) && /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mt-1", children: [
            propertyRequest.street,
            propertyRequest.street && propertyRequest.city ? ", " : "",
            propertyRequest.city
          ] })
        ] }),
        isAdmin && (propertyRequest.tracking_phone || propertyRequest.tracking_email) && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-2xl p-6 border border-blue-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-800", children: "Të Dhëna për Gjurmim (Vetëm Admin)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            propertyRequest.tracking_phone && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Telefon për Gjurmim:" }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-medium", children: propertyRequest.tracking_phone })
            ] }),
            propertyRequest.tracking_email && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Email për Gjurmim:" }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-medium", children: propertyRequest.tracking_email })
            ] })
          ] })
        ] }),
        propertyRequest.description && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Pershkrimi" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: propertyRequest.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsx(
            Detail,
            {
              label: "Lloji i prones",
              value: subTypeProperties[propertyRequest.property_type]?.find((o) => o.value === propertyRequest.property_category)?.label
            }
          ),
          /* @__PURE__ */ jsx(
            Detail,
            {
              label: "Hipoteke",
              value: propertyRequest.hipoteke ? "Po" : "Jo "
            }
          ),
          /* @__PURE__ */ jsx(
            Detail,
            {
              label: "Ashensor",
              value: propertyRequest.ashensor ? "Po" : "Jo"
            }
          ),
          /* @__PURE__ */ jsx(Detail, { label: "Siperfaqe", value: `${propertyRequest.surface}-${propertyRequest.surface_2} m²` }),
          propertyRequest.total_rooms > 0 && /* @__PURE__ */ jsx(Detail, { label: "Dhoma", value: `${propertyRequest.total_rooms}-${propertyRequest.total_rooms_2}` }),
          propertyRequest.total_bathrooms > 0 && /* @__PURE__ */ jsx(Detail, { label: "Banjo", value: `${propertyRequest.total_bathrooms}-${propertyRequest.total_bathrooms_2}` }),
          propertyRequest.total_balconies > 0 && /* @__PURE__ */ jsx(Detail, { label: "Ballkone", value: `${propertyRequest.total_balconies}-${propertyRequest.total_balconies_2}` }),
          propertyRequest.floor_number != null && propertyRequest.floor_number !== 0 && /* @__PURE__ */ jsx(Detail, { label: "Kati", value: propertyRequest.floor_number }),
          propertyRequest.total_floors > 0 && /* @__PURE__ */ jsx(Detail, { label: "Kate totale", value: propertyRequest.total_floors }),
          /* @__PURE__ */ jsx(
            Detail,
            {
              label: "Transaksioni",
              value: TRANSACTION_TYPE_LABELS[propertyRequest.type_of_sale]
            }
          ),
          propertyRequest.funds && /* @__PURE__ */ jsx(
            Detail,
            {
              label: "Burimi i Financimit",
              value: FUNDING_SOURCE_LABELS[propertyRequest.funds]
            }
          ),
          propertyRequest.architect === true && /* @__PURE__ */ jsx(Detail, { label: "Shërbime", value: "Kërkon Arkitekt" }),
          propertyRequest.interior_design === true && /* @__PURE__ */ jsx(Detail, { label: "Shërbime", value: "Kërkon Interior Dizajner" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Cmimi" }),
        /* @__PURE__ */ jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          Number(propertyRequest.price).toLocaleString(),
          "-",
          Number(propertyRequest.price_2).toLocaleString(),
          " ",
          propertyRequest.currency
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Vendndodhja" }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-[320px] rounded-2xl overflow-hidden shadow", children: /* @__PURE__ */ jsx(
        PropertyMap,
        {
          lat: propertyRequest.latitude,
          lng: propertyRequest.longitude,
          radius: propertyRequest.zone_radious
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-2xl p-6 space-y-4 max-w-md", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Kontakto Bleresin" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://wa.me/${actual_contact ? actual_contact.replace(/[^0-9]/g, "") : "355697727747"}?text=${encodeURIComponent(`Përshëndetje, jam i interesuar për kërkesën tuaj të pronës.

${window.location.href}`)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex-1 text-center bg-green-600 text-white py-2 rounded-lg",
          children: "WhatsApp"
        }
      ) })
    ] })
  ] });
};
const Detail = ({ label, value }) => {
  if (!value && value !== 0) return null;
  if (value === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-xl text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-gray-500", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: value })
  ] });
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ViewPropertyRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children, breadcrumbItems }) {
  const { flash, errors } = usePage().props;
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (errors && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        const errorMessage = Array.isArray(error) ? error[0] : error;
        toast.error(errorMessage);
      });
    }
  }, [flash, errors]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "GjejProne" }),
    /* @__PURE__ */ jsxs("div", { className: "pt-20 grid", children: [
      /* @__PURE__ */ jsx(Header, { breadcrumbItems }),
      /* @__PURE__ */ jsx(
        Toaster,
        {
          position: "top-right",
          toastOptions: {
            duration: 3e3,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px 20px"
            }
          }
        }
      ),
      /* @__PURE__ */ jsx("main", { children }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/EditProperty.jsx": __vite_glob_0_0, "./pages/Landing.jsx": __vite_glob_0_1, "./pages/NewProperty.jsx": __vite_glob_0_2, "./pages/Privacy.jsx": __vite_glob_0_3, "./pages/Profile.jsx": __vite_glob_0_4, "./pages/Properties.jsx": __vite_glob_0_5, "./pages/PropertyDetails.jsx": __vite_glob_0_6, "./pages/Terms.jsx": __vite_glob_0_7, "./pages/admin/AddProperty.jsx": __vite_glob_0_8, "./pages/admin/CreateUser.jsx": __vite_glob_0_9, "./pages/admin/Dashboard.jsx": __vite_glob_0_10, "./pages/admin/EditProperty.jsx": __vite_glob_0_11, "./pages/admin/EditUser.jsx": __vite_glob_0_12, "./pages/admin/Logs.jsx": __vite_glob_0_13, "./pages/admin/Properties.jsx": __vite_glob_0_14, "./pages/admin/Users.jsx": __vite_glob_0_15, "./pages/admin/ViewUser.jsx": __vite_glob_0_16, "./pages/auth/ForgotPassword.jsx": __vite_glob_0_17, "./pages/auth/Login.jsx": __vite_glob_0_18, "./pages/auth/Register.jsx": __vite_glob_0_19, "./pages/auth/ResetPassword.jsx": __vite_glob_0_20, "./pages/auth/VerifySent.jsx": __vite_glob_0_21, "./pages/errors/Forbidden.jsx": __vite_glob_0_22, "./pages/errors/NotFound.jsx": __vite_glob_0_23, "./pages/seller/PropertyRequests.jsx": __vite_glob_0_24, "./pages/user/AllProperties.jsx": __vite_glob_0_25, "./pages/user/PropertyRequest.jsx": __vite_glob_0_26, "./pages/user/PropertyRequestEdit.jsx": __vite_glob_0_27, "./pages/user/PropertyRequests.jsx": __vite_glob_0_28, "./pages/user/ViewPropertyRequest.jsx": __vite_glob_0_29 });
      const page2 = pages[`./pages/${name}.jsx`];
      page2.default.layout = page2.default.layout || ((page3) => /* @__PURE__ */ jsx(Layout, { children: page3 }));
      return page2;
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
