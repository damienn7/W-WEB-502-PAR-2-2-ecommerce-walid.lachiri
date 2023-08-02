<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = "articles";
    protected $fillable = ["id", "name", "description", "Id_category", "image", "views", "price", "stock"];

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