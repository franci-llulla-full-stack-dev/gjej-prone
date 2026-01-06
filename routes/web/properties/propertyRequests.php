<?php

use App\Http\Controllers\Property\PropertyRequestController;


Route::group(['middleware' => ['role:user', 'auth'], 'controller' => PropertyRequestController::class], function () {
    Route::get('/property/requests',  'index')->name('property.requests.index');
    Route::get('/property/request/create', 'create')->name('property.requests.create');
});
