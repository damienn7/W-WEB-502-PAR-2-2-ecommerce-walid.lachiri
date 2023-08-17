<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Articles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CPUSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $gpuBrand = ["Intel Core i7", "AMD Ryzen 5", "Intel Core i5", "AMD Ryzen 7"];

        for ($i = 3; $i < 20; $i++) {
            DB::table('items')->insert([
                'name' => $gpuBrand[rand(0, 2)] . " " . rand(5, 13) . "700",
                "id_category" => 1,
                "image" => "https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/2/c/8/2c87c6244d_50183446_processeur-singkham-adobe-stock.jpg",
                'description' => "Cette carte graphique est ".Str::random(20),
                'views' => rand(300, 700),
                'price' => rand(300, 700),
                'stock' => rand(300, 700)
            ]);

        }
        ;
    }
}