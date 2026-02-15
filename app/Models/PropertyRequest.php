<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyRequest extends Model
{
    use SoftDeletes;
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
        'architect',
        'parkim',
        'expires_at',
        'created_at',
        'views',
        'funds',
        'completed'
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function savedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_property_requests', 'property_request_id', 'user_id');
    }
}
