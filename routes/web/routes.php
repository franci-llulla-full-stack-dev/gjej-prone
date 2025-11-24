<?php

use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', DashboardController::class)->name('admin.dashboard');
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
