<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyDocument extends Model
{
    protected $table = 'property_documents';

    protected $fillable = [
        'property_id',
        'path',
        'file_name',
        'file_type'
    ];

    public function property(): belongsTo
    {
        return $this->belongsTo(Property::class, 'property_id');
    }
}
