import React from "react";
import { Link } from "@inertiajs/react";
import {
    Home,
    Bath,
    Bed,
    Maximize2,
    Layers,
    Building2,
    Tag,
} from "lucide-react";

const PropertyItem = ({ id, city, street, surface, total_rooms, total_bathrooms, total_balconies,
  total_floors, floor_number, year_built, description, price, currency, type_of_sale, property_type, image_paths = []
  }) => {

    const image = image_paths.length > 0
        ? image_paths[0]
        : "/placeholder/property.jpg";

    return (
        <div className="grid grid-cols-1 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">

            {/* IMAGE */}
            <div className="relative">
                <img
                    src={image}
                    alt="Property"
                    className="w-full h-56 object-cover"
                />

                {/* PRICE BADGE */}
                <span
                    className="absolute top-3 left-3 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                    {price.toLocaleString()} {currency}
                </span>
            </div>

            {/* CONTENT */}
            <div className=" grid grid-cols-1 p-5 space-y-3">

                {/* TITLE */}
                <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-500"/>
                    <span className="text-sm uppercase text-gray-600">
                        {type_of_sale === "sale" ? "Në Shitje" : "Me Qira"}
                    </span>
                </div>

                {/* LOCATION */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                        {property_type ? property_type.charAt(0).toUpperCase() + property_type.slice(1) : ""}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-1">
                        {street}, {city}
                    </p>
                </div>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2">

                    <span className="flex items-center gap-1">
                        <Bed size={16}/> {total_rooms} dhoma
                    </span>

                    <span className="flex items-center gap-1">
                        <Bath size={16}/> {total_bathrooms} banjo
                    </span>

                    {total_balconies > 0 && (
                        <span className="flex items-center gap-1">
                            <Home size={16}/> {total_balconies} ballkone
                        </span>
                    )}

                    <span className="flex items-center gap-1">
                        <Maximize2 size={16}/> {surface} m²
                    </span>

                    <span className="flex items-center gap-1">
                        <Layers size={16}/> Kati {floor_number}/{total_floors}
                    </span>

                    <span className="flex items-center gap-1">
                        <Building2 size={16}/> Ndërtuar: {year_built}
                    </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm line-clamp-3">
                    {description}
                </p>

                {/* VIEW BUTTON */}
                <div className="pt-2">
                    <Link
                        href={`/properties/${id}`}
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Shiko detajet
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PropertyItem;
