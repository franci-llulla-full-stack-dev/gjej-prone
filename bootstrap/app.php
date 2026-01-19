<?php

use App\Http\Middleware\AuthenticationMiddleware;
use App\Http\Middleware\AuthenticedMiddleware;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\VerifiedUser;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Session\TokenMismatchException;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
        $exceptions->render(function (NotFoundHttpException $e, $request) {
            if($request->expectsJson()) {
                return null;
            }
            return Inertia::render('errors/NotFound')
                ->toResponse($request)
                ->setStatusCode(404);
        });
        $exceptions->render(function (AuthorizationException $e, $request) {
            if ($request->expectsJson()) {
                return null;
            }

            return Inertia::render('errors/Forbidden', [
                'message' => $e->getMessage() ?: 'Akses i ndaluar',
            ])
                ->toResponse($request)
                ->setStatusCode(403);
        });

        // 403 from abort(403)
        $exceptions->render(function (HttpException $e, $request) {
            if ($e->getStatusCode() !== 403 || $request->expectsJson()) {
                return null;
            }

            return Inertia::render('errors/Forbidden')
                ->toResponse($request)
                ->setStatusCode(403);
        });
        $exceptions->render(function (TokenMismatchException $e, $request) {
            if (!$request->expectsJson()) {
                if (app()->runningInConsole()) {
                    return null;
                }
                return redirect('/')->with('error', 'Try again. Page was expired!');
            }
            return null;
        });
    })->create();
