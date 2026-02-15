<?php

use App\Http\Controllers\Property\PropertyRequestController;

// Public route (accessible to all authenticated users)
Route::get('/property/requests/all', [PropertyRequestController::class, 'showAll'])
    ->name('property.requests.all');

// Routes for users, investors, and admins only (must come before wildcard routes)
Route::group(['middleware' => ['role:user,investor,business,admin', 'auth'], 'controller' => PropertyRequestController::class], function () {
    Route::get('/property/requests',  'index')->name('property.requests.index');
    Route::get('/property/request/create', 'create')->name('property.requests.create');
    Route::post('/property/request', 'store')->name('property.requests.store');
    Route::get('/property/request/{propertyRequest}/edit', 'edit')->name('property.request.edit');
    Route::put('/property/request/{propertyRequest}/re-upload', 'reUpload')->name('property.request.re-upload');
    Route::put('/property/request/{propertyRequest}/toggle-completed', 'toggleCompleted')->name('property.request.toggle-completed');
    Route::put('/property/request/{propertyRequest}', 'update')->name('property.request.update');
    Route::delete('/property/request/{propertyRequest}', 'destroy')->name('property.request.destroy');
});

// Routes accessible to all authenticated users (wildcard routes should be last)
Route::middleware(['auth'])->controller(PropertyRequestController::class)->group(function () {
    Route::get('/property/request/{propertyRequest}', 'show')->name('property.request.show');
    Route::post('/property/request/{propertyRequest}/toggleSave', 'toggleSave')->name('property.request.toggleSave');
});

