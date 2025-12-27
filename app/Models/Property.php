<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory;

    protected $table = 'properties';

    protected $fillable = [
        'type_of_sale',
        'property_type',
        'property_category',
        'city',
        'street',
        'latitude',
        'longitude',
        'surface',
        'price',
        'currency',
        'description',
        'total_rooms',
        'total_bathrooms',
        'total_balconies',
        'floor_number',
        'total_floors',
        'year_built',
        'badge_status',
        'sold',
        'verified',
        'order',
        'combo_package',
        'virtual_tour',
        'rivleresim',
        'views',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyMedia::class, 'property_id');
    }
}
