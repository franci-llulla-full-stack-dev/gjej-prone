<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Http\Requests\Property\CreatePropertyRequest;
use App\Http\Requests\Property\UpdatePropertyRequest;
use App\Models\Property;
use App\Models\PropertyMedia;
use App\Services\PropertyServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function __construct(private PropertyServices $propertyServices)
    {
    }

    public function index(FilterRequest $request)
    {
        $validated = $request->validated();

        $query = $this->propertyServices->filterProperties($validated);
        $properties = $query->paginate(20);

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('NewProperty', []);
    }

    public function listedProperties(FilterRequest $request)
    {
        $validated = $request->validated();
        $query = $this->propertyServices->filterProperties($validated);
        $properties = $query->paginate(20);
        return Inertia::render('user/AllProperties', [
            'properties' => $properties,
            'filters' => request()->all(),
        ]);
    }

    public function store(CreatePropertyRequest $request)
    {
        try{
            $validated = $request->validated();
            $this->propertyServices->storeProperty($validated);

            return redirect()->route('properties.index')
                ->with(['success' => 'Property created successfully.']);
        } catch (\Exception $e){
            return redirect()->route('properties.index')->with('error', 'An error occurred while creating the property.');
        }
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
