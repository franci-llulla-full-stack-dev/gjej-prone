<?php

use App\Http\Controllers\Property\PropertyRequestController;


Route::group(['middleware' => ['role:user', 'auth'], 'controller' => PropertyRequestController::class], function () {
    Route::get('/property/requests',  'index')->name('property.requests.index');
    Route::get('/property/request/create', 'create')->name('property.requests.create');
    Route::post('/property/request', 'store')->name('property.requests.store');
    Route::get('/property/request/{propertyRequest}/edit', 'edit')->name('property.request.edit');
    Route::put('/property/request/{propertyRequest}', 'update')->name('property.request.update');
    Route::delete('/property/request/{propertyRequest}', 'destroy')->name('property.request.destroy');
});

Route::middleware(['role:admin,user,agency,bank,individual', 'auth'])
    ->group(function () {
        Route::get('/property/request/{propertyRequest}', [PropertyRequestController::class, 'show'])
            ->name('property.request.show');
        Route::get('/property/requests/all', [PropertyRequestController::class, 'showAll'])->name('property.requests.all');
    });
