<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = ['email', 'password', 'pseudo'];

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
