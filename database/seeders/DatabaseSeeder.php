<?php

namespace Database\Seeders;

use Database\Seeders\property\PropertySeeder;
use Database\Seeders\role\RoleSeeder;
use Database\Seeders\user\UserSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            PropertySeeder::class,
        ]);
    }
}
