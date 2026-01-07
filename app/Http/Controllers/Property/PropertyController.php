<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\CreatePropertyRequest;
use App\Http\Requests\Property\UpdatePropertyRequest;
use App\Models\Property;
use App\Models\PropertyMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $rates = [
            'EUR' => 1,
            'USD' => 1.17,
            'ALL' => 96
        ];
        $validated = $request->validate([
            'search' => ['nullable', 'string'],
            'min_price' => ['nullable', 'numeric'],
            'max_price' => ['nullable', 'numeric'],
            'currency' => ['nullable', 'string'],
            'sale_type' => ['nullable', 'string'],
            'types' => ['nullable', 'array'],
            'elevator' => ['nullable', 'in:true,false,1,0'],
            'mortgage' => ['nullable', 'in:true,false,1,0'],
            'rooms_min' => ['nullable', 'numeric'],
            'rooms_max' => ['nullable', 'numeric'],
            'bathrooms_min' => ['nullable', 'numeric'],
            'bathrooms_max' => ['nullable', 'numeric'],
            'surface_min' => ['nullable', 'numeric'],
            'surface_max' => ['nullable', 'numeric'],
            'balconies_min' => ['nullable', 'numeric'],
            'balconies_max' => ['nullable', 'numeric'],
        ]);
        $user = auth()->user();
        $query = Property::with('images')->where('user_id', $user->id);
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

        $properties = $query->paginate();

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('NewProperty', []);
    }

    public function listedProperties(Request $request)
    {
        $query = Property::with('images');

        $properties = $query->paginate(10);
        return Inertia::render('user/AllProperties', [
            'properties' => $properties,
            'filters' => request()->all(),
        ]);
    }

    public function store(CreatePropertyRequest $request)
    {
        $validated = $request->validated();
        $user = auth()->user();

        $images = $validated['images'] ?? [];
        $document = $validated['floor_plan'] ?? null;
        $hipoteka = $validated['hipoteke_file'] ?? null;
        unset($validated['images'], $validated['floor_plan']);

        $newProperty = $user->properties()->create($validated);
        if($document) {
            $documentPath = $document->store("properties/document/{$newProperty->id}", 'public');
            $newProperty->documents()->create([
                'path' => $documentPath,
                'file_name' => $document->getClientOriginalName(),
                'file_type' => 'floor_plan',
            ]);
        }
        if($hipoteka) {
            $documentPathHipoteke = $hipoteka->store("properties/document/hipoteka/{$newProperty->id}", 'public');
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

        return redirect()->route('properties.index')
            ->with(['success' => 'Property created successfully.']);
    }

    public function edit(Property $property)
    {
        if($property->user_id !== auth()->id()) {
            return redirect()->route(redirectByRole())
                ->with(['error' => 'You are not authorized to edit this property.']);
        }

        return Inertia::render('EditProperty', [
            'property' => $property,
            'propertyImages' => $property->images,
            'floorPlan' => $property->documents()->where('file_type', 'floor_plan')->get(),
            'hipotekeFile' => $property->documents()->where('file_type', 'hipoteka')->get(),
        ]);
    }

    public function update(UpdatePropertyRequest $request, Property $property)
    {
        if($property->user_id !== auth()->id()) {
            return redirect()->route(redirectByRole())
                ->with(['error' => 'You are not authorized to edit this property.']);
        }
        $validated = $request->validated();
        $property->update($validated);
        return back()->with(['success' => 'Property updated successfully.']);
    }

    public function destroy(Property $property)
    {
        if($property->user_id !== auth()->id()) {
            return redirect()->route(redirectByRole())
                ->with(['error' => 'You are not authorized to delete this property.']);
        }
        $property->delete();
        return redirect()->route('properties.index')
            ->with(['success' => 'Property deleted successfully.']);
    }


    public function verify(Property $property)
    {
        $property->verified = !$property->verified;
        $property->save();

        return back()->with(['success' => 'Property status updated!']);
    }

    public function show(Property $property)
    {
        $user = auth()->user();
        if($user->role->name === 'user') {
            $property->update(['views' => $property->views + 1]);
        }
        return Inertia::render('PropertyDetails',
            ['property' => $property->load(['images', 'owner', 'documents']),]
        );
    }
}
