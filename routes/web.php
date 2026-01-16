<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AccidentController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
      Route::get('dashboard/revenue-per-year', [DashboardController::class, 'revenuePerYear'])
        ->name('dashboard.revenue'); // JSON endpoint for chart

    // Employee routes for Registration
     Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
});


// License routes
// Inertia page
Route::get('/licenses', [LicenseController::class, 'index'])
     ->middleware(['auth', 'verified'])
     ->name('licenses');

// JSON API route
Route::get('/api/licenses', [LicenseController::class, 'apiIndex'])
     ->middleware(['auth', 'verified']);

Route::get('/licenses/{license}', [LicenseController::class, 'show']);
Route::get('/licenses/{license}/edit', [LicenseController::class, 'edit']);


// Employee routes
Route::get('/employees',[EmployeeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('employees.index');

// JSON API route
Route::get('/api/employees', [EmployeeController::class, 'apiIndex'])
    ->middleware(['auth', 'verified']);

// Accident routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/accidents', [AccidentController::class, 'index'])->name('accidents.index');
});

Route::get('/api/accidents', [AccidentController::class, 'apiIndex']);

require __DIR__.'/settings.php';
