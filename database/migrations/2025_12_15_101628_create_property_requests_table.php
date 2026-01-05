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
        Schema::create('property_requests', function (Blueprint $table) {
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
            $table->double('price_2')->nullable();
            $table->string('virtual_tour_link')->nullable();
            $table->text('description')->nullable();
            $table->integer('total_rooms')->nullable();
            $table->integer('total_bathrooms')->nullable();
            $table->integer('total_balconies')->nullable();
            $table->integer('floor_number')->nullable();
            $table->integer('total_floors')->nullable();
            $table->integer('year_built')->nullable();
            $table->integer('year_built_2')->nullable();
            $table->boolean('ashensor')->default(false);
            $table->boolean('hipoteke')->default(false);
            $table->boolean('verified')->default(false);
            $table->boolean('combo_package')->default(false);
            $table->boolean('virtual_tour')->default(false);
            $table->boolean('rivleresim')->default(false);
            $table->boolean('interior_design')->default(false);
            $table->boolean('architect')->default(false);
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_requests');
    }
};
