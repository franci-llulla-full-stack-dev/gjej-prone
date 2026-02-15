<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Property;
use App\Models\PropertyRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        // Get statistics
        $stats = [
            // Users
            'total_users' => User::count(),
            'users_buyers' => User::whereHas('role', function($q) {
                $q->where('name', 'user');
            })->count(),
            'users_investors' => User::whereHas('role', function($q) {
                $q->where('name', 'investor');
            })->count(),
            'users_sellers_individual' => User::whereHas('role', function($q) {
                $q->where('name', 'individual');
            })->count(),
            'users_sellers_agency' => User::whereHas('role', function($q) {
                $q->where('name', 'agency');
            })->count(),
            'users_sellers_bank' => User::whereHas('role', function($q) {
                $q->where('name', 'bank');
            })->count(),
            'users_sellers_developer' => User::whereHas('role', function($q) {
                $q->where('name', 'developer');
            })->count(),
            'users_business' => User::whereHas('role', function($q) {
                $q->where('name', 'business');
            })->count(),

            // Properties
            'total_properties' => Property::count(),
            'properties_verified' => Property::where('verified', true)->count(),
            'properties_unverified' => Property::where('verified', false)->count(),
            'properties_sold' => Property::where('sold', true)->count(),
            'properties_available' => Property::where('sold', false)->count(),
            'properties_for_sale' => Property::where('type_of_sale', 'sale')->count(),
            'properties_for_rent' => Property::where('type_of_sale', 'rent')->count(),

            // Property Requests
            'total_property_requests' => PropertyRequest::count(),
            'property_requests_completed' => PropertyRequest::where('completed', true)->count(),
            'property_requests_active' => PropertyRequest::where('completed', false)->count(),
            'property_requests_with_architect' => PropertyRequest::where('architect', true)->count(),
            'property_requests_with_interior_design' => PropertyRequest::where('interior_design', true)->count(),

            // Services
            'properties_virtual_tour' => Property::where('virtual_tour', true)->count(),
            'properties_virtual_tour_done' => Property::where('virtual_tour_done', true)->count(),
            'properties_rivleresim' => Property::where('rivleresim', true)->count(),
            'properties_rivleresim_done' => Property::where('rivleresim_done', true)->count(),
            'properties_combo_package' => Property::where('combo_package', true)->count(),

            // Recent activity
            'properties_last_7_days' => Property::where('created_at', '>=', now()->subDays(7))->count(),
            'property_requests_last_7_days' => PropertyRequest::where('created_at', '>=', now()->subDays(7))->count(),
            'users_last_7_days' => User::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}
