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
            $table->bigInteger('ticket_no');
            $table->string('ticket_types', 30);
            $table->text('driver_license_no');
            $table->text('plate_no');
            $table->text('vehicle_model');
            $table->text('vehicle_color');
            $table->text('full_name');
            $table->text('violation');
            $table->text('location');
            $table->date('date_apprehend')->nullable();
            $table->string('type_vehicle', 10);
            $table->string('office', 10);
            $table->bigInteger('amount_payment');
            $table->bigInteger('discount_amount_payment');
            $table->date('date_transaction')->nullable();
            $table->bigInteger('official_receipt_no');
            $table->text('discount_ticket_no');
            $table->text('responsible_name');
            $table->text('transaction')->nullable();
            $table->string('officer_name', 255);
            $table->text('remarks');
            $table->text('city');
            $table->text('public_transport_state');

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
