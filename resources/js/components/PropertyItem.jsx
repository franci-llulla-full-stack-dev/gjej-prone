import React from "react";
import { Link } from "@inertiajs/react";
import { Home, Bath, Bed, Maximize2, Layers } from "lucide-react";

const PropertyItem = ({
                          id,
                          city,
                          postal_code,
                          street,
                          surface,
                          rooms,
                          bathrooms,
                          balconies,
                          floors,
                          floor_number,
                          year_built,
                          description,
                          price,
                          currency,
                          image_paths = []
                      }) => {

    const image = image_paths.length > 0
        ? image_paths[0]
        : "/placeholder/property.jpg";

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">

            {/* IMAGE */}
            <div className="relative">
                <img
                    src={image}
                    alt="Property"
                    className="w-full h-56 object-cover"
                />

                {/* PRICE BADGE */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                    {price.toLocaleString()} {currency}
                </span>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">

                {/* LOCATION */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800">
                        {street}, {city}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {postal_code}
                    </p>
                </div>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2">
                    <span className="flex items-center gap-1">
                        <Bed size={16}/> {rooms} dhoma
                    </span>

                    <span className="flex items-center gap-1">
                        <Bath size={16}/> {bathrooms} banjo
                    </span>

                    <span className="flex items-center gap-1">
                        <Maximize2 size={16}/> {surface} m²
                    </span>

                    {floors && (
                        <span className="flex items-center gap-1">
                            <Layers size={16}/> {floor_number}/{floors} kati
                        </span>
                    )}
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
