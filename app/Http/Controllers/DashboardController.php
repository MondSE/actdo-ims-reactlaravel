<?php

namespace App\Http\Controllers;

use App\Models\Accident;
use App\Models\Employee;
use App\Models\LegalComplaint;
use App\Models\License;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;



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
            'inventory_towing' => License::where('Ticket_Types', 'towing')->where('Transaction', 'Pending')->count(),
            'inventory_ticket' => License::where('Ticket_Types', 'ticket')->where('Transaction', 'Pending')->count(),
            'inventory_impounded' => License::where('Ticket_Types', 'impounded')->where('Transaction', 'Pending')->count(),
        ];

        $employeeCount = [
            'active' => Employee::where('status', 'Active')->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'accidents' => Accident::count(),
                'employees' => $employeeCount,
                'complaints' => LegalComplaint::count(),
                'licenses' => $licenseCounts, // now an array of three types,
            ],
        ]);
    }

    public function revenuePerYear()
    {
         $data = DB::table('licenses')
            ->select(
                DB::raw('YEAR(date_transaction) as year'),
                DB::raw('SUM(amount_payment) as total')
            )
            ->where('transaction', 'paid') // only paid transactions count as revenue
            ->groupBy('year')
            ->orderBy('year', 'ASC')
            ->get();

        return response()->json($data);
    }
    
}
