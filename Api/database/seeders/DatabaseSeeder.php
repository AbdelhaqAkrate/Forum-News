<?php

namespace Database\Seeders;
use App\models\Categorie;
use App\models\User;
use App\models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $categories = Categorie::factory(10)->create();

        User::factory(10)->create()->each(function ($user) use ($categories){
            Post::factory(rand(1, 3))->create([
                    'user_id' => $user->id,
                    'categorie_id' => ($categories->random(1)->first())->id
            ]);
        });
    }
}
