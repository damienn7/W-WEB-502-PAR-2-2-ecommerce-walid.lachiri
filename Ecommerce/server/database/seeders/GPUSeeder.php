<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GPUSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $cards = [
            ['name' => 'RTX 4090', 'description' => 'Haut de gamme de NVIDIA.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/05/99/89/LD0005998927.jpg'],
            ['name' => 'RTX 4080 Ti', 'description' => 'Variante Ti du RTX 4080.', 'image' => 'https://m.media-amazon.com/images/I/61CCFTMFGeL._AC_UF1000,1000_QL80_.jpg'],
            ['name' => 'RX 7900 XTX', 'description' => 'Carte AMD pour le jeu en 4K.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/06/03/78/LD0006037831.jpg'],
            ['name' => 'RTX 4080', 'description' => 'Carte performante de NVIDIA.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/05/99/53/LD0005995301.jpg'],
            ['name' => 'RTX 4070 Ti', 'description' => 'Variante Ti du RTX 4070.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/06/00/53/LD0006005314.jpg'],
            ['name' => 'RX 7900 XT', 'description' => 'Carte AMD pour le jeu compétitif.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/06/03/78/LD0006037831.jpg'],
            ['name' => 'RTX 4090 Mobile', 'description' => 'Version mobile du RTX 4090.', 'image' => 'https://imagedelivery.net/JAV112JY973Crznn4xb8Sg/0a4b0cab-3db6-4aa9-9c04-cabc906fee00/mobile'],
            ['name' => 'RTX 3090 Ti', 'description' => 'Variante Ti du RTX 3090.', 'image' => 'https://m.media-amazon.com/images/I/71nq+8Cqd1L.jpg'],
            ['name' => 'RX 6950 XT', 'description' => 'Performance solide de chez AMD.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/06/03/77/LD0006037781.jpg'],
            ['name' => 'NVIDIA GeForce RTX 3090', 'description' => 'Carte haut de gamme de NVIDIA.', 'image' => 'https://media.ldlc.com/r1600/ld/products/00/05/73/29/LD0005732924_1.jpg'],
            ['name' => 'AMD Radeon RX 6900 XT', 'description' => 'Haut de gamme d\'AMD.', 'image' => 'https://m.media-amazon.com/images/I/81U5H5c0jyL.jpg'],
            ['name' => 'NVIDIA GeForce RTX 3080 Ti', 'description' => 'Performance solide pour le jeu en 4K.', 'image' => 'https://m.media-amazon.com/images/I/619h9dd1VhS.jpg'],
            ['name' => 'RTX 4070', 'description' => 'Carte performante pour le jeu.', 'image' => 'https://m.media-amazon.com/images/I/71-djDvKjfL.jpg'],
            ['name' => 'NVIDIA GeForce RTX 3080', 'description' => 'Puissant pour le jeu en 4K.', 'image' => 'https://m.media-amazon.com/images/I/81lBqpfoncS.jpg'],
            ['name' => 'AMD Radeon RX 6800 XT', 'description' => 'Performances solides pour le jeu en 4K.', 'image' => 'https://www.mencorner.com/media/produits/AMD_Radeon_RX_6800XT_GAMING_Z_TRIO_16G_-_d1.jpg'],
            ['name' => 'AMD Radeon RX 6800', 'description' => 'Performance solide pour le jeu en 1440p.', 'image' => 'https://m.media-amazon.com/images/I/71bM7WAO6yL._AC_UF1000,1000_QL80_.jpg'],
            ['name' => 'NVIDIA GeForce RTX 3070 Ti', 'description' => 'Variante Ti du RTX 3070.', 'image' => 'https://m.media-amazon.com/images/I/81d0pk3xOiS.jpg'],
            ['name' => 'NVIDIA GeForce RTX 3070', 'description' => 'Jeu en 1440p et 4K.', 'image' => 'https://m.media-amazon.com/images/I/81d0pk3xOiS.jpg'],
            ['name' => 'TITAN RTX', 'description' => 'Haut de gamme de la série TITAN.', 'image' => 'https://m.media-amazon.com/images/I/71BbMERkdUL.jpg'],
            ['name' => 'NVIDIA GeForce RTX 2080 Ti', 'description' => 'Carte phare de la série RTX 2000.', 'image' => 'https://images.stockx.com/images/NVIDIA-Founders-GeForce-RTX-2080-Ti-Graphics-Card.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1624988867'],
            ['name' => 'AMD Radeon RX 6700 XT', 'description' => 'Milieu de gamme d\'AMD.', 'image' => 'https://m.media-amazon.com/images/I/81eRXm5GGoL.jpg'],
            ['name' => 'RTX 4060 Ti 8 GB', 'description' => 'Variante Ti du RTX 4060 avec 8GB.', 'image' => 'https://m.media-amazon.com/images/I/61h+oplmMHL._AC_UF1000,1000_QL80_.jpg'],
            ['name' => 'RTX 4060 8 GB', 'description' => 'Carte performante avec 8GB.', 'image' => 'https://m.media-amazon.com/images/I/713u5D6eHdL._AC_UF1000,1000_QL80_.jpg'],
            ['name' => 'RTX 4060 Ti 4 GB', 'description' => 'Variante Ti du RTX 4060 avec 4GB.', 'image' => 'https://cdn.idealo.com/folder/Product/202923/5/202923529/s4_produktbild_gross/zotac-geforce-rtx-4060.jpg'],
            ['name' => 'RX 580 2048SP', 'description' => 'Version 2048SP du RX 580.', 'image' => 'https://m.media-amazon.com/images/I/71RNwpm-hSL.jpg'],
            ['name' => 'NVIDIA GeForce RTX 2080 Super', 'description' => 'Super variante du RTX 2080.', 'image' => 'https://www.servethehome.com/wp-content/uploads/2019/08/NVIDIA-RTX-2080-SUPER.jpg'],
            ['name' => 'NVIDIA GeForce RTX 2080', 'description' => 'Puissant pour le jeu en 4K.', 'image' => 'https://images.stockx.com/images/NVIDIA-Founders-GeForce-RTX-2080-Ti-Graphics-Card.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1624988867'],
            ['name' => 'NVIDIA GeForce RTX 2070 Super', 'description' => 'Super variante du RTX 2070.', 'image' => 'https://m.media-amazon.com/images/I/71QQYvO+eKL.jpg'],
            ['name' => 'NVIDIA GeForce RTX 2070', 'description' => 'Jeu en 1440p.', 'image' => 'https://m.media-amazon.com/images/I/71QQYvO+eKL.jpg'],
        ];
        
        foreach ($cards as $card) {
            Article::create([
                'name' => $card['name'],
                'description' => $card['description'],
                'id_category' => 5,
                'image' => $card['image'],
                'price' => rand(300, 2000),
                'views' => rand(100, 10000),
                'stock' => rand(0, 100),
            ]);
        }
        
    }
}
