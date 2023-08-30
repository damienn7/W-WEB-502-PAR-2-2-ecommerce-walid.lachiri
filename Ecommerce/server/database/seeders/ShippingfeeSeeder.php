<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippingfeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = [
            ['country' => 'Espagne', 'price' => 5],
            ['country' => 'Portugal', 'price' => 5],
            ['country' => 'Allemagne', 'price' => 7],
            ['country' => 'Royaume-Uni', 'price' => 7],
            ['country' => 'Italie', 'price' => 7],
            ['country' => 'Russie', 'price' => 12],
            ['country' => 'États-Unis', 'price' => 15],
            ['country' => 'Brésil', 'price' => 15],
            ['country' => 'Australie', 'price' => 20],
            ['country' => 'Japon', 'price' => 20],
            ['country' => 'Afrique du Sud', 'price' => 18],
            ['country' => 'Canada', 'price' => 15],
            ['country' => 'Chine', 'price' => 18],
            ['country' => 'Inde', 'price' => 18],
            ['country' => 'Argentine', 'price' => 18],
            ['country' => 'Belgique', 'price' => 6],
            ['country' => 'Pays-Bas', 'price' => 6],
            ['country' => 'Irlande', 'price' => 8],
            ['country' => 'Pologne', 'price' => 7],
            ['country' => 'Suisse', 'price' => 7777777],
            ['country' => 'Grèce', 'price' => 9],
            ['country' => 'Turquie', 'price' => 13],
            ['country' => 'Norvège', 'price' => 10],
            ['country' => 'Suède', 'price' => 10],
            ['country' => 'Danemark', 'price' => 9],
            ['country' => 'Autriche', 'price' => 7],
            ['country' => 'Finlande', 'price' => 11],
            ['country' => 'Hongrie', 'price' => 8],
            ['country' => 'Ukraine', 'price' => 12],
            ['country' => 'Mexique', 'price' => 14],
            ['country' => 'Nouvelle-Zélande', 'price' => 21],
            ['country' => 'Corée du Sud', 'price' => 19],
            ['country' => 'Taïwan', 'price' => 19],
            ['country' => 'Malaisie', 'price' => 17],
            ['country' => 'Thaïlande', 'price' => 17],
            ['country' => 'Singapour', 'price' => 16],
            ['country' => 'Philippines', 'price' => 18],
            ['country' => 'Vietnam', 'price' => 18],
            ['country' => 'Indonésie', 'price' => 18],
            ['country' => 'Arabie Saoudite', 'price' => 16],
            ['country' => 'Émirats Arabes Unis', 'price' => 16],
            ['country' => 'Israël', 'price' => 3,'ban' => 1],
            ['country' => 'Égypte', 'price' => 15],
            ['country' => 'Palestine', 'price' => 1],
            ['country' => 'Maroc', 'price' => 12],
            ['country' => 'Chili', 'price' => 18],
            ['country' => 'Colombie', 'price' => 17],
            ['country' => 'Venezuela', 'price' => 19],
            ['country' => 'Nigéria', 'price' => 20],
            ['country' => 'Kenya', 'price' => 20],
            ['country' => 'Ouganda', 'price' => 21],
            ['country' => 'Baldur', 'price' => 0],
            ['country' => 'France', 'price' => 0]

        ];

        DB::table('shipping_fee')->insert($countries);
    }
}
