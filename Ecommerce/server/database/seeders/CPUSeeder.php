<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Articles;
use App\Models\Characteristics;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CPUSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
        ['sub_category' =>'Processeur', 'category' =>'Composants'],
        ['sub_category' =>'Ventirad & AIO', 'category' =>'Composants'],
        ['sub_category' =>'Carte mère', 'category' =>'Composants'],
        ['sub_category' =>'Mémoire vive', 'category' =>'Composants'],
        ['sub_category' =>'Carte graphique','category' => 'Composants'],
        ['sub_category' =>'SSD','category' => 'Composants'],
        ['sub_category' =>'Disque dur', 'category' =>'Composants'],
        ['sub_category' =>'Boîtier','category' => 'Composants'],
        ['sub_category' =>'Alimentation','category' => 'Composants'],
        ['sub_category' => 'Lecteur & Graveur','category' => 'Composants'],
        ['sub_category' => 'Carte son', 'category' =>'Composants'],
        ['sub_category' => 'Carte réseau','category' => 'Composants'],
        ['sub_category' => 'Montage', 'category' =>'Options & Accessoires'],
        ['sub_category' => 'Système d\'exploitation', 'category' =>'Options & Accessoires'],
        ['sub_category' => 'Câble SATA','category' => 'Options & Accessoires'],
        ['sub_category' => 'Ventilateur de boîtier', 'category' =>'Options & Accessoires'],
        ['sub_category' => 'Souris', 'category' =>'Périphériques'],
        ['sub_category' => 'Clavier', 'category' =>'Périphériques'],
        ['sub_category' => 'Pack Clavier & Souris', 'category' =>'Périphériques'],
        ['sub_category' => 'Moniteur', 'category' =>'Périphériques'],
        ['sub_category' => 'Enceintes', 'category' =>'Périphériques'],
        ['sub_category' => 'Webcam', 'category' =>'Périphériques'],
        ['sub_category' => 'Clef USB', 'category' =>'Périphériques'],
        ['sub_category' => 'Tapis de souris', 'category' =>'Périphériques'],
        ['sub_category' => 'Casque-Micro', 'category' =>'Périphériques'],
        ['sub_category' => 'Imprimante','category' => 'Périphériques']
        ]);
        
        $intelLetters = ["K", "Q", "F", "M", "T"];
        $cpuBrand = ["Intel Core i7 " . rand(7, 13) . rand(4, 9) . "0" . 0 . $intelLetters[rand(0, 4)], "AMD Ryzen 5 " . rand(6, 9) . rand(3, 9) . rand(1, 5) . 0  . "U", "Intel Core i5 " . rand(7, 13) . rand(4, 9) . "0" . 0 . $intelLetters[rand(0, 4)], "Intel Core i9 " . rand(7, 13) . rand(4, 9) . "0" . 0 . $intelLetters[rand(0, 4)], "AMD Ryzen 7 " . rand(6, 9) . rand(3, 9) . rand(1, 5) . 5  . "U"];
        $cpuImg = ["https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/2/c/8/2c87c6244d_50183446_processeur-singkham-adobe-stock.jpg",
        "https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/03/Intel-Rocker-Lake-2-e1615908186584.jpg",
        "https://media.istockphoto.com/id/1204740322/fr/photo/cpu.jpg?s=612x612&w=0&k=20&c=cF154ASgimXysleBPyYsFMI9_GKkkTpDQ0kZTJnm_K0=",
        "https://www.totalphase.com/media/blog/2022/08/Intel-CPU1.jpg",
        "https://m.media-amazon.com/images/I/41Ur3TLWVXL._AC_UF1000,1000_QL80_.jpg", 
        "https://www.caron-informatique.fr/43408-thickbox/cpu-amd-ryzen-5-4600g-37ghz-am4-box.jpg"];

        for ($i = -1; $i < 30; $i++) {
            DB::table('items')->insert([
                'name' => $cpuBrand[rand(0, 4)],
                "id_category" => 1,
                "image" => $cpuImg[rand(0, 5)],
                'description' => "Ce processeur procède moult choses",
                'views' => rand(100, 10000),
                'price' => rand(300, 900),
                'stock' => rand(10, 1500)
            ]);
        }

        $char = ["Couleur", "Nombre de coeurs", "Fréquence", "Socket"];
        $chars = [["Rouge", "Bleu", "Jaune"], [4, 6, 8, 16, 32], ["3.6Ghz", "4.2Ghz", "5.2Ghz"], ["AM4", "AM5"]];

        for ($o = 2; $o < 31; $o++) {
            for ($z = 0; $z < 4; $z++) {
                DB::table('characteristics')->insert([
                    'item_id' => $o,
                    'characteristic' => $char[$z],
                    'value' => $chars[$z][rand(0, count($chars[$z]) - 1)],
                    'multiplier' => rand(-250,100)
                ]);
            }
        }


        for ($u = 1; $u < 31; $u++) {
            $var = rand(0, 3);
            DB::table('characteristics')->insert([
                'item_id' => $u,
                'characteristic' => $char[$var],
                'value' => $chars[$var][rand(0, count($chars[$var]) - 1)],
                'multiplier' => rand(0.5, 2.5)
            ]);
        }

    }

    // $color=[red,blue,yellow,green]
//     if (item.Characteristics==color){
//         item.value=$color[rand(0,count($color)-1)];
//     }
}