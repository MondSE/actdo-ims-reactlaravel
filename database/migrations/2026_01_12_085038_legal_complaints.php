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
        Schema::create('legal_complaints', function (Blueprint $table) {
            $table->id();
            $table->text('ticket_type');
            $table->bigInteger('ticket_no');
            $table->string('full_name', 225);
            $table->text('violation');
            $table->string('officer', 225);
            $table->text('location');
            $table->text('date_complaint');
            $table->text('remarks');
            $table->text('explanation_complain');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
            Schema::table('legal_complaints', function (Blueprint $table) {
                $table->dropColumn([
                    'ticket_type',
                    'ticket_no',
                    'full_name',
                    'violation',
                    'officer',
                    'location',
                    'date_complaint',
                    'remarks',
                    'explanation_complain',
                ]);
            });
    }
};
