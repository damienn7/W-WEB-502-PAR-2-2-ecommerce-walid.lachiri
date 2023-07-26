<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';

    protected $fillable = ['nom', 'caracteristique', 'image', 'prix', 'sous_categorie_id', 'panier_id'];

    public $timestamps = true; 

    public function sousCategorie()
    {
        return $this->belongsTo(SousCategorie::class, 'sous_categorie_id');
    }

    public function panier()
    {
        return $this->belongsTo(Panier::class, 'panier_id');
    }
}
