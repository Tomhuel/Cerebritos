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
        Schema::create('father_kid', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('father_id');
            $table->unsignedBigInteger('kid_id');

            $table->foreign('father_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('kid_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
