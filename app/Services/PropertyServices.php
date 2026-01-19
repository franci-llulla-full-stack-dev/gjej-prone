<?php

namespace App\Services;

use App\Models\Property;

class PropertyServices
{
    public function filterProperties($validated)
    {
        $rates = [
            'EUR' => 1,
            'USD' => 1.17,
            'ALL' => 96
        ];
        $user = auth()->user();
        $query = Property::with('images');

        if($user && $user->role->name !== 'user') {
            $query->where('user_id', $user->id);
        }else {
            $query->where('verified', true)
                ->orderByRaw("
            CASE
                WHEN combo_package = true OR (virtual_tour = true AND rivleresim = true) THEN 1
                WHEN virtual_tour = true THEN 2
                WHEN rivleresim = true THEN 3
                ELSE 4
            END
        ");
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
                $cases[] = "WHEN currency = '{$dbCurrency}' THEN price / {$rate} * {$rates[$filterCurrency]}";
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
                $query->where('price', '>=', $validated['min_price']);
            }
            if (isset($validated['max_price'])) {
                $query->where('price', '<=', $validated['max_price']);
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
        if(isset($validated['mobilim']) && filter_var($validated['mobilim'], FILTER_VALIDATE_BOOLEAN)) {
            $query->where('mobilim', true);
        }

        if(isset($validated['parkim']) && filter_var($validated['parkim'], FILTER_VALIDATE_BOOLEAN)) {
            $query->where('parkim', true);
        }

        if(isset($validated['rooms_min'])) {
            $query->where('total_rooms', '>=',  $validated['rooms_min']);
        }

        if(isset($validated['rooms_max'])) {
            $query->where('total_rooms', '<=', $validated['rooms_max']);
        }
        if(isset($validated['bathrooms_min'])) {
            $query->where('total_bathrooms', '>=',  $validated['bathrooms_min']);
        }

        if(isset($validated['bathrooms_max'])) {
            $query->where('total_bathrooms', '<=', $validated['bathrooms_max']);
        }

        if(isset($validated['balconies_min'])) {
            $query->where('total_balconies', '>=',  $validated['balconies_min']);
        }

        if(isset($validated['balconies_max'])) {
            $query->where('total_balconies', '<=', $validated['balconies_max']);
        }

        if(isset($validated['surface_min'])) {
            $query->where('surface', '>=',  $validated['surface_min']);
        }

        if(isset($validated['surface_max'])) {
            $query->where('surface', '<=', $validated['surface_max']);
        }

        return $query;
    }

    public function storeProperty($validated)
    {
        $user = auth()->user();
        $images = $validated['images'] ?? [];
        $document = $validated['floor_plan'] ?? null;
        $hipoteka = $validated['hipoteke_file'] ?? null;
        unset($validated['images'], $validated['floor_plan']);

        $newProperty = $user->properties()->create($validated);
        if($document) {
            $documentPath = $document->store("properties/{$newProperty->id}/floor_plan", 'public');
            $newProperty->documents()->create([
                'path' => $documentPath,
                'file_name' => $document->getClientOriginalName(),
                'file_type' => 'floor_plan',
            ]);
        }
        if($hipoteka) {
            $documentPathHipoteke = $hipoteka->store("properties/{$newProperty->id}/hipoteke", 'public');
            $newProperty->documents()->create([
                'path' => $documentPathHipoteke,
                'file_name' => $hipoteka->getClientOriginalName(),
                'file_type' => 'hipoteka',
            ]);
        }
        foreach ($images as $image) {
            $path = $image->store("properties/{$newProperty->id}", 'public');
            $newProperty->images()->create([
                'path' => $path,
                'file_name' => $image->getClientOriginalName(),
                'file_type' => $image->getClientMimeType(),
            ]);
        }
    }

    public function logView($propertyId)
    {
        $user = auth()->user();
        if($user->role->name === 'user') {
            $user->logs()->create([
                'action_type' => 'viewed_property_listing',
                'property_id' => $propertyId,
            ]);
        }
    }
}
