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
        Schema::create('accidents', function (Blueprint $table) {
            $table->id();
            $table->text('code');
            $table->dateTime('date_time');
            $table->text('location');
            $table->text('damage');
            $table->integer('fatality');
            $table->integer('injured');
            $table->string('cctv', 225);
            $table->text('involved');

            // Operator is an employee
            $table->foreignId('operator_id')->nullable()->constrained('employees')->nullOnDelete();

            $table->integer('single');
            $table->integer('sedan');
            $table->integer('truck');
            $table->integer('puj');
            $table->integer('tricycle');
            $table->integer('bus');
            $table->integer('suv');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
            Schema::table('accidents', function (Blueprint $table) {
                $table->dropColumn([
                    'code',
                    'date_time',
                    'location',
                    'damage',
                    'fatality',
                    'injured',
                    'cctv',
                    'involved',
                    'operator_id',
                    'single',
                    'sedan',
                    'truck',
                    'puj',
                    'tricycle',
                    'bus',
                    'suv',
                ]);
            });
    }
};
