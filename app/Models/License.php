<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    //
    protected $fillable = [
        'ticket_no',
        'ticket_types',
        'driver_license_no',
        'plate_no',
        'vehicle_model',
        'vehicle_color',
        'full_name',
        'violation',
        'location',
        'date_apprehend',
        'type_vehicle',
        'office',
        'amount_payment',
        'discount_amount_payment',
        'date_transaction',
        'official_receipt_no',
        'discount_ticket_no',
        'responsible_name',
        'transaction',
        'officer_name',
        'remarks',
        'city',
        'public_transport_state',
    ];

    protected $casts = [
        'date_apprehend' => 'date',
        'date_transaction' => 'date',
    ];
}
