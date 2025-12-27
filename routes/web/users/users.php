<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->controller(UserController::class)->group(function () {
    Route::get('/admin/users', 'index')->name('admin.users.index');
});
