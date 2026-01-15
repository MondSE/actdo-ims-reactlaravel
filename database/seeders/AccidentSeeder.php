<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Accident;
use App\Models\Employee;
use Faker\Factory as Faker;

class AccidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run():void
    {
        $faker = Faker::create();
        $employeeIds = Employee::pluck('id')->toArray();

        for ($i = 1; $i <= 100; $i++) {

            Accident::create([
                'code' => 'ACC-' . now()->format('Y') . str_pad($i, 4, '0', STR_PAD_LEFT),
                'date_time' => $faker->dateTimeBetween('-10 years', 'now'),
                'location' => $faker->streetAddress(),
                'damage' => $faker->numberBetween(500, 500000), // pesos amount
                'fatality' => $faker->numberBetween(0, 5),
                'injured' => $faker->numberBetween(0, 10),
                'cctv' => $faker->randomElement(['Available', 'Not Available']),
                'involved' => $faker->sentence(8),

                'operator_id' => $faker->randomElement($employeeIds),

                // vehicle counts
                'single'    => $faker->numberBetween(0, 1),
                'sedan'     => $faker->numberBetween(0, 3),
                'truck'     => $faker->numberBetween(0, 2),
                'puj'       => $faker->numberBetween(0, 2),
                'tricycle'  => $faker->numberBetween(0, 4),
                'bus'       => $faker->numberBetween(0, 1),
                'suv'       => $faker->numberBetween(0, 2),
            ]);
        }
    }
}
