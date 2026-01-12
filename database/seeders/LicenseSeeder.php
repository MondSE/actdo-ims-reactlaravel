<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\License;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class LicenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $ticketTypes = ['towing', 'ticket', 'impounded'];
        $vehicleTypes = ['Single', 'Sedan', 'Truck', 'PUJ', 'Tricycle', 'Bus', 'SUV'];
        $transactionTypes = ['Payed','Pending','Surrender'];
        $offices = ['ACTDO', 'PTRO', 'PNP'];

        for ($i = 0; $i < 30; $i++) {
            License::create([
                'Ticket_No' => $faker->unique()->numberBetween(100000, 999999),
                'Ticket_Types' => $faker->randomElement($ticketTypes),
                'Driver_License_No' => strtoupper(Str::random(8)),
                'Plate_No' => strtoupper($faker->bothify('??###')),
                'Vehicle_Model' => $faker->word(),
                'Vehicle_Color' => $faker->safeColorName(),
                'Full_Name' => $faker->name(),
                'Violation' => $faker->sentence(3),
                'Location' => $faker->city(),
                'Date_Apprehend' => $faker->date(),
                'Type_Vehicle' => $faker->randomElement($vehicleTypes),
                'Office' => $faker->randomElement($offices),
                'Amount_Payment' => $faker->numberBetween(500, 5000),
                'Discount_Amount_Payment' => $faker->numberBetween(0, 500),
                'Date_Transaction' => $faker->date(),
                'Official_Receipt_No' => $faker->unique()->numberBetween(100000, 999999),
                'Discount_Ticket_No' => $faker->word(),
                'Responsible_Name' => $faker->name(),
                'Transaction' => $faker->randomElement($transactionTypes),
                'Officer_Name' => $faker->name(),
                'Remarks' => $faker->sentence(),
                'City' => $faker->city(),
                'Public_Transport_State' => $faker->randomElement(['Yes', 'No']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
