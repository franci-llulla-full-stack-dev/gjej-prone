<?php

namespace App\Http\Controllers\Property;

use App\Http\Requests\Property\CreatePropertyRequest;
use App\Models\PropertyRequest;
use Faker\Provider\en_UG\PhoneNumber;
use Inertia\Inertia;

class PropertyRequestController
{
    public function index()
    {
        $user = auth()->user();
        $propertyRequests = $user->propertyRequest;

        return Inertia::render('user/PropertyRequests', [
            'propertyRequests' => $propertyRequests,
        ]);
    }

    public function create()
    {
        return Inertia::render('user/PropertyRequest', []);
    }

    public function store(CreatePropertyRequest $request)
    {
        PropertyRequest::create($request->validated());
    }

    public function edit($id)
    {
        $propertyRequest = PropertyRequest::findOrFail($id);
        return Inertia::render('user/PropertyRequestEdit', [
            'propertyRequest' => $propertyRequest,
        ]);
    }

    public function update(CreatePropertyRequest $request, $id)
    {
        $propertyRequest = PropertyRequest::findOrFail($id);
        $propertyRequest->update($request->validated());

        return redirect()->route('properties.index')->with('success', 'Property request updated successfully.');
    }

    public function delete($id)
    {
        $propertyRequest = PropertyRequest::findOrFail($id);
        $propertyRequest->delete();
        return redirect()->route('properties.index')->with('success', 'Property request deleted successfully.');
    }
}
