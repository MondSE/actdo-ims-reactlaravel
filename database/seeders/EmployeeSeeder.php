<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{
  /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 211; $i++) {

            Employee::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'contact_no' => $faker->phoneNumber,
                'designation' => $faker->randomElement([
                    'Administration',
                    'Enforcement',
                    'Engineering'
                ]),
                'date_hired' => $faker->dateTimeBetween('-2 years', 'now'),
                'status' =>  $faker->randomElement([
                    'Active',
                    'Inactive'
                ]),
                'sss_no' => $faker->unique()->numerify('##-#######-#'),
                'gsis_no' => $faker->unique()->numerify('##-#######-#'),
                'phil_health_no' => $faker->unique()->numerify('##-#######-#'),
                'tin_no' => $faker->unique()->numerify('##-#######-#'),
                'pag_ibig_no' => $faker->unique()->numerify('##-#######-#'),
                'salary_rate' => 600.00,
                'img_status' => 1,
                'status' => $faker->randomElement(['Active', 'Inactive']),
            ]);
        }
    }
}
