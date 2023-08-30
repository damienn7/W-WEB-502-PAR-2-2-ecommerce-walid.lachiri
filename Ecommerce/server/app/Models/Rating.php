<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rating extends Model
{
    protected $table = "ratings";
    protected $fillable = ["id", "id_user", "id_article","rating",'comment'];
    public $timestamps = true;
}