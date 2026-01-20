<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

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

    // Show Registration From
    public function create()
    {
        return Inertia::render('Employees/create');
    }

    // Store employee
    public function store(Request $request)
    {
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'contact_no' => 'nullable|string|max:20',
            'date_hired' => 'required|date',
            'status' => 'required|string',
            'sss_no' => 'nullable|string|max:20',
            'gsis_no' => 'nullable|string|max:20',
            'phil_health_no' => 'nullable|string|max:20',
            'tin_no' => 'nullable|string|max:20',
            'pag_ibig_no' => 'nullable|string|max:20',
            'salary_rate' => 'required|numeric',
            'img_status' => 'nullable|string|max:255',
        ]);

        // create employee
        $employee = Employee::create($validated);

        // Get all users except the current user
        $users = User::where('id', '!=', Auth::id())->get();

        foreach ($users as $user) {
            Notification::create([
                'user_id' => $user->id,
                'title' => 'New Employee',
                'message' => "{$validated['name']} has been added to {$validated['designation']}.". Auth::user()->name,
                'status' => 1,// unread
            ]);
        }

        return redirect()->route('employees.create')->with('success', 'Employee registered successfully!');
    }
}