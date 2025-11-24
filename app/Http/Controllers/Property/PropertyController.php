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
        $query = Property::query();

        if ($request->city) {
            $query->where('city', $request->city);
        }

        $properties = $query->paginate();

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filters' => $request->all(),
        ]);
    }

    public function store(CreatePropertyRequest $request)
    {
        $validated = $request->validated();
        $newProperty = Property::create($validated);
    }

    public function show(Property $property)
    {

    }

    public function edit(Property $property)
    {

    }

    public function update(UpdatePropertyRequest $request, Property $property)
    {

    }

    public function destroy(Property $property)
    {

    }
}
