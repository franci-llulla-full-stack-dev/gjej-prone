<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PropertyDocumentController extends Controller
{
    public function storeHipoteke(Request $request, Property $property)
    {
        if($property->user_id !== auth()->id())
        {
            abort(403);
        }

        $request->validate(['file' => 'required|file|max:5120']); // 5MB

        $existingFile = $property->documents()->where('file_type', 'hipoteka')->first();
        if($existingFile) {
            Storage::disk('public')->delete($existingFile->path);
            $existingFile->delete();
        }
        $path = $request->file('file')->store("properties/document/hipoteka/{$property->id}", 'public');
        $doc = $property->documents()->create([
            'path' => $path,
            'file_name' => $request->file('file')->getClientOriginalName(),
            'file_type' => 'hipoteka',
        ]);

        return response()->json([
            'message' => 'Hipoteke u ngarkua me sukses',
            'document' => $doc,
        ]);
    }

    public function destroyHipoteke(Property $property, PropertyDocument $propertyDocument)
    {
        if($property->user_id !== auth()->id())
        {
            abort(403);
        }
        abort_unless(
            $propertyDocument->property_id === $property->id,
            403,
            'Unauthorized'
        );
        $deleted = false;
        if ($propertyDocument->path && Storage::disk('public')->exists($propertyDocument->path)) {
            $deleted = Storage::disk('public')->delete($propertyDocument->path);
        }
        if($deleted){
            $propertyDocument->delete();
            return back();
        }
        return back()->withErrors('Unable to delete image.');
    }

    public function storePlan(Request $request, Property $property)
    {
        if($property->user_id !== auth()->id())
        {
            abort(403);
        }

        $request->validate(['file' => 'required|file|max:5120']); // 5MB
        $existingFile = $property->documents()->where('file_type', 'floor_plan')->first();
        if($existingFile) {
            Storage::disk('public')->delete($existingFile->path);
            $existingFile->delete();
        }
        $path = $request->file('file')->store("properties/document/{$property->id}", 'public');

        $doc = $property->documents()->create([
            'path' => $path,
            'file_name' => $request->file('file')->getClientOriginalName(),
            'file_type' => 'floor_plan',
        ]);

        return response()->json([
            'message' => 'Hipoteke u ngarkua me sukses',
            'document' => $doc,
        ]);
    }

    public function destroyPlan(Property $property, PropertyDocument $propertyDocument)
    {
        if($property->user_id !== auth()->id())
        {
            abort(403);
        }

        abort_unless(
            $propertyDocument->property_id === $property->id,
            403,
            'Unauthorized'
        );
        $deleted = false;
        if ($propertyDocument->path && Storage::disk('public')->exists($propertyDocument->path)) {
            $deleted = Storage::disk('public')->delete($propertyDocument->path);
        }
        if($deleted){
            $propertyDocument->delete();
            return back();
        }
        return back()->withErrors('Unable to delete image.');
    }
}
