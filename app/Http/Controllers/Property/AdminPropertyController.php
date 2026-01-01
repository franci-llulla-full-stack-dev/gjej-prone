<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::query();
        if ($request->filled('verified')) {
            $query->where('verified', $request->verified);
        }

        if ($request->filled('type_of_sale')) {
            $query->where('type_of_sale', $request->type_of_sale);
        }

        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        $properties = $query->paginate($request->per_page ?? 10);

        return Inertia::render('admin/Properties', [
            'properties' => $properties->items(),
            'pagination' => [
                'current_page' => $properties->currentPage(),
                'per_page' => $properties->perPage(),
                'total' => $properties->total(),
            ],
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy(Property $property)
    {
        $property->delete();

        return back()->with(['success' => 'Property deleted successfully']);
    }
}
