<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'type', 'name', 'latitude', 'longitude', 'tags'
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}
