<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if ($roles) {
            // Check if user role is allowed
            if (!in_array($user->role->name, $roles)) {
                // You can customize redirects per role or generic "unauthorized"
                return redirect()->route(redirectByRole())->with('error', 'You are not authorized to access this page.');
            }
        }

        return $next($request);
    }
}
