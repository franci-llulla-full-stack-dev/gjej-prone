<?php

use App\Http\Controllers\Auth\AuthController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
Route::middleware('auth.custom')->group( function () {
    Route::get('/', function () {
        return Inertia::render('Landing', []);
    });
    Route::controller(AuthController::class)->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::post('/login', 'authenticate')->name('authenticate');
        Route::get('register', 'register')->name('register');
        Route::post('/register', 'storeRegistration')->name('store.registration');

    });
});
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

