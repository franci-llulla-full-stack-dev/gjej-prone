<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Log\LogController;

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/logs', [LogController::class, 'index'])->name('admin.logs.index');
});
