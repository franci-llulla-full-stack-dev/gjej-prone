<?php

use App\Http\Controllers\Property\{
    PropertyController,
    AdminPropertyController
};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:individual,bank,agency', 'verified.custom'])->controller(PropertyController::class)->group(function () {
    Route::get('/properties', 'index')->name('properties.index');
    Route::get('/properties/create', 'create')->name('properties.create');
    Route::post('/properties', 'store')->name('properties.store');
    Route::get('/properties/{property}/edit', 'edit')->name('properties.edit');
    Route::put('/properties/{property}', 'update')->name('properties.update');
    Route::post('/properties/{property}/delete', 'destroy')->name('properties.destroy');
});
Route::middleware(['auth', 'role:admin'])
    ->post('/properties/{property}/approve', [PropertyController::class,'approve'])
    ->name('properties.approve');

Route::controller(PropertyController::class)->group(function () {
   Route::get('/listed-properties', 'listedProperties')->name('properties.listed');
   Route::get('/property/new-request', 'showNewRequest')->name('properties.new.request');
});

Route::middleware(['auth', 'role:admin'])->controller(AdminPropertyController::class)->group(function () {
    Route::get('/admin/properties', 'index')->name('admin.properties.index');
    Route::get('/admin/properties/create', 'create')->name('admin.properties.create');
    Route::post('/admin/properties', 'store')->name('admin.properties.store');
    Route::get('/admin/properties/{property}/edit', 'edit')->name('admin.properties.edit');
    Route::put('/admin/properties/{property}', 'update')->name('admin.properties.update');
    Route::delete('/admin/properties/{property}', 'destroy')->name('admin.properties.destroy');
});
