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
        $query = Property::with('images')->where('user_id', $user->id);

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
        return Inertia::render('PropertyDetails',
            ['property' => $property->load(['images', 'owner', 'documents']),]
        );
    }
}
