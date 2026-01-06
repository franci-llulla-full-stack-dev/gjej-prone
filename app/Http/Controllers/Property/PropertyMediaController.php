<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PropertyMediaController extends Controller
{
    public function store(Request $request, Property $property)
    {
        if($property->user_id !== auth()->id())
        {
            abort(403);
        }
        $request->validate([
            'images.*' => 'required|image|max:5120', // max 5MB
        ]);

        $uploaded = [];

        // loop through actual files
        foreach ($request->file('images', []) as $image) {
            $path = $image->store("properties/{$property->id}", 'public');

            $media = $property->images()->create([
                'path' => $path,
                'file_name' => $image->getClientOriginalName(),
                'file_type' => $image->getClientMimeType(),
            ]);

            $uploaded[] = [
                'id' => $media->id,
                'url' => '/storage/' . $path,
            ];
        }

        return response()->json([
            'uploadedImages' => $uploaded,
            'message' => 'Foto u ngarkuan me sukses',
        ]);
    }


    public function destroy(Property $property, PropertyMedia $propertyMedia)
    {
        if($property->user_id !== auth()->id())
        {
            abort(403);
        }
        abort_unless(
            $propertyMedia->property_id === $property->id,
            403,
            'Unauthorized'
        );
        $deleted = false;
        if ($propertyMedia->path && Storage::disk('public')->exists($propertyMedia->path)) {
            $deleted = Storage::disk('public')->delete($propertyMedia->path);
        }
        if($deleted){
            $propertyMedia->delete();
            return back();
        }
        return back()->withErrors('Unable to delete image.');
    }
}
