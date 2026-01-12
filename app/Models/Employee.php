<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $fillable = [
       'user_id',
        'name',
        'designation',
        'email',
        'contact_no',
        'date_hired',
        'status',
        'sss_no',
        'gsis_no',
        'phil_health_no',
        'tin_no',
        'pag_ibig_no',
        'salary_rate',
        'img_status',
    ];

    protected $cast = [
        'date_hired' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function accidents()
    {
        return $this->hasMany(Accident::class);
    }
}
