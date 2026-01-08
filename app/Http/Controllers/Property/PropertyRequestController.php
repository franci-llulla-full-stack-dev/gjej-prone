<?php

namespace App\Http\Controllers\Property;

use App\Http\Requests\FilterRequest;
use App\Http\Requests\Property\CreatePropertyRequestRequest;
use App\Models\PropertyRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\PropertyRequestServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyRequestController
{
    public function __construct(private PropertyRequestServices $requestServices)
    {
    }

    public function index(FilterRequest $request)
    {
        [$query, $users] = $this->requestServices->filterRequests($request->validated());
        $propertyRequests = $query->latest()
            ->paginate(20);

        return Inertia::render('user/PropertyRequests', [
            'propertyRequests' => $propertyRequests,
            'users' => $users,
        ]);
    }

    public function showAll(FilterRequest $request)
    {
        $user = auth()->user();
        if($user->role->name === 'user') {
            abort(403);
        }
        [$query] = $this->requestServices->filterRequests($request->validated());
        $propertyRequests = $query->paginate($request->perPage ?? 12);

        return Inertia::render('seller/PropertyRequests', [
            'propertyRequests' => $propertyRequests,
        ]);
    }

    public function create()
    {
        $isAdmin = auth()->user()->role->name === 'admin';
        if($isAdmin) {
            $users = Role::where('name', 'user')->first()->users()->select('id', 'name', 'surname')->get();
        }else {
            $users = [];
        }
        return Inertia::render('user/PropertyRequest', [
            'isAdmin' => $isAdmin,
            'users' => $users
        ]);
    }

    public function store(CreatePropertyRequestRequest $request)
    {
        $user = auth()->user();
        $isAdmin = $user->role->name === 'admin';
        if($isAdmin) {
            $belongingRequestUser = User::find((int)$request->user_id);
            if(!$belongingRequestUser) {
                return redirect()->back()->withErrors(['user_id' => 'User not found.'])->withInput();
            }
           $belongingRequestUser->propertyRequests()->create($request->except('user_id'));
            return redirect()->route('property.requests.index')->with('success', 'Kerkesa e prones u shtua!');
        }
        $user->propertyRequests()->create($request->except('user_id'));

        return redirect()->route('property.requests.index')->with('success', 'Kerkesa e prones u shtua!');
    }

    public function edit(PropertyRequest $propertyRequest)
    {
        if(auth()->id() !== $propertyRequest->user_id && auth()->user()->role->name !== 'admin') {
            abort(403);
        }
        if(auth()->user()->role->name === 'admin') {
            $users = Role::where('name', 'user')->first()->users()->select('id', 'name', 'surname')->get();
        }else {
            $users = [];
        }
        $isAdmin = auth()->user()->role->name === 'admin';
        return Inertia::render('user/PropertyRequestEdit', [
            'propertyRequest' => $propertyRequest,
            'users' => $users,
            'isAdmin' => $isAdmin
        ]);
    }

    public function update(CreatePropertyRequestRequest $request, PropertyRequest $propertyRequest)
    {
        if(auth()->id() !== $propertyRequest->user_id && auth()->user()->role->name !== 'admin') {
            abort(403);
        }
        $user = auth()->user();
        $isAdmin = $user->role->name === 'admin';
        if($isAdmin) {
            $propertyRequest->update($request->validated());
            return redirect()->route('property.requests.index')->with('success', 'Kerkesa e prones u perditesua!');
        }
        $propertyRequest->update($request->validated()->except('user_id'));

        return redirect()->route('property.requests.index')->with('success', 'Kerkesa e prones u perditesua!');
    }

    public function destroy(PropertyRequest $propertyRequest)
    {
        if(auth()->id() !== $propertyRequest->user_id && auth()->user()->role->name !== 'admin') {
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
        $this->requestServices->logView($propertyRequest->id);
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
