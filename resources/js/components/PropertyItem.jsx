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
    Eye
} from "lucide-react";


const PropertyItem = ({ id, city, street, surface, total_rooms, total_bathrooms, total_balconies, verified,
  total_floors, views, floor_number, year_built, description, price, currency, type_of_sale, virtual_tour, rivleresim, combo_package, property_type, image_paths = [],
  canEdit = false, canDelete = false, onEdit = null, onDelete = null,
  }) => {

    const image = image_paths.length > 0
        ? `/storage/${image_paths[0].path}`
        : "/placeholder/property.jpg";
    let badge = null;
    if (combo_package || (virtual_tour && rivleresim)) badge = { text: "Platinum", bg: "bg-purple-600", textColor: "text-white" };
    else if (virtual_tour) badge = { text: "Gold", bg: "bg-yellow-500", textColor: "text-black" };
    else if (rivleresim) badge = { text: "Silver", bg: "bg-gray-400", textColor: "text-white" };

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
                {canEdit && (
                    <span className={`absolute top-3 right-3 ${verified ? 'bg-green-600' : 'bg-red-700'} backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg`}>
                        {verified ? "Verified" : "Not Verified"}
                    </span>
                )}
                {/* SINGLE PRIORITY BADGE (Ribbon) */}
                {badge && (
                    <div className={`absolute top-0 right-0 overflow-hidden w-24 h-24`}>
                        <span className={`${badge.bg} ${badge.textColor} text-md font-bold rotate-45 absolute -left-8 w-40 ps-15 text-center shadow-lg`}>
                            {badge.text}
                        </span>
                    </div>
                )}

                <div className={`absolute bottom-0 right-0 overflow-hidden grid grid-cols-2 items-center bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg`}>

                    <div className="justify-items-end">
                        {views}
                    </div>
                    <div className="justify-items-end">
                        <Eye />
                    </div>
                </div>
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
