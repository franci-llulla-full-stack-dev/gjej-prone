<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $properties = Property::whereNull('deleted_at')
            ->select('id', 'updated_at')
            ->orderByDesc('updated_at')
            ->get();

        $staticPages = [
            ['url' => url('/'),                   'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => url('/listed-properties'),  'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => url('/property/requests/all'), 'priority' => '0.8', 'changefreq' => 'daily'],
            ['url' => url('/register'),           'priority' => '0.6', 'changefreq' => 'monthly'],
            ['url' => url('/login'),              'priority' => '0.5', 'changefreq' => 'monthly'],
            ['url' => url('/terms'),              'priority' => '0.3', 'changefreq' => 'yearly'],
            ['url' => url('/privacy'),            'priority' => '0.3', 'changefreq' => 'yearly'],
        ];

        $content = view('sitemap', [
            'staticPages' => $staticPages,
            'properties'  => $properties,
        ])->render();

        return response($content, 200, ['Content-Type' => 'application/xml']);
    }
}