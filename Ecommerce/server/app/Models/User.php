<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    
    protected $fillable = ['pseudo', 'email', 'password'];
    protected $hidden = ['password'];
    public $timestamps = true;
}