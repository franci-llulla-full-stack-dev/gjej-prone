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

const PropertyItem = ({ id, city, street, surface, surface_2, total_rooms, total_rooms_2, total_bathrooms, total_bathrooms_2, total_balconies, total_balconies_2,
                          total_floors, floor_number, year_built, description, price, price_2, currency, type_of_sale, property_type,
                          canEdit = false, canDelete = false, onEdit = null, onDelete = null,
                      }) => {
    const PROPERTY_TYPE_LABELS = {
        residential: 'Rezidenciale',
        commercial: 'Komerciale',
        land: 'Toke',
        others: 'Te tjera',
    };
    return (
        <div className="grid grid-cols-1 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">

            {/* CONTENT */}
            <div className=" grid grid-cols-1 p-5 space-y-3">

                {/* TITLE */}
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <Tag size={16} className="text-gray-500"/>
                        <span className="text-sm uppercase text-gray-600">
                        {type_of_sale === "sale" ? "Në Shitje" : "Me Qira"}
                    </span>
                    </div>
                    <span
                        className="bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                    {price.toLocaleString()}-{price_2.toLocaleString()} {currency}
                </span>
                </div>

                {/* LOCATION */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                        {PROPERTY_TYPE_LABELS[property_type]}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-1">
                        {street}, {city}
                    </p>
                </div>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2">

                    <span className="flex items-center gap-1">
                        <Bed size={16}/> {total_rooms}-{total_rooms_2} dhoma
                    </span>

                    <span className="flex items-center gap-1">
                        <Bath size={16}/> {total_bathrooms}-{total_bathrooms_2} banjo
                    </span>

                    {total_balconies > 0 && (
                        <span className="flex items-center gap-1">
                            <Home size={16}/> {total_balconies}-{total_balconies_2} ballkone
                        </span>
                    )}

                    <span className="flex items-center gap-1">
                        <Maximize2 size={16}/> {surface}-{surface_2} m²
                    </span>

                    <span className="flex items-center gap-1">
                        <Layers size={16}/> Kati {floor_number}
                    </span>


                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm line-clamp-3">
                    {description}
                </p>
                {(canEdit || canDelete) && (
                    <div className="flex gap-2 pt-2">
                        {canEdit && (
                            <button
                                onClick={() => onEdit?.(id)}
                                className="flex-1 text-sm border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
                            >
                                Edit
                            </button>
                        )}

                        {canDelete && (
                            <button
                                onClick={() => onDelete?.(id)}
                                className="flex-1 text-sm border border-red-300 text-red-600 rounded-lg py-2 hover:bg-red-50 transition"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                )}
                {/* VIEW BUTTON */}
                <div className="pt-2">
                    <Link
                        href={`/property/request/${id}`}
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
