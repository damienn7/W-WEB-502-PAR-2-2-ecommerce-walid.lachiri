<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class User extends Model implements Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $table = 'users';
    protected $fillable = ['mail', 'password', 'name'];
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public $timestamps = true; 

    // public function sousCategorie()
    // {
    //     return $this->belongsTo(SousCategorie::class, 'sous_categorie_id');
    // }

    // public function panier()
    // {
    //     return $this->belongsTo(Panier::class, 'panier_id');
    // }
    public function getAuthIdentifierName()
    {
        return 'id'; // Renvoie le nom de la colonne qui sert d'identifiant d'authentification
    }

    public function getAuthIdentifier()
    {
        return $this->getKey(); // Renvoie la valeur de l'identifiant d'authentification (généralement l'id de l'utilisateur)
    }

    public function getAuthPassword()
    {
        return $this->password; // Renvoie le mot de passe de l'utilisateur (ou un autre attribut servant de mot de passe)
    }

    public function getRememberToken()
    {
        return $this->{$this->getRememberTokenName()}; // Renvoie la valeur du jeton "remember me" de l'utilisateur
    }

    public function setRememberToken($value)
    {
        $this->{$this->getRememberTokenName()} = $value; // Définit la valeur du jeton "remember me" de l'utilisateur
    }

    public function getRememberTokenName()
    {
        return 'remember_token'; // Renvoie le nom de la colonne où est stocké le jeton "remember me"
    }
}
