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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nipt')->nullable();
            $table->string('company_phone_number')->nullable();
            $table->boolean('years_experience')->nullable();
            $table->text('company_description')->nullable();
            $table->string('logo_path')->nullable();
            $table->integer('finished_projects')->default(0);
            $table->string('website')->nullable();
            $table->float('year_budget')->nullable();
            $table->json('preferred_locations')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('nipt');
            $table->dropColumn('company_phone_number');
            $table->dropColumn('years_experience');
            $table->dropColumn('company_description');
            $table->dropColumn('logo_path');
            $table->dropColumn('finished_projects');
            $table->dropColumn('website');
            $table->dropColumn('year_budget');
            $table->dropColumn('preferred_locations');
        });
    }
};
