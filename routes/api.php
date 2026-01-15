<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;

// routes/api.php
    Route::get('/revenue-per-year', [DashboardController::class, 'revenuePerYear']);

Route::get('/employees', [EmployeeController::class, 'index']);
