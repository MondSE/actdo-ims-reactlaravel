<?php

namespace App\Http\Controllers;

use App\Models\Accident;
use App\Models\Employee;
use App\Models\LegalComplaint;
use App\Models\License;
use Inertia\Inertia;


class DashboardController extends Controller
{
    //
    public function index()
    {
        // License counts by type
        $licenseCounts = [
            'towing' => License::where('Ticket_Types', 'towing')->count(),
            'ticket' => License::where('Ticket_Types', 'ticket')->count(),
            'impounded' => License::where('Ticket_Types', 'impounded')->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'accidents' => Accident::count(),
                'employees' => Employee::count(),
                'complaints' => LegalComplaint::count(),
                'licenses' => $licenseCounts, // now an array of three types,
            ],
        ]);
    }
    
}
