<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type_of_sale'     => $this->faker->randomElement(['rent', 'sale']),
            'property_type'    => $this->faker->randomElement(['apartment', 'house', 'land', 'villa']),
            'property_category'=> $this->faker->randomElement(['residential', 'commercial']),
            'city'             => $this->faker->randomElement(['Tirane', 'Durres']),
            'street'           => $this->faker->streetName(),
            'latitude'         => $this->faker->latitude(41.3, 41.5),
            'longitude'        => $this->faker->longitude(19.4, 19.9),
            'surface'          => $this->faker->numberBetween(30, 350),
            'price'            => $this->faker->numberBetween(20000, 400000),
            'currency'         => 'EUR',
            'description'      => $this->faker->text(500),
            'total_rooms'      => $this->faker->numberBetween(1, 7),
            'total_bathrooms'  => $this->faker->numberBetween(1, 4),
            'total_balconies'  => $this->faker->numberBetween(0, 3),
            'floor_number'     => $this->faker->numberBetween(0, 12),
            'total_floors'     => $this->faker->numberBetween(1, 12),
            'year_built'       => $this->faker->numberBetween(1970, 2024),
            'badge_status'     => $this->faker->boolean(),
            'sold'             => $this->faker->boolean(20), // 20% sold
            'verified'         => $this->faker->boolean(60), // 60% verified
            'order'            => $this->faker->numberBetween(1, 1000),

            // If properties belong to a user:
            'user_id'          => 1, // or random user
        ];
    }
}
