<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->controller(UserController::class)->group(function () {
    Route::get('/admin/users', 'index')->name('admin.users.index');
    Route::delete('/admin/users/{user}', 'destroy')->name('admin.users.destroy');
    Route::put('/admin/users/{user}/verify', 'verify')->name('admin.users.verify');
    Route::get('/admin/users/{user}/edit', 'edit')->name('admin.users.edit');
    Route::put('/admin/users/{user}', 'update')->name('admin.users.update');
    Route::get('/admin/users/create', 'create')->name('admin.users.create');
    Route::post('/admin/users', 'store')->name('admin.users.store');
    Route::delete('/admin/users/{id}/force-delete', 'forceDelete')->name('admin.users.forceDelete');
    Route::put('/admin/users/{id}/restore', 'restore')->name('admin.users.restore');
});
