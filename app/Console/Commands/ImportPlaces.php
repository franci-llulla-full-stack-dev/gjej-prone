<?php

namespace App\Console\Commands;

use App\Models\Place;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ImportPlaces extends Command
{
    protected $signature = 'places:import {--city=tirana : City name}';

    protected $description = 'Import POIs (schools, hospitals, shops, etc.) from OpenStreetMap via Overpass';

    /**
     * Overpass endpoints (fallback rotation)
     */
    protected array $endpoints = [
        'https://overpass.kumi.systems/api/interpreter',
        'https://overpass.openstreetmap.fr/api/interpreter',
        'https://overpass-api.de/api/interpreter',
    ];

    /**
     * City bounding boxes (south, west, north, east)
     */
    protected array $cityBboxes = [
        'tirana' => [41.285, 19.738, 41.375, 19.872],
        'durres' => [41.295, 19.427, 41.350, 19.515],
    ];

    /**
     * Execute the command
     */
    public function handle(): int
    {
        $city = strtolower($this->option('city'));
        $bbox = $this->cityBboxes[$city] ?? null;

        if (!$bbox) {
            $this->error("Unknown city: {$city}");
            return self::FAILURE;
        }

        $query = $this->buildOverpassQuery($bbox);

        $response = $this->callOverpass($query);

        if (!$response) {
            $this->error('All Overpass endpoints failed.');
            return self::FAILURE;
        }

        $elements = $response['elements'] ?? [];
        $count = 0;

        foreach ($elements as $el) {
            if (!isset($el['lat'], $el['lon'])) {
                continue;
            }

            $tags = $el['tags'] ?? [];

            $type = $tags['amenity']
                ?? $tags['shop']
                ?? 'unknown';

            Place::updateOrCreate(
                [
                    'latitude'  => $el['lat'],
                    'longitude' => $el['lon'],
                    'type'      => $type,
                ],
                [
                    'name' => $tags['name'] ?? null,
                    'tags' => $tags,
                ]
            );

            $count++;
        }

        $this->info("Imported {$count} places for {$city}.");

        return self::SUCCESS;
    }

    /**
     * Build a single Overpass query for all POIs
     */
    protected function buildOverpassQuery(array $bbox): string
    {
        [$south, $west, $north, $east] = $bbox;

        return <<<OVERPASS
[out:json][timeout:180];
(
  node["amenity"~"school|hospital|police|fire_station|pharmacy"]
    ($south,$west,$north,$east);
  node["shop"~"supermarket|bakery"]
    ($south,$west,$north,$east);
);
out body;
OVERPASS;
    }

    /**
     * Try all Overpass endpoints until one works
     */
    protected function callOverpass(string $query): ?array
    {
        foreach ($this->endpoints as $endpoint) {
            try {
                $this->line("Trying: {$endpoint}");

                $response = Http::timeout(240)
                    ->asForm()
                    ->post($endpoint, [
                        'data' => $query,
                    ]);

                if ($response->ok()) {
                    dump($response->body());
                    return $response->json();
                }
            } catch (\Throwable $e) {
                $this->warn("Failed: {$endpoint}");
            }

            sleep(1); // be nice to Overpass
        }

        return null;
    }
}
