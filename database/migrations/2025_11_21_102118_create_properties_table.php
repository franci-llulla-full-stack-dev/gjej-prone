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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('type_of_sale')->nullable();
            $table->string('property_type')->nullable();
            $table->string('property_category')->nullable();
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->double('surface')->nullable();
            $table->double('price')->nullable();
            $table->string('currency')->nullable();
            $table->text('description')->nullable();
            $table->integer('total_rooms')->nullable();
            $table->integer('total_bathrooms')->nullable();
            $table->integer('total_balconies')->nullable();
            $table->integer('floor_number')->nullable();
            $table->integer('total_floors')->nullable();
            $table->integer('year_built')->nullable();
            $table->string('badge_status')->nullable();
            $table->boolean('sold')->default(false);
            $table->boolean('verified')->default(false);
            $table->integer('order')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
