<?php

namespace App\Http\Controllers\Property;

use App\Http\Requests\Property\CreatePropertyRequestRequest;
use App\Models\PropertyRequest;
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

    public function showAll(Request $request)
    {
        $user = auth()->user();
        if($user->role->name === 'user') {
            abort(403);
        }
        $query = PropertyRequest::query();
        $propertyRequests = $query->paginate($request->perPage ?? 12);

        return Inertia::render('seller/PropertyRequests', [
            'propertyRequests' => $propertyRequests,
        ]);
    }

    public function create()
    {
        return Inertia::render('user/PropertyRequest', []);
    }

    public function store(CreatePropertyRequestRequest $request)
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

    public function update(CreatePropertyRequestRequest $request, PropertyRequest $propertyRequest)
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
        $user = auth()->user();
        if($user->role->name === 'user') {
            if($user->id !== $propertyRequest->user_id) {
                abort(403);
            }
        }
        $actualContact = '';
        if($user->role->name === 'admin') {
            $actualContact = $propertyRequest->user->phone_number;
        }
        return Inertia::render('user/ViewPropertyRequest', [
            'propertyRequest' => $propertyRequest,
            'actual_contact' => $actualContact,
        ]);
    }
}
