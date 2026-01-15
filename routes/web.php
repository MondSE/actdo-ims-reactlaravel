<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LicenseController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
      Route::get('dashboard/revenue-per-year', [DashboardController::class, 'revenuePerYear'])
        ->name('dashboard.revenue'); // JSON endpoint for chart
});

// Inertia page
Route::get('/licenses', [LicenseController::class, 'index'])
     ->middleware(['auth', 'verified'])
     ->name('licenses');

// JSON API route
Route::get('/api/licenses', [LicenseController::class, 'apiIndex'])
     ->middleware(['auth', 'verified']);

Route::get('/licenses/{license}', [LicenseController::class, 'show']);
Route::get('/licenses/{license}/edit', [LicenseController::class, 'edit']);

require __DIR__.'/settings.php';
