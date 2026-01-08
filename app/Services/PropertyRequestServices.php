<?php

namespace App\Services;

use App\Models\PropertyRequest;
use App\Models\Role;

class PropertyRequestServices
{
    public function filterRequests($validated)
    {
        $user = auth()->user();
        $role = $user->role->name;
        if($role === 'admin') {
            $users = Role::where('name', 'user')->first()->users()->select('id', 'name', 'surname')->get();
            $query = PropertyRequest::query();
        }elseif ($role === 'user') {
            $users = [];
            $query = PropertyRequest::where('user_id', $user->id);
        } else {
            $users = [];
            $query = PropertyRequest::query();
        }
        $rates = [
            'EUR' => 1,
            'USD' => 1.17,
            'ALL' => 96
        ];
        if($role === 'admin') {
            if(isset($validated['user_id'])) {
                $query->where('user_id', $validated['user_id']);
            }
        }
        if(isset($validated['search'])) {
            $query = $query->where(function ($q) use ($validated) {
                $q->where('city', 'like', "%{$validated['search']}%")
                    ->orWhere('street', 'like', "%{$validated['search']}%");
            });
        }
        if (array_key_exists('currency', $validated) && $validated['currency']) {
            $filterCurrency = $validated['currency'];
            $minPrice = $validated['min_price'] ?? null;
            $maxPrice = $validated['max_price'] ?? null;

            // Build a CASE statement to convert all property prices to the filter currency
            $cases = [];
            foreach ($rates as $dbCurrency => $rate) {
                // formula: price_in_filter_currency = price / rate_of_dbCurrency * rate_of_filterCurrency
                $cases[] = "WHEN currency = '{$dbCurrency}' THEN price_2 / {$rate} * {$rates[$filterCurrency]}";

            }

            $priceConverted = "CASE " . implode(" ", $cases) . " END";

            if ($minPrice !== null) {
                $query->whereRaw("{$priceConverted} >= ?", [$minPrice]);
            }

            if ($maxPrice !== null) {
                $query->whereRaw("{$priceConverted} <= ?", [$maxPrice]);
            }
        } else {
            if (isset($validated['min_price'])) {
                $query->where('price_2', '>=', $validated['min_price']);
            }
            if (isset($validated['max_price'])) {
                $query->where('price_2', '<=', $validated['max_price']);
            }
        }

        if(isset($validated['sale_type'])) {
            $query->where('type_of_sale', $validated['sale_type']);
        }

        if(array_key_exists('types', $validated) && $validated['types']) {
            $query->whereIn('property_category', $validated['types']);
        }
        if(isset($validated['elevator']) && filter_var($validated['elevator'], FILTER_VALIDATE_BOOLEAN)) {
            $query->where('ashensor', true);
        }
        if(isset($validated['mortgage']) && filter_var($validated['mortgage'], FILTER_VALIDATE_BOOLEAN)) {
            $query->where('hipoteke', true);
        }

        if(isset($validated['rooms_min'])) {
            $query->where('total_rooms_2', '>=',  $validated['rooms_min']);
        }

        if(isset($validated['rooms_max'])) {
            $query->where('total_rooms_2', '<=', $validated['rooms_max']);
        }
        if(isset($validated['bathrooms_min'])) {
            $query->where('total_bathrooms_2', '>=',  $validated['bathrooms_min']);
        }

        if(isset($validated['bathrooms_max'])) {
            $query->where('total_bathrooms_2', '<=', $validated['bathrooms_max']);
        }

        if(isset($validated['balconies_min'])) {
            $query->where('total_balconies_2', '>=',  $validated['balconies_min']);
        }

        if(isset($validated['balconies_max'])) {
            $query->where('total_balconies_2', '<=', $validated['balconies_max']);
        }

        if(isset($validated['surface_min'])) {
            $query->where('surface_2', '>=',  $validated['surface_min']);
        }

        if(isset($validated['surface_max'])) {
            $query->where('surface_2', '<=', $validated['surface_max']);
        }

        return [$query, $users];
    }
}
