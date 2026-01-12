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

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('name');
            $table->string('designation');
            $table->string('email');
            $table->char('contact_no', 22);
            $table->date('date_hired')->nullable();
            $table->string('status');
            $table->char('sss_no', 22);
            $table->char('gsis_no', 22);
            $table->char('phil_health_no', 22);
            $table->char('tin_no', 22);
            $table->char('pag_ibig_no', 22);
            $table->bigInteger('salary_rate');
            $table->integer('img_status');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
         Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
