<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;

// Notification API routes
Route::middleware(['auth'])->group(function () {
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::get('/notifications/list', [NotificationController::class, 'getNotifications']);
    Route::post('/notifications/read/{id}', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
});

// Dashboard API
Route::middleware(['auth'])->get('/revenue-per-year', [DashboardController::class, 'revenuePerYear']);

// Employee API
Route::middleware(['auth'])->get('/employees', [EmployeeController::class, 'apiIndex']);
