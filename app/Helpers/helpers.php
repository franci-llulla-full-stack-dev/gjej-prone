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
            'agency' => 'agency.dashboard',
            'bank' => 'bank.dashboard',
            'user' => 'user.dashboard',
            default => 'home',
        };
        return $redirectRoute;
    }
}
