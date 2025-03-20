<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


use App\Http\Controllers\RiskCalculationController;

Route::post('calculate-risk', [RiskCalculationController::class, 'calculateRisk']);
Route::get('test', [RiskCalculationController::class, 'testApi']);
