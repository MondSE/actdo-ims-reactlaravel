<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\License;
use Inertia\Inertia;

class LicenseController extends Controller
{
    public function index(Request $request)
    {
        // Start query
        $query = License::query();

        // Search by multiple fields
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('Ticket_No', 'like', "%{$search}%")
                  ->orWhere('Driver_License_No', 'like', "%{$search}%")
                  ->orWhere('Plate_No', 'like', "%{$search}%")
                  ->orWhere('Full_Name', 'like', "%{$search}%");
            });
        }

        // Filter by ticket type
        if ($request->filled('ticket_type')) {
            $query->where('Ticket_Types', $request->ticket_type);
        }

        // If no search and no filter, still show latest 10 records
        $licenses = $query->orderBy('Date_Apprehend', 'desc')
                          ->paginate(10)
                          ->withQueryString(); // preserve search/filter in pagination

        // return response()->json($licenses);

        // Return to Inertia page
        return Inertia::render('Licenses/index', [
            'licenses' => $licenses,
            'filters' => $request->only(['search', 'ticket_type']),
        ]);
    }

    public function apiIndex(Request $request)
{
    $query = License::query();

    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('Ticket_No', 'like', "%{$search}%")
              ->orWhere('Driver_License_No', 'like', "%{$search}%")
              ->orWhere('Plate_No', 'like', "%{$search}%")
              ->orWhere('Full_Name', 'like', "%{$search}%");
        });
    }

    if ($request->filled('ticket_type')) {
        $query->where('Ticket_Types', $request->ticket_type);
    }

    $licenses = $query->orderBy('Date_Apprehend', 'desc')
                      ->paginate(10)
                      ->withQueryString();

    return response()->json($licenses);
}

}
