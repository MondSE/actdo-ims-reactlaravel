<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalComplaint extends Model
{
    //
    protected $tabe = 'legal_complaints';

    protected $fillable = [
        'ticket_type',
        'ticket_no',
        'full_name',
        'violation',
        'officer',
        'location',
        'date_complaint',
        'remarks',
        'explanation_complain',
    ];
}
