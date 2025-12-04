<?php

use App\Http\Middleware\AuthenticationMiddleware;
use App\Http\Middleware\AuthenticedMiddleware;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\VerifiedUser;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web/routes.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
        $middleware->alias([
            'auth.custom' => AuthenticationMiddleware::class,
            'role' => AuthenticedMiddleware::class,
            'verified.custom' => VerifiedUser::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
