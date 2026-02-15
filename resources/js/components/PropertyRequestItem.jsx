import React from "react";
import { Link, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import {
    Home,
    Bath,
    Bed,
    Maximize2,
    Layers,
    Building2,
    Tag,
    Eye,
    Bookmark
} from "lucide-react";

const PropertyItem = ({
                          id, city, expires_at, created_at, street, surface, surface_2, total_rooms, total_rooms_2, total_bathrooms, total_bathrooms_2, total_balconies, total_balconies_2,
                          completed, total_floors, floor_number, year_built, description, price, price_2, currency, type_of_sale, property_type, views, saved, funds, architect, interior_design,
                          onToggleCompleted = null, canEdit = false, canDelete = false, onEdit = null, onDelete = null, onUpload = null,
                      }) => {
    const [isSaved, setIsSaved] = React.useState(saved);

    const PROPERTY_TYPE_LABELS = {
        residential: 'Rezidenciale',
        commercial: 'Komerciale',
        land: 'Tokë',
        others: 'Të tjera',
    };

    function isExpired(created_at, expires_at) {
        const intervals = {
            '1m': 1,
            '3m': 3,
            '6m': 6,
            '1y': 12,
        };
        if (!created_at || !expires_at || !intervals[expires_at]) return false;
        const created = new Date(created_at);
        const expiry = new Date(created.setMonth(created.getMonth() + intervals[expires_at]));
        return expiry < new Date();
    }

    const handleSave = (id) => {
        router.post(`/property/request/${id}/toggleSave`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsSaved(!isSaved);
            },
            onError: () => {
                toast.error('Diçka shkoi keq!');
            }
        });
    };

    const expired = isExpired(created_at, expires_at);
    return (
        <div className="grid grid-cols-1 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 relative">


            {/* CONTENT */}
            <div className="grid grid-cols-1 p-5 space-y-3">

                {/* TITLE */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
                    {/* Bookmark - visible on mobile only - at the very top right */}
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-1">
                        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                            <Tag size={16} className="text-gray-500"/>
                            <span className="text-sm uppercase text-gray-600 font-medium">
                                {type_of_sale === "sale" ? "Per Blerje" : "Per Qira"}
                            </span>
                        </div>
                        {!canEdit && (
                            <div className="grid justify-items-end md:hidden">
                                <button
                                    onClick={() => handleSave(id)}
                                    className="text-gray-400 hover:text-yellow-400 transition-colors p-1"
                                >
                                    <Bookmark size={34} fill={isSaved ? "#facc15" : "none"} />
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Type of Sale Tag */}


                    {/* Price, Views and Bookmark grouped together - aligned right */}
                    <div className="md:col-span-9 grid grid-cols-[1fr_auto_auto_auto] justify-items-end items-center gap-2">
                        <div>

                        </div>

                        {/* Price */}
                        <span className="bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg whitespace-nowrap">
                            {price.toLocaleString()}-{price_2.toLocaleString()} {currency}
                        </span>

                        {/* Views */}
                        <div className="grid grid-cols-[auto_auto] items-center gap-2 bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg">
                            <span>{views}</span>
                            <Eye size={16} />
                        </div>

                        {/* Bookmark - visible on desktop only, hidden if user owns it */}
                        {!canEdit && (
                            <button
                                onClick={() => handleSave(id)}
                                className="hidden md:block text-gray-400 hover:text-yellow-400 transition-colors p-1"
                            >
                                <Bookmark size={36} fill={isSaved ? "#facc15" : "none"} />
                            </button>
                        )}
                    </div>
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

                    {completed && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">
                            E Perfunduar
                        </span>
                    )}

                    {canEdit && architect && (
                        <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-semibold">
                             Kërkon Arkitekt
                        </span>
                    )}

                    {canEdit && interior_design && (
                        <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-semibold">
                             Kërkon Interior Dizajner
                        </span>
                    )}

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
                                Ndrysho
                            </button>
                        )}

                        {canDelete && (
                            <button
                                onClick={() => onDelete?.(id)}
                                className="flex-1 text-sm border border-red-300 text-red-600 rounded-lg py-2 hover:bg-red-50 transition"
                            >
                                Fshi
                            </button>
                        )}

                        {(expired && canEdit) && (
                            <button
                                onClick={() => onUpload?.(id)}
                                className="flex-1 text-sm border border-yellow-300 text-yellow-700 rounded-lg py-2 hover:bg-yellow-50 transition"
                            >
                                Aktivizo Përsëri
                            </button>
                        )}

                        {canEdit && (
                            <button
                                onClick={() => onToggleCompleted?.(id, !completed)}
                                className={`flex-1 text-sm border ${
                                    completed ? "border-orange-300 text-orange-600 rounded-lg py-2 hover:bg-orange-50 transition" : "border-green-300 text-green-600 rounded-lg py-2 hover:bg-green-50 transition"
                                }`}
                            >
                                {completed ? "Shëno si e Papërfunduar" : "Shëno si e Përfunduar"}
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
