<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Articles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GPUSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $gpuBrand = ["NVIDIA RTX", "AMD Ryzen"];
        for ($i = 3; $i < 20; $i++) {
            DB::table('items')->insert([
                'name' => $gpuBrand[rand(0, 1)] . " " . Str::random(3) . "0",
                "id_category" => 5,
                "image" => "https://boulanger.scene7.com/is/image/Boulanger/4719072935092_pdm_0?wid=500&hei=500",
                'description' => "Ce processeur est ".Str::random(20),
                'views' => rand(300, 700),
                'price' => rand(300, 700),
                'stock' => rand(300, 700),
            ]);

        }
        ;
    }
}