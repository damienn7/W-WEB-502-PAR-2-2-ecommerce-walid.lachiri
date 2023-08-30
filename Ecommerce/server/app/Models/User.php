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
    protected $fillable = ['mail','name', 'password', 'admin','delivery_adress','country'];
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
        return 'id'; 
    }

    public function getAuthIdentifier()
    {
        return $this->getKey(); 
    }

    public function getAuthPassword()
    {
        return $this->password; 
    }

    public function getRememberToken()
    {
        return $this->{$this->getRememberTokenName()}; 
    }

    public function setRememberToken($value)
    {
        $this->{$this->getRememberTokenName()} = $value; 
    }

    public function getRememberTokenName()
    {
        return 'remember_token'; 
    }
}