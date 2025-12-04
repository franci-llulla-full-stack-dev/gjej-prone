<?php

use App\Http\Controllers\Property\PropertyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin,individual,bank,agency'])->controller(PropertyController::class)->group(function () {
    Route::get('/properties', 'index')->name('properties.index');
    Route::get('/properties/create', 'create')->name('properties.create');
    Route::post('/properties', 'store')->name('properties.store');
    Route::get('/properties/{property}/edit', 'edit')->name('properties.edit');
    Route::put('/properties/{property}', 'update')->name('properties.update');
    Route::delete('/properties/{property}', 'destroy')->name('properties.destroy');
});
Route::middleware(['auth', 'role:admin'])
    ->post('/properties/{property}/approve', [PropertyController::class,'approve'])
    ->name('properties.approve');
