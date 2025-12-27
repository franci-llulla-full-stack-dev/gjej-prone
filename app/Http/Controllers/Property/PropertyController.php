<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\CreatePropertyRequest;
use App\Http\Requests\Property\UpdatePropertyRequest;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Property::query()->where('user_id', $user->id);

        if ($request->city) {

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
        $query = Property::query();

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

        unset($validated['images']);

        $newProperty = $user->properties()->create($validated);

        foreach ($images as $image) {
            $path = $image->store('properties', 'public');
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
}
