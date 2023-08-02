<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class User extends Model implements Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function setRememberToken($value)
    {
        $this->{$this->getRememberTokenName()} = $value; // Définit la valeur du jeton "remember me" de l'utilisateur
    }

    public function getRememberTokenName()
    {
        return 'remember_token'; // Renvoie le nom de la colonne où est stocké le jeton "remember me"
    }
}