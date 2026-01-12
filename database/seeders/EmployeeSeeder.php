<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
           Employee::insert([
            [
                'name' => 'John Doe',
                'designation' => 'Traffic Officer',
                'email' => 'john.doe@example.com',
                'contact_no' => '09171234567',
                'date_hired' => '2022-01-10',
                'status' => 'Active',
                'sss_no' => '1234567890',
                'gsis_no' => '9876543210',
                'phil_health_no' => '1122334455',
                'tin_no' => '5566778899',
                'pag_ibig_no' => '6677889900',
                'salary_rate' => 25000,
                'img_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jane Smith',
                'designation' => 'Office Clerk',
                'email' => 'jane.smith@example.com',
                'contact_no' => '09179876543',
                'date_hired' => '2023-03-15',
                'status' => 'Active',
                'sss_no' => '2233445566',
                'gsis_no' => '3344556677',
                'phil_health_no' => '4455667788',
                'tin_no' => '5566778899',
                'pag_ibig_no' => '6677889900',
                'salary_rate' => 20000,
                'img_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
