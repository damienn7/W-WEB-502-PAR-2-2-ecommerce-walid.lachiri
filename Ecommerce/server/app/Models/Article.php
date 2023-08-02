<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'items';
    protected $fillable = ['image', 'name', 'description', 'price   ', 'updated_at', 'created_at','stocks_id','rating','stock','views'];

    public $timestamps = false; 

    public function sousCategorie()
    {
        return $this->belongsTo(SousCategorie::class, 'sub_category_id');
    }

    public function panier()
    {
        return $this->belongsTo(Panier::class, 'cart_id');
    }
}
