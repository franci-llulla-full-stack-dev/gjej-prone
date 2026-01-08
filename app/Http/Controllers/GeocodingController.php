<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeocodingController extends Controller
{
    public function reverseGeocode(Request $request)
    {
        $validated = $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        try {
            $response = Http::withHeaders([
                'User-Agent' => 'RealEstateApp/1.0',
            ])->get('https://nominatim.openstreetmap.org/reverse', [
                'format' => 'json',
                'lat' => $validated['lat'],
                'lon' => $validated['lng'],
                'zoom' => 18,
                'addressdetails' => 1,
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json(['error' => 'Geocoding failed'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
