<?php

namespace Database\Seeders\role;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::updateOrCreate(['name' => 'admin']);
        Role::updateOrCreate(['name' => 'individual']);
        Role::updateOrCreate(['name' => 'agency']);
        Role::updateOrCreate(['name' => 'bank']);
        Role::updateOrCreate(['name' => 'user']);
    }
}
