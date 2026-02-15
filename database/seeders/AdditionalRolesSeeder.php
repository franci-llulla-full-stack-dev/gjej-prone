<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class AdditionalRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'developer'],
            ['name' => 'business'],
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate(['name' => $roleData['name']]);
        }

        $this->command->info('Role të reja u shtuan me sukses!');
        $this->command->info('- developer (Zhvillues/Ndërtues për Shitje)');
        $this->command->info('- business (Biznes - Kërkon Hapësira Komerciale)');
    }
}
