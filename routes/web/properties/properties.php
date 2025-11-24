<?php

use App\Http\Controllers\Property\PropertyController;
use Illuminate\Support\Facades\Route;

Route::controller(PropertyController::class)->group(function () {
    Route::get('/properties', 'index')->name('properties.index');
});
