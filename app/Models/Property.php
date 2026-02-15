<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'properties';

    protected $fillable = [
        'type_of_sale',
        'user_id',
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
        'ashensor',
        'hipoteke',
        'virtual_tour_link',
        'virtual_tour_done',
        'rivleresim_done',
        'parkim',
        'mobilim',
        'price_negotiable',
    ];

    protected $appends = ['saved'];

    public function getSavedAttribute(): bool
    {
        $user = auth()->user();
        if (!$user) {
            return false;
        }

        // If savedByUsers relationship is loaded, use it (more efficient)
        if ($this->relationLoaded('savedByUsers')) {
            return $this->savedByUsers->isNotEmpty();
        }

        // Otherwise query the relationship
        return $this->savedByUsers()->where('users.id', $user->id)->exists();
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyMedia::class, 'property_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(PropertyDocument::class, 'property_id');
    }

    public function savedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_properties', 'property_id', 'user_id');
    }
}
