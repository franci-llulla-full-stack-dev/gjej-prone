<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'phone_number',
        'company_name',
        'notifications',
        'address',
        'email',
        'password',
        'role_id',
        'birth_date',
        'email_verified_at',
        'nipt',
        'company_phone_number',
        'years_experience',
        'company_description',
        'logo_path',
        'finished_projects',
        'website',
        'year_budget',
        'preferred_locations',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class, 'user_id');
    }

    public function propertyRequests(): HasMany
    {
        return $this->hasMany(PropertyRequest::class, 'user_id');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class, 'user_id');
    }

    public function savedPropertyRequests(): BelongsToMany
    {
        return $this->belongsToMany(PropertyRequest::class, 'users_property_requests', 'user_id', 'property_request_id');
    }

    public function savedProperties(): BelongsToMany
    {
        return $this->belongsToMany(Property::class, 'users_properties', 'user_id', 'property_id');
    }
}
