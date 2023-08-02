<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'items';
    protected $fillable = ['name', 'description', 'id_category', 'image', 'views', 'views','stock','rating','created_at','updated_at'];
    public $timestamps = true;

    public function sousCategorie()
    {
        return $this->belongsTo(SousCategorie::class, 'sub_category_id');
    }

    public function panier()
    {
        return $this->belongsTo(Panier::class, 'cart_id');
    }
}