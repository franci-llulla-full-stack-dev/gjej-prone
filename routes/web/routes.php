<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\User\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::get('/dashboard', DashboardController::class)->name('admin.dashboard');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
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
