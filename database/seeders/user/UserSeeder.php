<?php

namespace Database\Seeders\user;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $userRole = Role::where('name', 'user')->first();
        $individualRole = Role::where('name', 'individual')->first();
        $bankRole = Role::where('name', 'bank')->first();
        $agencyRole = Role::where('name', 'agency')->first();

        User::updateOrCreate(
            [
                'email' => 'franci.llulla1@gmail.com'
            ],
            [
                'role_id' => $adminRole->id,
                'name' => 'Franci',
                'surname' => 'Llulla',
                'phone_number' => '+355694749463',
                'birth_date' => '1999-12-21',
                'address' => 'Tirane',
                'password' => Hash::make('1999f.l.1221.'),
            ]
        );
        User::updateOrCreate(
            [
                'email' => 'egiobeshi@gmail.com'
            ],
            [
                'role_id' => $adminRole->id,
                'name' => 'Egio',
                'surname' => 'Beshi',
                'phone_number' => '+355697727747',
                'birth_date' => '1998-3-18',
                'address' => 'Tirane',
                'password' => Hash::make('Egio19982025!'),
            ]
        );

        User::updateOrCreate(
            [
                'email' => 'gjejprone@gmail.com'
            ],
            [
                'role_id' => $agencyRole->id,
                'name' => 'GjejProne',
                'surname' => 'Agency',
                'phone_number' => '+355697727747',
                'birth_date' => '1998-3-18',
                'address' => 'Tirane',
                'password' => Hash::make('@@GJEJPRONE2026@@'),
            ]
        );
    }
}
