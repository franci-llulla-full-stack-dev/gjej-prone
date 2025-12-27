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
}
