<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    const UPDATED_AT = null;
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
}