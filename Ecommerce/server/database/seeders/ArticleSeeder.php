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

        $components = ["CPU", "Ventirad", "Motherboard", "RaM", "GPU", "SSD", "HDD", "Case", "PSU", "Reader/Burner", "Sound card", "Network card", "Assembled", "OS", "SATA Cables", "Case fan", "Mouse", "Keyboard", "KeyboardAndMouse", "Monitor", "Speaker", "Webcam", "USB Drive", "Mousepad", "Headset", "Printer"];
        for ($i = 0; $i < 50; $i++) {
            DB::table('articles')->insert([
                "image" => "https://p1.hiclipart.com/preview/337/402/380/lol-trololo-meme-illustration-png-clipart.jpg",
                'nom' => "NVIDIA " . Str::random(3) . " RTX",
                'description' => $components[rand(0, 25)],
                'prix' => rand(300, 700),
                'stocks_id' => "1"
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