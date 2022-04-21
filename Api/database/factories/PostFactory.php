<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(rand(5,10),true),
            'Content' => $this->faker->paragraph(5,true),
            'image' => 'https://via.placeholder.com/1000',
            'likes' => $this->faker->numberBetween(1,10000),
            'dislikes' => $this->faker->numberBetween(1,10000)
        ];
    }
}
