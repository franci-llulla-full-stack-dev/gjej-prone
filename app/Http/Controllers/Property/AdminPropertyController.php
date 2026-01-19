<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyDocument;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminPropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with('owner');

        // Show deleted properties
        if ($request->filled('show_deleted') && filter_var($request->show_deleted, FILTER_VALIDATE_BOOLEAN)) {
            $query->onlyTrashed();
        }

        // Verification status
        if ($request->filled('verified')) {
            $query->where('verified', $request->verified);
        }

        // Sale type (sale/rent)
        if ($request->filled('sale_type')) {
            $query->where('type_of_sale', $request->sale_type);
        }

        // Search by city, street
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('city', 'like', '%' . $request->search . '%')
                    ->orWhere('street', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by user
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Service requests
        if ($request->filled('virtual_tour') &&  filter_var($request->virtual_tour, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('virtual_tour', true);
        }

        if ($request->filled('rivleresim') && filter_var($request->rivleresim, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('rivleresim', true);
        }

        if ($request->filled('combo_package') && filter_var($request->combo_package, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('combo_package', true);
        }

        // Service completion status
        if ($request->filled('virtual_tour_done') && filter_var($request->virtual_tour_done, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('virtual_tour_done', true);
        }

        if ($request->filled('rivleresim_done') && filter_var($request->rivleresim_done, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('rivleresim_done', true);
        }

        // Price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Currency
        if ($request->filled('currency')) {
            $query->where('currency', $request->currency);
        }

        // Property types
        if ($request->filled('types') && is_array($request->types) && count($request->types) > 0) {
            $query->whereIn('property_category', $request->types);
        }

        // Characteristics
        if ($request->filled('elevator') && filter_var($request->elevator, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('ashensor', true);
        }

        if ($request->filled('mortgage') && filter_var($request->mortgage, FILTER_VALIDATE_BOOLEAN)) {
            $query->where('hipoteke', true);
        }

        // Rooms range
        if ($request->filled('rooms_min')) {
            $query->where('total_rooms', '>=', $request->rooms_min);
        }

        if ($request->filled('rooms_max')) {
            $query->where('total_rooms', '<=', $request->rooms_max);
        }

        // Bathrooms range
        if ($request->filled('bathrooms_min')) {
            $query->where('total_bathrooms', '>=', $request->bathrooms_min);
        }

        if ($request->filled('bathrooms_max')) {
            $query->where('total_bathrooms', '<=', $request->bathrooms_max);
        }

        // Surface range
        if ($request->filled('surface_min')) {
            $query->where('surface', '>=', $request->surface_min);
        }

        if ($request->filled('surface_max')) {
            $query->where('surface', '<=', $request->surface_max);
        }

        // Balconies range
        if ($request->filled('balconies_min')) {
            $query->where('total_balconies', '>=', $request->balconies_min);
        }

        if ($request->filled('balconies_max')) {
            $query->where('total_balconies', '<=', $request->balconies_max);
        }

        $properties = $query->paginate($request->per_page ?? 10);

        return Inertia::render('admin/Properties', [
            'properties' => $properties->items(),
            'pagination' => [
                'current_page' => $properties->currentPage(),
                'per_page' => $properties->perPage(),
                'total' => $properties->total(),
            ],
            'filters' => $request->all(),
            'showDeleted' => $request->filled('show_deleted') && $request->show_deleted == '1',
            'users' => User::whereHas('role', function ($q) {
                $q->whereIn('name', ['individual', 'agency', 'bank']);
            })
                ->select('id', 'name', 'surname')
                ->get(),
        ]);
    }


    public function create()
    {
        return Inertia::render('admin/AddProperty', [
            'users' => User::whereHas('role', function ($q) {
                $q->whereIn('name', ['individual', 'agency', 'bank']);
            })
                ->select('id', 'name', 'surname')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type_of_sale' => 'required|in:sale,rent',
            'property_type' => 'required|in:residential,commercial,land,others',
            'property_category' => 'required|string',
            'city' => 'required|string',
            'street' => 'required|string',
            'surface' => 'required|numeric|min:1',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|in:EUR,USD,ALL',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'nullable|string',
            'total_rooms' => 'nullable|integer|min:0',
            'total_bathrooms' => 'nullable|integer|min:0',
            'total_balconies' => 'nullable|integer|min:0',
            'floor_number' => 'nullable|integer',
            'total_floors' => 'nullable|integer|min:0',
            'year_built' => 'nullable|integer|min:1900|max:2050',
            'ashensor' => 'boolean',
            'hipoteke' => 'boolean',
            'virtual_tour' => 'boolean',
            'rivleresim' => 'boolean',
            'combo_package' => 'boolean',
            'virtual_tour_done' => 'boolean',
            'rivleresim_done' => 'boolean',
            'verified' => 'boolean',
            'virtual_tour_link' => 'nullable|url',
            'images' => 'required|array|min:2',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',
            'floor_plan' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'hipoteke_file' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'parkim' => 'nullable|boolean',
            'mobilim' => 'nullable|boolean',
            'price_negotiable' => 'nullable|boolean',
        ]);

        // Create property
        $property = Property::create([
            'user_id' => $validated['user_id'],
            'type_of_sale' => $validated['type_of_sale'],
            'property_type' => $validated['property_type'],
            'property_category' => $validated['property_category'],
            'city' => $validated['city'],
            'street' => $validated['street'],
            'surface' => $validated['surface'],
            'price' => $validated['price'],
            'currency' => $validated['currency'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'description' => $validated['description'] ?? null,
            'total_rooms' => $validated['total_rooms'] ?? null,
            'total_bathrooms' => $validated['total_bathrooms'] ?? null,
            'total_balconies' => $validated['total_balconies'] ?? null,
            'floor_number' => $validated['floor_number'] ?? null,
            'total_floors' => $validated['total_floors'] ?? null,
            'year_built' => $validated['year_built'] ?? null,
            'ashensor' => $validated['ashensor'] ?? false,
            'hipoteke' => $validated['hipoteke'] ?? false,
            'virtual_tour' => $validated['virtual_tour'] ?? false,
            'rivleresim' => $validated['rivleresim'] ?? false,
            'combo_package' => $validated['combo_package'] ?? false,
            'virtual_tour_done' => $validated['virtual_tour_done'] ?? false,
            'rivleresim_done' => $validated['rivleresim_done'] ?? false,
            'verified' => $validated['verified'] ?? false,
            'virtual_tour_link' => $validated['virtual_tour_link'] ?? null,
            'parkim' => $validated['parkim'] ?? false,
            'mobilim' => $validated['mobilim'] ?? false,
            'price_negotiable' => $validated['price_negotiable'] ?? false,
        ]);

        // Upload images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties/' . $property->id, 'public');
                $property->images()->create([
                    'path' => $path,
                    'file_name' => $image->getClientOriginalName(),
                    'file_type' => $image->getClientMimeType(),
                ]);
            }
        }

        if($request->hasFile('floor_plan')) {
            $documentPath = $request->file('floor_plan')->store("properties/{$property->id}/floor_plan", 'public');
            $property->documents()->create([
                'path' => $documentPath,
                'file_name' => $request->file('floor_plan')->getClientOriginalName(),
                'file_type' => 'floor_plan',
            ]);
        }

        if($request->hasFile('hipoteke_file')) {
            $documentPathHipoteke = $request->file('hipoteke_file')->store("properties/{$property->id}/hipoteke", 'public');
            $property->documents()->create([
                'path' => $documentPathHipoteke,
                'file_name' => $request->file('hipoteke_file')->getClientOriginalName(),
                'file_type' => 'hipoteka',
            ]);
        }

        return redirect()->route('admin.properties.index')
            ->with('success', 'Prona u shtua me sukses!');
    }


    public function edit(Property $property)
    {
        return Inertia::render('admin/EditProperty', [
            'property' => $property->load('images', 'documents'),
            'users' => User::whereHas('role', function ($q) {
                $q->whereIn('name', ['individual', 'agency', 'bank']);
            })
                ->select('id', 'name', 'surname')
                ->get(),
        ]);
    }

    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type_of_sale' => 'required|in:sale,rent',
            'property_type' => 'required|in:residential,commercial,land,others',
            'property_category' => 'required|string',
            'city' => 'required|string',
            'street' => 'required|string',
            'surface' => 'required|numeric|min:1',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|in:EUR,USD,ALL',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'nullable|string',
            'total_rooms' => 'nullable|integer|min:0',
            'total_bathrooms' => 'nullable|integer|min:0',
            'total_balconies' => 'nullable|integer|min:0',
            'floor_number' => 'nullable|integer',
            'total_floors' => 'nullable|integer|min:0',
            'year_built' => 'nullable|integer|min:1900|max:2050',
            'ashensor' => 'boolean',
            'hipoteke' => 'boolean',
            'virtual_tour' => 'boolean',
            'rivleresim' => 'boolean',
            'combo_package' => 'boolean',
            'virtual_tour_done' => 'boolean',
            'rivleresim_done' => 'boolean',
            'verified' => 'boolean',
            'virtual_tour_link' => 'nullable|url',
            'parkim' => 'nullable|boolean',
            'mobilim' => 'nullable|boolean',
            'price_negotiable' => 'nullable|boolean',
        ]);

        $property->update([
            'user_id' => $validated['user_id'],
            'type_of_sale' => $validated['type_of_sale'],
            'property_type' => $validated['property_type'],
            'property_category' => $validated['property_category'],
            'city' => $validated['city'],
            'street' => $validated['street'],
            'surface' => $validated['surface'],
            'price' => $validated['price'],
            'currency' => $validated['currency'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'description' => $validated['description'] ?? null,
            'total_rooms' => $validated['total_rooms'] ?? null,
            'total_bathrooms' => $validated['total_bathrooms'] ?? null,
            'total_balconies' => $validated['total_balconies'] ?? null,
            'floor_number' => $validated['floor_number'] ?? null,
            'total_floors' => $validated['total_floors'] ?? null,
            'year_built' => $validated['year_built'] ?? null,
            'ashensor' => $validated['ashensor'] ?? false,
            'hipoteke' => $validated['hipoteke'] ?? false,
            'virtual_tour' => $validated['virtual_tour'] ?? false,
            'rivleresim' => $validated['rivleresim'] ?? false,
            'combo_package' => $validated['combo_package'] ?? false,
            'virtual_tour_done' => $validated['virtual_tour_done'] ?? false,
            'rivleresim_done' => $validated['rivleresim_done'] ?? false,
            'verified' => $validated['verified'] ?? false,
            'virtual_tour_link' => $validated['virtual_tour_link'] ?? null,
            'parkim' => $validated['parkim'] ?? false,
            'mobilim' => $validated['mobilim'] ?? false,
            'price_negotiable' => $validated['price_negotiable'] ?? false,
        ]);

        // Handle new images upload
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties/' . $property->id, 'public');
                $property->images()->create([
                    'image_path' => $path,
                ]);
            }
        }

        if ($request->hasFile('floor_plan')) {
            // Delete old floor plan from storage
            if ($property->floor_plan && \Storage::disk('public')->exists($property->floor_plan)) {
                Storage::disk('public')->delete($property->floor_plan);
            }

            $floorPlanPath = $request->file('floor_plan')->store('properties/' . $property->id . '/floor_plan', 'public');
            $property->update(['floor_plan' => $floorPlanPath]);
        }

        if ($request->hasFile('hipoteke_file')) {
            // Delete old hipoteke file from storage
            if ($property->hipoteke_file && \Storage::disk('public')->exists($property->hipoteke_file)) {
                Storage::disk('public')->delete($property->hipoteke_file);
            }

            // Upload new hipoteke file
            $hipotekePath = $request->file('hipoteke_file')->store('properties/' . $property->id . '/hipoteke', 'public');
            $property->update(['hipoteke_file' => $hipotekePath]);
        }

        return redirect()->route('admin.properties.index')
            ->with('success', 'Prona u përditësua me sukses!');
    }

    public function destroy(Property $property)
    {
        $property->delete();

        return back()->with(['success' => 'Property deleted successfully']);
    }

    public function restore($id)
    {
        $property = Property::onlyTrashed()->findOrFail($id);
        $property->restore();
        return back()->with(['success' => 'Property restored successfully']);
    }

    public function forceDelete($id)
    {
        $property = Property::onlyTrashed()->findOrFail($id);
        $media = $property->images()->get();
        $documents = $property->documents()->get();
        if($media) {
            foreach ($media as $mediaItem) {
                Storage::disk('public')->delete($mediaItem->path);
                $mediaItem->delete();
            }
        }

        if($documents) {
            foreach ($documents as $document) {
                Storage::disk('public')->delete($document->path);
                $document->delete();
            }
        }
        $property->forceDelete();
        return back()->with(['success' => 'Property permanently deleted successfully']);
    }

    public function downloadHipoteka(PropertyDocument $propertyDocument)
    {
        if ($propertyDocument->file_type !== 'hipoteka') {
            abort(403, 'Not allowed');
        }

        if (!Storage::disk('public')->exists($propertyDocument->path)) {
            abort(404);
        }

        return Storage::disk('public')->download($propertyDocument->path, basename($propertyDocument->path));
    }
}
