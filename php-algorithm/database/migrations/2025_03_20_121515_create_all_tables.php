<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllTables extends Migration
{
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->integer('years_of_experience')->default(0);
            $table->integer('job_tenure')->default(0); 
            $table->timestamps();
        });


        Schema::create('employee_risks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade'); 
            $table->integer('risk_of_bribery')->default(0); 
            $table->integer('employee_efficiency')->default(0); 
            $table->integer('turnover_risk')->default(0);
            $table->timestamps();
        });


        Schema::create('characteristics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade'); 
            $table->string('characteristic_name'); 
            $table->integer('score')->default(0);  
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('characteristics');
        Schema::dropIfExists('employee_risks');
        Schema::dropIfExists('employees');
    }
}

