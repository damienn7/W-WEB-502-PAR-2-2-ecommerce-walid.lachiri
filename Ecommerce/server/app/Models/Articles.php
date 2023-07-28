<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    use HasFactory;
    protected $table = "articles";
    protected $fillable = ["nom", "caracteristique", "image", "prix", "sous_categorie_id", "panier_id"];
}
