<?php

namespace App\Http\Controllers\Property;

use App\Http\Requests\Property\CreatePropertyRequest;
use App\Models\PropertyRequest;
use Faker\Provider\en_UG\PhoneNumber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyRequestController
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $propertyRequests = PropertyRequest::where('user_id', $user->id)
            ->latest()
            ->paginate(12);

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
        $user = auth()->user();
        $user->propertyRequests()->create($request->validated());

        return redirect()->route('property.requests.index')->with('success', 'Kerkesa e prones u shtua!');
    }

    public function edit(PropertyRequest $propertyRequest)
    {
        if(auth()->id() !== $propertyRequest->user_id) {
            abort(403);
        }
        return Inertia::render('user/PropertyRequestEdit', [
            'propertyRequest' => $propertyRequest,
        ]);
    }

    public function update(CreatePropertyRequest $request, PropertyRequest $propertyRequest)
    {
        if(auth()->id() !== $propertyRequest->user_id) {
            abort(403);
        }
        $propertyRequest->update($request->validated());

        return redirect()->route('property.requests.index')->with('success', 'Property request updated successfully.');
    }

    public function destroy(PropertyRequest $propertyRequest)
    {
        if(auth()->id() !== $propertyRequest->user_id) {
            abort(403);
        }
        $propertyRequest->delete();
        return redirect()->route('property.requests.index')->with('success', 'Property request deleted successfully.');
    }

    public function show(PropertyRequest $propertyRequest)
    {
        return Inertia::render('user/ViewPropertyRequest', [
            'propertyRequest' => $propertyRequest
        ]);
    }
}
