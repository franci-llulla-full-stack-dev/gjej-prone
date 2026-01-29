<?php
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

if(! function_exists('redirectByRole')) {
    /**
     * Return the route or Inertia redirect depending on the user's role
     *
     * @param string $type 'route' or 'inertia'
     * @return string|\Inertia\Response
     */
    function redirectByRole(string $type = 'route')
    {
        $user = Auth::user();

        $redirectRoute = match ($user->role->name) {
            'admin' => 'admin.dashboard',
            'individual' => 'properties.index',
            'agency' => 'properties.index',
            'bank' => 'properties.index',
            'user' => 'properties.listed',
            'investor' => 'properties.listed',
            default => 'properties.index',
        };
        return $redirectRoute;
    }

    function redirectByRoleVerification()
    {
        $user = Auth::user();

        $redirectRoute = match ($user->role->name) {
            'individual' => 'verification.sent',
            'agency' => 'verification.sent',
            'bank' => 'verification.sent',
            'user' => 'properties.listed',
            'investor' => 'properties.listed',
            default => 'profile',
        };
        return $redirectRoute;
    }
    {

    }
}
