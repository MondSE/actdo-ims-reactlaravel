<?php

namespace App\Http\Controllers;

use App\Models\Accident;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AccidentController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Accident::query();

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('damage', 'like', "%{$search}%")
                  ->orWhere('involved', 'like', "%{$search}%");
            });
        }

        // Pagination
        $accidents = Accident::with('operator')
        ->orderBy('date_time', 'desc')
        ->paginate(10);

        return Inertia::render('Accidents/index', [
            'accidents' => $accidents->through(fn($a) => [
            'id' => $a->id,
            'code' => $a->code,
            'date_time' => $a->date_time,
            'location' => $a->location,
            'damage' => $a->damage,
            'fatality' => $a->fatality,
            'injured' => $a->injured,
            'cctv' => $a->cctv,
            'involved' => $a->involved,
            'single' => $a->single,
            'sedan' => $a->sedan,
            'truck' => $a->truck,
            'puj' => $a->puj,
            'tricycle' => $a->tricycle,
            'bus' => $a->bus,
            'suv' => $a->suv,
            'operator_name' => $a->operator?->name ?? 'Unknown',
        ]),
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(Accident $accident)
    {
        return response()->json($accident);
    }

    public function apiIndex(Request $request)
{
   $query = Accident::with('operator'); // eager load operator

    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('code', 'like', "%{$search}%")
              ->orWhere('location', 'like', "%{$search}%")
              ->orWhere('involved', 'like', "%{$search}%")
              ->orWhereHas('operator', function($q2) use ($search) {
                  $q2->where('name', 'like', "%{$search}%");
              });
        });
    }

    $accidents = $query->orderBy('date_time', 'desc')->paginate(10);

    // Add operator_name to JSON
    $accidents->getCollection()->transform(function ($accident) {
        $accident->operator_name = $accident->operator?->name ?? 'Not Available';
        return $accident;
    });

    return response()->json($accidents);
}


}
