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

        $ticketTypes = ['Towing Ticket', 'Traffic Ticket', 'Impounding Ticket'];
        $vehicleTypes = ['Single', 'Sedan', 'Truck', 'PUJ', 'Tricycle', 'Bus', 'SUV'];
        $transactionTypes = ['Paid','Pending','Surrender'];
        $offices = ['ACTDO', 'PTRO', 'PNP'];

        // Violations lists
        $movingViolations = [
            'Reckless Driving',
            'Over speeding',
            'Counter Flow',
            'Over charging',
            'Using Gadget while Driving',
            'Colorum',
            'Illegal Terminal',
            'Unregistered',
            'Expired Registration',
            'Driving Without License',
            'Invalid Drivers License',
            'No Color Band/Scheme',
            'No Panel Route/Body Number',
            'Refusal to Convey Passenger',
            'TruckBan',
            'Cutting Trip',
            'Smoking While Driving',
            'Overloading',
            'No Headlight, Parklight, Signal Light',
            'Improvised Plate w/ No authority from LTO',
            'Operating Out of Line',
            'Modified Muffler',
            'No Fare Matrix',
            'No Helmet',
            'No Seatbelt',
            'Wearing Slipper',
            'Sleeveless',
            'Disregarding traffic/Police Officer',
            'Arrogant',
            'No Side Mirror',
            'Outer Most Lane',
            'Student Permit',
            'Driving Motorcyle with Child Passenger',
        ];

        $nonMovingViolations = [
            'Obstruction',
            'Disregarding Traffic Sign/Light',
            'Loading/Unloading on Prohibited Zone',
            'Abandonment of Motor Vehicle',
            'Illegal Parking/Stalled Motor Vehicle',
            "No Mayor's Permit",
            'Liqour',
            'Illegal Drugs',
            'No Uniform',
            'Cover Face',
        ];

        $allViolations = array_merge($movingViolations, $nonMovingViolations);

        for ($i = 0; $i < 52560; $i++) {

            // Random date between 2014 and 2025
            $year = rand(2014, 2025);
            $month = rand(1, 12);
            $day = rand(1, 28); // safe day to avoid invalid dates
            $dateApprehend = sprintf("%04d-%02d-%02d", $year, $month, $day);

            License::create([
                'Ticket_No' => $faker->unique()->numberBetween(100000, 999999),
                'Ticket_Types' => $faker->randomElement($ticketTypes),
                'Driver_License_No' => strtoupper(Str::random(8)),
                'Plate_No' => strtoupper($faker->bothify('??###')),
                'Vehicle_Model' => $faker->word(),
                'Vehicle_Color' => $faker->safeColorName(),
                'Full_Name' => $faker->name(),
                'Violation' => $faker->randomElement($allViolations),
                'Location' => $faker->city(),
                'Date_Apprehend' => $dateApprehend,
                'Type_Vehicle' => $faker->randomElement($vehicleTypes),
                'Office' => $faker->randomElement($offices),
                'Amount_Payment' => $faker->numberBetween(500, 5000),
                'Discount_Amount_Payment' => $faker->numberBetween(0, 500),
                'Date_Transaction' => $dateApprehend,
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