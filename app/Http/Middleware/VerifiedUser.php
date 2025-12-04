<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifiedUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $role = $user->role->name;
        $isVerified = $user->email_verified_at;

        if (!$isVerified && $role !== 'admin') {
            return redirect()->route(redirectByRoleVerification());
        }
        return $next($request);
    }
}
