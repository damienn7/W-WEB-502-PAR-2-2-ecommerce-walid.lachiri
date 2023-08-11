<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;

class UpdateArticlePromotions extends Command
{
    protected $signature = 'articles:update-promotions';
    protected $description = 'Update promotions for random articles';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Remettre à zéro les promotions des articles en promotion hier
        Article::where('promotion', '>', 0)
            ->update(['promotion' => 0]);

        $articleIds = Article::inRandomOrder()
            ->limit(10)
            ->pluck('id');

        foreach ($articleIds as $articleId) {
            $newPromotion = rand(1, 50);

            Article::where('id', $articleId)
                ->update(['promotion' => $newPromotion]);
        }

        $this->info('Promotions updated for random articles.');
    }
}
