<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Log extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'user_id',
        'action_type',
        'property_id',
        'property_request_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class, 'property_id');
    }

    public function propertyRequest(): BelongsTo
    {
        return $this->belongsTo(PropertyRequest::class, 'property_request_id');
    }
}
