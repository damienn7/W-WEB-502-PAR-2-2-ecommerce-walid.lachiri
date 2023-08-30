<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'items';
    protected $fillable = ['name', 'description', 'id_category', 'image', 'price', 'views','stock','promotion','recommandation'];
    public $timestamps = true;
}