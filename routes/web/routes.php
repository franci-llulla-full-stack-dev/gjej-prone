<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\GeocodingController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\PlaceController;
use Illuminate\Support\Facades\Route;
Route::get('/api/reverse-geocode', [GeocodingController::class, 'reverseGeocode']);

Route::middleware('auth')->group(function() {
    Route::get('/dashboard', DashboardController::class)->middleware('role:admin')->name('admin.dashboard');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password/update', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
});
Route::get('/nearby-places', [PlaceController::class, 'nearby']);
Route::get('/terms', function () {
    return \Inertia\Inertia::render('Terms');
});
Route::get('/privacy', function () {
    return \Inertia\Inertia::render('Privacy');
});

$directory = base_path('routes/web');
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($directory)
);

foreach($iterator as $file) {
    if(
        $file->isFile() &&
        $file->getExtension() === 'php'
        && $file->getFilename() !== 'routes.php'
    ) {
        require $file->getPathname();
    }
}
