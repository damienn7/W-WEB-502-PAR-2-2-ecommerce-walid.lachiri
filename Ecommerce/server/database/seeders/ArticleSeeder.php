<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Articles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $gpuBrand = ["NVIDIA RTX", "AMD Ryzen"];
        for ($i = 3; $i < 53; $i++) {
            DB::table('items')->insert([
                "image" => "https://p1.hiclipart.com/preview/337/402/380/lol-trololo-meme-illustration-png-clipart.jpg",
                'name' => $gpuBrand[rand(0, 1)] . " " . Str::random(3),
                'description' => "Ce PC est ".Str::random(120),
                'price' => rand(300, 700),
                'stocks_id' => "1"
            ]);

            DB::table('items_categories')->insert([
                "id_item" => $i,
                "id_categorie" => rand(0, 25)
            ]);
        }
        ;
        // $faker = \Faker\Factory::create();
        // for($i = 0; $i<50; $i++){
        //     Articles::create([
        //         'nom' => $faker->nom,
        //         'caracteristique' => $faker->caracteristique,
        //         'image' => $faker->image,
        //         'prix' => $faker->prix,
        //         'sous_categorie_id' => $faker->sous_categorie_id,
        //         'panier_id' => $faker->panier_id
        //     ]);
        // }
    }
}