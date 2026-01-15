<?php
use App\Http\Controllers\DashboardController;

// routes/api.php
    Route::get('/revenue-per-year', [DashboardController::class, 'revenuePerYear']);