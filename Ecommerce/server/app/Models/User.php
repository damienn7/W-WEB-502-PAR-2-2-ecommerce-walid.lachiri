<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";
    protected $fillable = [
        "id",
        "email",
        "password",
        "admin",
        "created_at",
        "update_at",
        "remember_token",
        "email_verified_at",
        "pseudo"
    ];

    public $timestamps = true;

    // public function sousCategorie()
    // {
    //     return $this->belongsTo(SousCategorie::class, 'sous_categorie_id');
    // }

    // public function panier()
    // {
    //     return $this->belongsTo(Panier::class, 'panier_id');
    // }
}