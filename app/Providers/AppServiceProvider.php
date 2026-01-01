<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('auth', function () {
            $user = Auth::user();
            return [
                'user' => Auth::user() ? [
                    'name' => $user->name . ' ' . $user->surname,
                    'role' => $user->role->name,
                    'email' => $user->email,
                ] : null,
            ];
        });

        Inertia::share('flash', function () {
            return [
                'success' => session('success'),
                'error' => session('error'),
            ];
        });

        if(config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
