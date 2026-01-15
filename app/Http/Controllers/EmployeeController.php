<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    //
    public function index(Request $request)
    {
       // Start query
       $query = Employee::query();

       // Search by multiple fields
         if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
    }

    // Filter by Desgination
    if ($request->filled('designation')) {
        $query->where('designation', $request->designation);
    }

    // If no search and no filter, still show latest 10 records
    $employees = $query->orderBy('created_at', 'desc')
                      ->paginate(10)
                      ->withQueryString(); // preserve search/filter in pagination
    
    // Return to Inertia page
    return Inertia::render('Employees/index', [
        'employees' => $employees,
        'filters' => $request->only(['search', 'designation']),
    ]);
    }

    public function apiIndex(Request $request)
    {
        $query = Employee::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('designation')) {
            $query->where('designation', $request->designation);
        }

        $employees = $query->orderBy('created_at', 'desc')
                          ->paginate(10)
                          ->withQueryString();

        return response()->json($employees);
    }
}