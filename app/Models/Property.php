<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $table = 'properties';

    protected $fillable = [
        'postal_code',
        'city',
        'street',
        'house_number',
        'floor_number',
        'apartment_number',
        'building_name',
        'building_type',
        'year_built',
        'description',
        'currency',
        'price',
        'verified',
        'order',
        'surface',
        'rooms',
        'bathrooms',
        'garages',
        'type_of_sale',
    ];
}
