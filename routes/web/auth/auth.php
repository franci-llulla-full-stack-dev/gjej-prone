<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\ProfileController;
use App\Notifications\CustomVerifyEmail;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
Route::middleware('auth.custom')->group( function () {
    Route::get('/', function () {
        return Inertia::render('Landing', []);
    })->name('landing');
    Route::controller(AuthController::class)->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::post('/login', 'authenticate')->name('authenticate');
        Route::get('register', 'register')->name('register');
        Route::post('/register', 'storeRegistration')->name('store.registration');
        Route::get('/forgot-password', 'forgotPassword')->name('forgot-password');
        Route::post('/forgot-password/mail', 'sendResetLink')->name('send.reset-link');
        Route::get('/reset-password/{token}', function ($token) {
            return Inertia::render('auth/ResetPassword', ['token' => $token, 'email' => request('email')]);
        })->name('password.reset');
        Route::post('/reset-password', 'resetPassword')->name('password.update');
    });
});

Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('custom.verify');
Route::middleware('auth')->get('/verify-email/sent', function () {
    if(auth()->user()->email_verified_at){
        return redirect()->route(redirectByRole());
    }
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
Route::middleware('auth')->delete('/delete-account', [ProfileController::class, 'deleteAccount'])->name('delete.account');
Route::middleware('auth')->post('/logout', [AuthController::class, 'logout'])->name('logout');

