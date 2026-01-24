<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AccidentController;
use App\Http\Controllers\NotificationController;


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
Route::middleware(['auth'])->group(function () {
    Route::get('/licenses', [LicenseController::class, 'index'])->name('licenses.index');
    Route::get('/licenses/create', [LicenseController::class, 'create'])->name('licenses.create');
    Route::post('/licenses', [LicenseController::class, 'store'])->name('licenses.store');
    Route::post('/licenses/payment', [LicenseController::class, 'storePayment']);
});

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
    
Route::get('/api/employees/active-officers', [EmployeeController::class, 'apiActiveOfficers']);

// Accident routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/accidents', [AccidentController::class, 'index'])->name('accidents.index');
});

Route::get('/api/accidents', [AccidentController::class, 'apiIndex']);


// Notification routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Notifications
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount'])
        ->name('notifications.unread-count');

    Route::get('/notifications/list', [NotificationController::class, 'getNotifications'])
        ->name('notifications.list');

    Route::post('/notifications/read/{id}', [NotificationController::class, 'markAsRead'])
        ->name('notifications.markAsRead');

    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])
        ->name('notifications.markAllAsRead');
});


require __DIR__.'/settings.php';
