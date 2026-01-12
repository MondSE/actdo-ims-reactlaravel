<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accident extends Model
{
    //
    protected $fillable = [
        'code',
        'date_time',
        'location',
        'damage',
        'fatality',
        'injured',
        'cctv',
        'involved',
        'operator_id',
        'single',
        'sedan',
        'truck',
        'puj',
        'tricycle',
        'bus',
        'suv',
    ];

    protected $casts = [
        'date_time' => 'datetime',
    ];

    public function operator()
    {
        return $this->belongsTo(Employee::class, 'operator_id');
    }
}
