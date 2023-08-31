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
            ['country' => 'Espagne', 'price' => 5,'ban'=>0],
            ['country' => 'Portugal', 'price' => 5,'ban'=>0],
            ['country' => 'Allemagne', 'price' => 7,'ban'=>0],
            ['country' => 'Royaume-Uni', 'price' => 7,'ban'=>0],
            ['country' => 'Italie', 'price' => 7,'ban'=>0],
            ['country' => 'Russie', 'price' => 12,'ban'=>0],
            ['country' => 'États-Unis', 'price' => 15,'ban'=>0],
            ['country' => 'Brésil', 'price' => 15,'ban'=>0],
            ['country' => 'Australie', 'price' => 20,'ban'=>0],
            ['country' => 'Japon', 'price' => 20,'ban'=>0],
            ['country' => 'Afrique du Sud', 'price' => 18,'ban'=>0],
            ['country' => 'Canada', 'price' => 15,'ban'=>0],
            ['country' => 'Chine', 'price' => 18,'ban'=>0],
            ['country' => 'Inde', 'price' => 18,'ban'=>0],
            ['country' => 'Argentine', 'price' => 18,'ban'=>0],
            ['country' => 'Belgique', 'price' => 6,'ban'=>0],
            ['country' => 'Pays-Bas', 'price' => 6,'ban'=>0],
            ['country' => 'Irlande', 'price' => 8,'ban'=>0],
            ['country' => 'Pologne', 'price' => 7,'ban'=>0],
            ['country' => 'Suisse', 'price' => 7777777,'ban'=>0],
            ['country' => 'Grèce', 'price' => 9,'ban'=>0],
            ['country' => 'Turquie', 'price' => 13,'ban'=>0],
            ['country' => 'Norvège', 'price' => 10,'ban'=>0],
            ['country' => 'Suède', 'price' => 10,'ban'=>0],
            ['country' => 'Danemark', 'price' => 9,'ban'=>0],
            ['country' => 'Autriche', 'price' => 7,'ban'=>0],
            ['country' => 'Finlande', 'price' => 11,'ban'=>0],
            ['country' => 'Hongrie', 'price' => 8,'ban'=>0],
            ['country' => 'Ukraine', 'price' => 12,'ban'=>0],
            ['country' => 'Mexique', 'price' => 14,'ban'=>0],
            ['country' => 'Nouvelle-Zélande', 'price' => 21,'ban'=>0],
            ['country' => 'Corée du Sud', 'price' => 19,'ban'=>0],
            ['country' => 'Taïwan', 'price' => 19,'ban'=>0],
            ['country' => 'Malaisie', 'price' => 17,'ban'=>0],
            ['country' => 'Thaïlande', 'price' => 17,'ban'=>0],
            ['country' => 'Singapour', 'price' => 16,'ban'=>0],
            ['country' => 'Philippines', 'price' => 18,'ban'=>0],
            ['country' => 'Vietnam', 'price' => 18,'ban'=>0],
            ['country' => 'Indonésie', 'price' => 18,'ban'=>0],
            ['country' => 'Arabie Saoudite', 'price' => 16,'ban'=>0],
            ['country' => 'Émirats Arabes Unis', 'price' => 16,'ban'=>0],
            ['country' => 'Israël', 'price' => 3,'ban'=>1],
            ['country' => 'Égypte', 'price' => 15,'ban'=>0],
            ['country' => 'Palestine', 'price' => 1,'ban'=>0],
            ['country' => 'Maroc', 'price' => 12,'ban'=>0],
            ['country' => 'Chili', 'price' => 18,'ban'=>0],
            ['country' => 'Colombie', 'price' => 17,'ban'=>0],
            ['country' => 'Venezuela', 'price' => 19,'ban'=>0],
            ['country' => 'Nigéria', 'price' => 20,'ban'=>0],
            ['country' => 'Kenya', 'price' => 20,'ban'=>0],
            ['country' => 'Ouganda', 'price' => 21,'ban'=>0],
            ['country' => 'Baldur', 'price' => 0,'ban'=>0],
            ['country' => 'France', 'price' => 0,'ban'=>0]

        ];

        DB::table('shipping_fee')->insert($countries);
    }
}
