<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyRequest extends Model
{
    protected $table = 'property_requests';

    protected $fillable = [
        'user_id',
        'type_of_sale',
        'property_type',
        'property_category',
        'city',
        'street',
        'latitude',
        'longitude',
        'zone_radious',
        'surface',
        'surface_2',
        'price',
        'price_2',
        'currency',
        'description',
        'total_rooms',
        'total_rooms_2',
        'total_bathrooms',
        'total_bathrooms_2',
        'total_balconies',
        'total_balconies_2',
        'floor_number',
        'total_floors',
        'year_built',
        'ashensor',
        'hipoteke',
        'interior_design',
        'architect'
    ];
}
