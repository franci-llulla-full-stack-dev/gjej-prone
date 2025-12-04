<?php

use App\Http\Controllers\Auth\AuthController;
use App\Notifications\CustomVerifyEmail;
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

Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('custom.verify');
Route::middleware('auth')->get('/verify-email/sent', function () {
    return inertia('auth/VerifySent');
})->name('verification.sent');
Route::post('/email/resend-verification', function () {
    $user = request()->user();
    if ($user->email_verified_at) {
        return redirect(redirectByRole());
    }

    $user->notify(new CustomVerifyEmail($user));

    return back()->with('status', 'verification-link-sent');
})->middleware('auth')->name('verification.resend');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

