<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('licenses', function (Blueprint $table) {
            $table->id();

            // Basic Info
            $table->bigInteger('ticket_no')->unique();
            $table->string('ticket_types', 30);

            $table->text('full_name');
            $table->text('violation');

            // Driver / Vehicle Info
            $table->text('driver_license_no')->nullable();
            $table->text('plate_no')->nullable();
            $table->text('vehicle_model')->nullable();
            $table->text('vehicle_color')->nullable();
            $table->string('type_vehicle', 50)->nullable();
            $table->text('public_transport_state')->nullable();

            // Location & Officer
            $table->text('location')->nullable();
            $table->text('city')->nullable();
            $table->string('office', 100);
            $table->string('officer_name', 255);

            // Dates
            $table->date('date_apprehend')->nullable();

            // Payment (IMPORTANT FIX)
            $table->decimal('amount_payment', 10, 2)->default(0);
            $table->decimal('discount_amount_payment', 10, 2)->default(0);
            $table->string('official_receipt_no')->nullable();
            $table->date('date_transaction')->nullable();
            $table->text('discount_ticket_no')->nullable();
            $table->text('responsible_name')->nullable();

            // Status
            $table->string('transaction')->default('Pending');

            // Other
            $table->text('remarks')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        schema::table('licenses', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
