<?php

use App\Http\Controllers\Property\{PropertyController,
    AdminPropertyController,
    PropertyDocumentController,
    PropertyMediaController};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:individual,bank,agency', 'verified.custom'])->controller(PropertyController::class)->group(function () {
    Route::get('/properties', 'index')->name('properties.index');
    Route::get('/properties/create', 'create')->name('properties.create');
    Route::post('/properties', 'store')->name('properties.store');
    Route::get('/properties/{property}/edit', 'edit')->name('properties.edit');
    Route::put('/properties/{property}', 'update')->name('properties.update');
    Route::post('/properties/{property}/delete', 'destroy')->name('properties.destroy');
    Route::put('/properties/{property}/toggle-sold', 'toggleSold')->name('properties.sold');
});

Route::middleware(['auth', 'role:individual, bank,agency', 'verified.custom'])->controller(PropertyMediaController::class)->group(function () {
    Route::post('/property/{property}/images','store');
    Route::delete('/property/{property}/images/{propertyMedia}', 'destroy');
});

Route::middleware(['auth', 'role:individual, bank,agency', 'verified.custom'])->controller(PropertyDocumentController::class)->group(function () {
    Route::post('/property/{property}/document/hipoteke','storeHipoteke');
    Route::delete('/property/{property}/document/hipoteke/{propertyDocument}','destroyHipoteke');
    Route::post('/property/{property}/document/plan', 'storePlan');
    Route::delete('/property/{property}/document/plan/{propertyDocument}', 'destroyPlan');
});

Route::get('/properties/{property}', [PropertyController::class, 'show'])->middleware('auth')->name('properties.show');

Route::controller(PropertyController::class)->group(function () {
   Route::get('/listed-properties', 'listedProperties')->name('properties.listed');
});

Route::middleware(['auth', 'role:admin'])->controller(AdminPropertyController::class)->group(function () {
    Route::get('/admin/properties', 'index')->name('admin.properties.index');
    Route::get('/admin/properties/create', 'create')->name('admin.properties.create');
    Route::post('/admin/properties', 'store')->name('admin.properties.store');
    Route::get('/admin/properties/{property}/edit', 'edit')->name('admin.properties.edit');
    Route::put('/admin/properties/{property}', 'update')->name('admin.properties.update');
    Route::delete('/admin/properties/{property}', 'destroy')->name('admin.properties.destroy');
});
Route::middleware(['auth', 'role:admin'])
    ->post('/admin/properties/{property}/verify', [PropertyController::class, 'verify'])
    ->name('properties.approve');
