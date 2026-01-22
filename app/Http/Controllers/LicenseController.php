<?php

namespace App\Http\Controllers;

use App\Models\License;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LicenseController extends Controller
{
    /* =======================
     * LIST PAGE (INERTIA)
     * ======================= */
    public function index(Request $request)
    {
        $query = License::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ticket_no', 'like', "%{$search}%")
                  ->orWhere('driver_license_no', 'like', "%{$search}%")
                  ->orWhere('plate_no', 'like', "%{$search}%")
                  ->orWhere('full_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('ticket_type')) {
            $query->where('ticket_types', $request->ticket_type);
        }

        $licenses = $query->latest()
                          ->paginate(10)
                          ->withQueryString();

        return Inertia::render('Licenses/index', [
            'licenses' => $licenses,
            'filters' => $request->only(['search', 'ticket_type']),
        ]);
    }

    /* =======================
     * API LIST
     * ======================= */
    public function apiIndex(Request $request)
    {
        $query = License::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ticket_no', 'like', "%{$search}%")
                  ->orWhere('driver_license_no', 'like', "%{$search}%")
                  ->orWhere('plate_no', 'like', "%{$search}%")
                  ->orWhere('full_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('ticket_type')) {
            $query->where('ticket_types', $request->ticket_type);
        }

        return response()->json(
            $query->latest()->paginate(10)
        );
    }

    /* =======================
     * CREATE PAGE
     * ======================= */
    public function create()
    {
        return Inertia::render('Licenses/create');
    }

    /* =======================
     * STORE LICENSE
     * ======================= */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticket_type' => 'required|string',
            'ticket_no' => 'required|string',

            'full_name' => 'required|array|min:2',
            'full_name.*' => 'string',

            'driver_license_no' => 'nullable|string',
            'plate_no' => 'nullable|string',
            'province_city' => 'nullable|string',

            'brand_model' => 'nullable|string',
            'color_brand_model' => 'nullable|string',
            'vehicle_type' => 'nullable|string',
            'public_transport_state' => 'nullable|string',

            'officer' => 'required|string',
            'office' => 'required|string',

            'location_violation' => 'nullable|string',
            'date_apprehend' => 'required|date',
            'remarks' => 'nullable|string',

            'violation' => 'required|array|min:1',
            'violation.*' => 'string',
        ]);

        License::create([
            'ticket_types' => $validated['ticket_type'],
            'ticket_no' => $validated['ticket_no'],
            'full_name' => implode(' ', $validated['full_name']),
            'driver_license_no' => $validated['driver_license_no'] ?? null,
            'plate_no' => $validated['plate_no'] ?? null,
            'city' => $validated['province_city'] ?? null,
            'vehicle_model' => $validated['brand_model'] ?? null,
            'vehicle_color' => $validated['color_brand_model'] ?? null,
            'type_vehicle' => $validated['vehicle_type'] ?? null,
            'public_transport_state' => $validated['public_transport_state'] ?? null,
            'officer_name' => $validated['officer'],
            'office' => $validated['office'],
            'location' => $validated['location_violation'] ?? null,
            'date_apprehend' => $validated['date_apprehend'],
            'remarks' => $validated['remarks'] ?? null,
            'violation' => implode(', ', $validated['violation']),
            'transaction' => 'Pending',
        ]);

        return redirect()
            ->route('licenses.index')
            ->with('success', 'License created successfully!');
    }

    /* =======================
     * SHOW SINGLE
     * ======================= */
    public function show(License $license)
    {
        return response()->json($license);
    }
}
