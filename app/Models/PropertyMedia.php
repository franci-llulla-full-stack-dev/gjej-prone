<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PropertyMedia extends Model
{
    public $table = 'property_media';

    protected $fillable = [
        'property_id',
        'path',
        'order',
        'file_name',
        'file_type'
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class, 'property_id');
    }

}
